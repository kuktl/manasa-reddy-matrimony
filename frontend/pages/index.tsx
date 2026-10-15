import React from 'react';

const LandingPage = () => {
  return (
    <div className="bg-[#FDFCFB] min-h-screen font-sans text-slate-800">
      <nav className="flex justify-between items-center px-6 py-5 max-w-7xl mx-auto">
        <div className="text-2xl font-serif font-bold text-[#5D0E1A] tracking-tighter">SUTRADHARA</div>
        <div className="hidden md:flex space-x-8 text-sm font-medium uppercase tracking-widest text-slate-600">
          <a href="#how-it-works" className="hover:text-[#C5A059] transition">How it Works</a>
          <a href="#pricing" className="hover:text-[#C5A059] transition">Pricing</a>
          <a href="#stories" className="hover:text-[#C5A059] transition">Success Stories</a>
        </div>
        <button className="bg-[#5D0E1A] text-white px-6 py-2 rounded-sm text-sm font-bold hover:bg-[#4A0B15] transition">
          JOIN NOW
        </button>
      </nav>

      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1583939006573-a9557a35879a?auto=format&fit=crop&w=1920&q=80" 
            className="w-full h-full object-cover scale-105 animate-pulse" 
            alt="Luxury Indian Wedding" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
        </div>
        <div className="relative z-10 container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <h1 className="text-5xl md:text-7xl font-serif leading-tight mb-6">
              The Art of <br /> <span className="text-[#C5A059] italic">Curated Unions.</span>
            </h1>
            <p className="text-lg font-light opacity-90 mb-8 max-w-md">
              A discreet, high-trust community for the most accomplished individuals and families of India.
            </p>
          </div>
          <div className="bg-white p-8 shadow-2xl rounded-sm border-t-4 border-[#C5A059] max-w-md">
            <h3 className="text-2xl font-serif text-[#5D0E1A] mb-6 text-center">Begin Your Journey</h3>
            <form className="space-y-4">
              <input type="text" placeholder="Full Name" className="w-full p-3 border-b border-slate-200 focus:border-[#C5A059] outline-none transition" />
              <div className="grid grid-cols-2 gap-4">
                <select className="p-3 border-b border-slate-200 focus:border-[#C5A059] outline-none bg-transparent">
                  <option>Profile for Self</option>
                  <option>Profile for Son</option>
                  <option>Profile for Daughter</option>
                </select>
                <input type="text" placeholder="Mother Tongue" className="p-3 border-b border-slate-200 focus:border-[#C5A059] outline-none" />
              </div>
              <input type="tel" placeholder="Mobile Number" className="w-full p-3 border-b border-slate-200 focus:border-[#C5A059] outline-none" />
              <button className="w-full bg-[#5D0E1A] text-white py-4 font-bold uppercase tracking-widest hover:bg-[#4A0B15] transition">
                Find My Match
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
