import React from 'react';

export default function ProfileCard({ profile }: { profile: any }) {
  return (
    <div className="max-w-sm bg-white border rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-shadow duration-300">
      <div className="relative h-64">
        <img src={profile.photo} className="w-full h-full object-cover" alt="Profile" />
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
          <p className="text-white text-xl font-semibold">{profile.name}, {profile.age}</p>
          <p className="text-gray-200 text-sm">{profile.profession} • {profile.city}</p>
        </div>
      </div>
      <div className="p-5 space-y-3">
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Education:</span>
          <span className="font-medium">{profile.education}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500">Religion:</span>
          <span className="font-medium">{profile.religion}</span>
        </div>
        <button className="w-full mt-4 bg-amber-700 text-white py-2 rounded-lg font-medium hover:bg-amber-800 transition">
          Send Interest
        </button>
      </div>
    </div>
  );
}
