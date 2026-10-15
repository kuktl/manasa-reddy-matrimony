import { ISmsProvider } from './ISmsProvider';

export class Msg91Provider implements ISmsProvider {
  async sendOtp(phone: string, otp: string) {
    try {
      const response = await fetch(`https://api.msg91.com/api/v5/flow/`, {
        method: 'POST',
        headers: { 'authkey': process.env.MSG91_AUTH_KEY!, 'Content-Type': 'application/json' },
        body: JSON.stringify({
          template_id: process.env.MSG91_DLT_TEMPLATE_ID,
          mobile: phone,
          var1: otp,
        }),
      });
      const data = await response.json();
      return { success: data.type === 'success' };
    } catch (error) {
      return { success: false, error };
    }
  }
}
