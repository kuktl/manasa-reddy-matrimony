import React, { useState, useEffect, useRef } from 'react';

export default function VerifyOtp({ phone, onVerified }) {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(30);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const inputsRef = useRef([]);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer(t => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleOtpChange = (index, value) => {
    if (isNaN(Number(value))) return;
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    if (value && index < 5) inputsRef.current[index + 1]?.focus();
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) inputsRef.current[index - 1]?.focus();
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        body: JSON.stringify({ phone, otp: otp.join(''), deviceId: 'browser-uuid-123' }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      onVerified(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFBF7] flex items-center justify-center p-6 font-sans">
      <div className="max-w-md w-full bg-white shadow-xl rounded-2xl p-8 border border-slate-100 text-center">
        <h2 className="text-3xl font-serif text-slate-800 mb-2">Verify OTP</h2>
        <p className="text-slate-400 text-sm mb-8">OTP sent to +91 {phone}</p>
        <div className="flex justify-center gap-3 mb-8">
          {otp.map((digit, i) => (
            <input key={i} ref={el => inputsRef.current[i] = el} type="text" maxLength={1} value={digit} onChange={(e) => handleOtpCange(i, e.target.value)} onKeyDown={(e) => handleKeyDown(i, e)} className="w-12 h-14 text-center text-2xl font-bold border border-slate-200 rounded-lg focus:ring-2 focus:ring-gold-400 outline-none transition bg-slate-50" />
          ))}
        </div>
        {error && <p className="text-red-500 text-xs mb-6">{error}</p>}
        <button onClick={handleSubmit} disabled={loading || otp.some(d => !d)} className="w-full bg-slate-800 text-white py-4 rounded-lg font-bold hover:bg-slate-900 transition disabled:bg-slate-300 mb-6">
          {loading ? "Verifying..." : "Verify & Proceed"}
        </button>
        <div className="flex justify-between items-center text-sm">
          <button onClick={() => window.location.reload()} className="text-slate-400 hover:text-slate-600 underline">Change Number</button>
          <button disabled={timer > 0} onClick={() => setTimer(30)} className={`font-medium ${timer > 0 ? 'text-slate-300' : 'text-gold-600 hover:text-gold-700'}`}>
            {timer > 0 ? `Resend in ${timer}s` : 'Resend OTP'}
          </button>
        </div>
      </div>
    </div>
  );
}
