export interface ISmsProvider {
  sendOtp(phone: string, otp: string): Promise<{ success: boolean; message?: string; error?: any }>;
}
