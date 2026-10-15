import { Msg91Provider } from './sms/Msg91Provider';
import { AuthService } from './authService';

export class SMSProvider {
  static async sendOtp(phone: string, otp: string) {
    const providerKey = await AuthService.getSetting('SMS_PROVIDER', 'MSG91');
    let provider;
    switch (providerKey) {
      case 'MSG91': provider = new Msg91Provider(); break;
      default: throw new Error('Unsupported SMS provider configured.');
    }
    return await provider.sendOtp(phone, otp);
  }
}
