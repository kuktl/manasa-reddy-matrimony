import React from 'react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-serif">
      <nav className="flex justify-between items-center px-10 py-6 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-amber-700 tracking-widest">ELITE MATRIMONY</h1>
        <div className="space-x-6">
          <a href="#" className="text-gray-600 hover:text-amber-700">Login</a>
          <button className="bg-amber-700 text-white px-6 py-2 rounded-full hover:bg-amber-800 transition">Join Now</button>
        </div>
      </nav>

      <header className="relative h-[80vh] flex items-center justify-center text-center text-white">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1515934751635-6778B6be8f8d?auto=format&fit=crop&w=1920&q=80" 
          className="absolute inset-0 w-full h-full object-cover" 
          alt="Wedding Background" 
        />
        <div className="relative z-20 max-w-3xl px-4">
          <h2 className="text-5xl md:text-7xl font-light mb-6">Find Your Perfect Match</h2>
          <p className="text-xl mb-8 font-sans font-light italic">Exclusively for high-achieving professionals and families.</p>
          <div className="bg-white p-4 rounded-lg shadow-xl flex flex-col md:flex-row gap-4 text-gray-800">
            <select className="flex-1 p-3 border rounded outline-none">
              <option>I am a Man</option>
              <option>I am a Woman</option>
            </select>
            <select className="flex-1 p-3 border rounded outline-none">
              <option>Looking for a Woman</option>
              <option>Looking for a Man</option>
            </select>
            <button className="bg-amber-700 text-white px-10 py-3 rounded font-bold hover:bg-amber-800">Search</button>
          </div>
        </div>
      </header>
    </div>
  );
}
