import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export class AuthService {
  static generateOTP(): string {
    return crypto.randomInt(100000, 999999).toString();
  }

  static hashOTP(otp: string): string {
    return crypto.createHash('sha256').update(otp).digest('hex');
  }

  static async getSetting(key: string, defaultValue: string): Promise<string> {
    const { data } = await supabase.from('auth_settings').select('value').eq('key', key).single();
    return data?.value || defaultValue;
  }

  static async verifyOtp(phone: string, providedOtp: string, ip: string, deviceId: string) {
    const expiryMins = parseInt(await this.getSetting('OTP_EXPIRY_MINS', '5'));
    const maxAttempts = parseInt(await this.getSetting('MAX_ATTEMPTS', '5'));

    const { data: request, error } = await supabase
      .from('otp_requests')
      .select('*')
      .eq('phone', phone)
      .eq('status', 'pending')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (!request || error) throw new Error('No active OTP request found. Please request a new one.');

    const expiryDate = new Date(request.created_at);
    expiryDate.setMinutes(expiryDate.getMinutes() + expiryMins);
    if (new Date() > expiryDate) {
      await supabase.from('otp_requests').update({ status: 'expired' }).eq('id', request.id);
      throw new Error('OTP has expired.');
    }

    if (request.attempts >= maxAttempts) {
      await supabase.from('otp_requests').update({ status: 'invalid' }).eq('id', request.id);
      throw new Error('Too many wrong attempts. Please request a new OTP.');
    }

    const hashedProvided = this.hashOTP(providedOtp);
    if (hashedProvided !== request.otp_hash) {
      await supabase.from('otp_requests').update({ attempts: request.attempts + 1 }).eq('id', request.id);
      throw new Error('Invalid OTP. Please try again.');
    }

    await supabase.from('otp_requests').update({ status: 'verified' }).eq('id', request.id);
    
    const { data: user, error: userError } = await supabase
      .from('users')
      .upsert({ phone_number: phone, last_login: new Date().toISOString() }, { onConflict: 'phone_number' })
      .select()
      .single();

    if (userError) throw userError;
    return user;
  }
}
