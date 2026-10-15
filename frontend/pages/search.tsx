import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import ProfileCard from '../components/ProfileCard';

export default function SearchPage() {
  const [profiles, setProfiles] = useState([]);
  const [filter, setFilter] = useState({
    gender: '',
    religion: '',
    profession: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProfiles();
  }, [filter]);

  async function fetchProfiles() {
    setLoading(true);
    let query = supabase.from('profiles').select('*');

    if (filter.gender) query = query.eq('gender', filter.gender);
    if (filter.religion) query = query.ilike('religion', `%${filter.religion}%`);
    if (filter.profession) query = query.ilike('profession', `%${filter.profession}%`);

    const { data, error } = await query;

    if (error) {
      console.error('Error fetching profiles:', error);
    } else {
      setProfiles(data || []);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-slate-50 font-serif">
      <nav className="flex justify-between items-center px-10 py-6 bg-white shadow-sm">
        <h1 className="text-2xl font-bold text-amber-700 tracking-widest">ELITE MATRIMONY</h1>
        <div className="space-x-6">
          <a href="/" className="text-gray-600 hover:text-amber-700">Home</a>
          <a href="/signup" className="text-gray-600 hover:text-amber-700">My Profile</a>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <h2 className="text-4xl font-light text-center text-gray-800 mb-10">Discover Your Match</h2>

        {/* Filter Bar */}
        <div className="bg-white p-6 rounded-2xl shadow-md mb-10 flex flex-wrap gap-4 justify-center items-end">
          <div className="flex flex-col">
            <label className="text-sm text-gray-500 mb-1">Gender</label>
            <select 
              onChange={(e) => setFilter({...filter, gender: e.target.value})}
              className="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-amber-500"
            >
              <option value="">All</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-500 mb-1">Religion</label>
            <input 
              type="text" placeholder="Search Religion..." 
              onChange={(e) => setFilter({...filter, religion: e.target.value})}
              className="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <div className="flex flex-col">
            <label className="text-sm text-gray-500 mb-1">Profession</label>
            <input 
              type="text" placeholder="Search Profession..." 
              onChange={(e) => setFilter({...filter, profession: e.target.value})}
              className="p-2 border rounded-lg outline-none focus:ring-2 focus:ring-amber-500"
            />
          </div>
          <button 
            onClick={() => fetchProfiles()} 
            className="bg-amber-700 text-white px-8 py-2 rounded-lg font-bold hover:bg-amber-800 transition"
          >
            Apply Filters
          </button>
        </div>

        {/* Results Grid */}
        {loading ? (
          <div className="text-center text-gray-500 py-20">Searching for the perfect match...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {profiles.length > 0 ? (
              profiles.map((profile) => (
                <ProfileCard 
                  key={profile.id} 
                  profile={{
                    name: profile.full_name,
                    age: 25, // In a real app, calculate this from profile.dob
                    profession: profile.profession,
                    city: profile.location_city || 'Unknown',
                    education: profile.education,
                    religion: profile.religion,
                    photo: profile.profile_picture_url || 'https://via.placeholder.com/300x400?text=No+Photo'
                  }} 
                />
              ))
            ) : (
              <div className="col-span-full text-center text-gray-400 py-20">
                No profiles match your criteria. Try broadening your search.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
