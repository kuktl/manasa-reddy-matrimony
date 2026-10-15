import React, { useState } from 'react';
import { Phone, ArrowRight, AlertCircle } from 'lucide-react';

export default function LoginPhone({ onOtpRequest }) {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!/^[6-9]\d{9}$/.test(phone)) {
      setError('Please enter a valid 10-digit Indian mobile number');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        body: JSON.stringify({ phone, deviceId: 'browser-uuid-123' }),
      });
      if (!res.ok) throw new Error(await res.text());
      onOtpRequest(phone);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 border border-slate-100">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-serif text-slate-800 mb-2">Welcome Back</h2>
          <p className="text-slate-400 text-sm">Enter your mobile number to continue</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
              <Phone size={18} />
            </div>
            <div className="flex">
              <span className="inline-flex items-center px-3 rounded-l-lg border border-r-0 border-slate-200 bg-slate-50 text-slate-500 text-sm font-medium">+91</span>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="flex-1 p-4 border border-slate-200 rounded-r-lg outline-none focus:ring-2 focus:ring-gold-400 transition" placeholder="00000 00000" maxLength={10} required />
            </div>
          </div>
          {error && <p className="text-red-500 text-xs flex items-center gap-1"><AlertCircle size={14}/> {error}</p>}
          <button disabled={loading} className="w-full bg-slate-800 text-white py-4 rounded-lg font-bold hover:bg-slate-900 transition flex items-center justify-center gap-2 disabled:bg-slate-400">
            {loading ? "Sending OTP..." : "Get OTP"} <ArrowRight size={18} />
          </button>
        </form>
      </div>
    </div>
  );
}
