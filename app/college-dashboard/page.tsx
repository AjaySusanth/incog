"use client";

import supabase from '@/utils/supabaseClient';
import React, { useEffect, useState } from 'react';

interface College {
  id: string; // UUID format
  user_id: string; // UUID format
  college_name: string;
  location: string;
  verified: boolean;
  total_complaints: number;
  solved_complaints: number;
  safetyScore: number;
  created_at: string; // ISO 8601 timestamp
  updated_at: string; // ISO 8601 timestamp
}

export default function CollegeRatingsPage() {
  const [colleges, setColleges] = useState<College[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  const calculateSafetyScore = (total: number, solved: number) => {
    if (total === 0) return 100;
    return Math.round((((total-solved)/total) * 100));
  };

  useEffect(() => {
    const fetchColleges = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("colleges").select("*");
      if (error) {
        console.error("Error fetching colleges:", error);
        setColleges([]);
      } else {
        const formattedData = data.map((college: College) => ({
          ...college,
          safetyScore: calculateSafetyScore(college.total_complaints, college.solved_complaints),
        }));
        setColleges(formattedData);
      }
      setLoading(false);
    };

    fetchColleges();
  }, []);

  const locations = [...new Set(colleges?.map(college => college.location) || [])];
  
  const filteredColleges = colleges?.filter(college => {
    const matchesSearch = college.college_name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationFilter === '' || college.location === locationFilter;
    return matchesSearch && matchesLocation;
  }) || [];


  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-purple-300">College Safety Ratings Dashboard</h1>

        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <input
            type="text"
            placeholder="Search colleges..."
            className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-gray-100 focus:ring-2 focus:ring-purple-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <select
            className="w-full md:w-64 p-3 rounded bg-gray-800 border border-gray-700 text-gray-100 focus:ring-2 focus:ring-purple-500"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
          >
            <option value="">All Locations</option>
            {locations.map((location) => (
              <option key={location} value={location}>{location}</option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="text-center text-gray-400 py-6">Loading colleges...</div>
        ) : (
          <div className="overflow-x-auto rounded-lg border border-gray-700 shadow-lg">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-800">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">College Name</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Location</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Complaints Registered</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Complaints Solved</th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Safety Score</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 divide-y divide-gray-700">
                {filteredColleges.length > 0 ? (
                  filteredColleges.map((college) => (
                    <tr key={college.id} className="hover:bg-gray-700 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-white">{college.college_name}</td>
                      <td className="px-6 py-4 text-sm text-gray-300">{college.location}</td>
                      <td className="px-6 py-4 text-sm text-gray-300">{college.total_complaints}</td>
                      <td className="px-6 py-4 text-sm text-gray-300">{college.solved_complaints} ({Math.round((college.solved_complaints / college.total_complaints) * 100)}%)</td>
                      <td className="px-6 py-4 text-sm font-medium">{college.safetyScore}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-4 text-center text-sm text-gray-400">No colleges found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
