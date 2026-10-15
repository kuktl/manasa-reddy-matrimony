import React, { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function SignUp() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    full_name: '',
    gender: 'Male',
    dob: '',
    religion: '',
    profession: '',
    education: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      // 1. Create user in Supabase Auth
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
      });

      if (authError) throw authError;

      // 2. Create the detailed profile in the 'profiles' table
      if (authData.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: authData.user.id,
              full_name: formData.full_name,
              gender: formData.gender,
              dob: formData.dob,
              religion: formData.religion,
              profession: formData.profession,
              education: formData.education,
            },
          ]);

        if (profileError) throw profileError;
        setMessage('Registration successful! Please check your email for verification.');
      }
    } catch (error: any) {
      setMessage('Error: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center py-12 px-4 font-serif">
      <div className="max-w-lg w-full bg-white shadow-2xl rounded-3xl p-8 border border-amber-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-amber-800">Create Your Elite Profile</h2>
          <p className="text-gray-500 mt-2">Join the most exclusive matrimony community</p>
        </div>

        <form onSubmit={handleSignUp} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input 
              name="full_name" placeholder="Full Name" required 
              onChange={handleInputChange} className="p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" 
            />
            <input 
              name="email" type="email" placeholder="Email Address" required 
              onChange={handleInputChange} className="p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" 
            />
            <input 
              name="password" type="password" placeholder="Password" required 
              onChange={handleInputChange} className="p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" 
            />
            <select name="gender" onChange={handleInputChange} className="p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            <input 
              name="dob" type="date" required 
              onChange={handleInputChange} className="p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" 
            />
            <input 
              name="religion" placeholder="Religion" required 
              onChange={handleInputChange} className="p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" 
            />
            <input 
              name="profession" placeholder="Profession (e.g. Software Engineer)" required 
              onChange={handleInputChange} className="p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" 
            />
            <input 
              name="education" placeholder="Highest Education" required 
              onChange={handleInputChange} className="p-3 border rounded-lg focus:ring-2 focus:ring-amber-500 outline-none" 
            />
          </div>

          {message && (
            <div className={`p-3 rounded-lg text-center text-sm ${message.includes('Error') ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'}`}>
              {message}
            </div>
          )}

          <button 
            disabled={loading}
            className="w-full bg-amber-700 text-white py-3 rounded-xl font-bold hover:bg-amber-800 transition duration-300 disabled:bg-gray-400"
          >
            {loading ? 'Creating Profile...' : 'Join Elite Matrimony'}
          </button>
        </form>
      </div>
    </div>
  );
}
