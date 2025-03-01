"use client";

import React, { useState } from 'react';

export default function CollegeRatingsPage() {
  // Sample college data
  const initialColleges = [
    { id: 1, name: "Government Engineering College Thrissur", location: "Thrissur", complaintsRegistered: 45, complaintsSolved: 38, safetyScore: 87 },
    { id: 2, name: "Mar Athanasius College of Engineering", location: "Kothamangalam", complaintsRegistered: 32, complaintsSolved: 29, safetyScore: 92 },
    { id: 3, name: "National Institute of Technology Calicut", location: "Kozhikode", complaintsRegistered: 67, complaintsSolved: 52, safetyScore: 78 },
    { id: 4, name: "College of Engineering Trivandrum", location: "Thiruvananthapuram", complaintsRegistered: 23, complaintsSolved: 21, safetyScore: 95 },
    { id: 5, name: "Rajagiri School of Engineering & Technology", location: "Ernakulam", complaintsRegistered: 51, complaintsSolved: 38, safetyScore: 82 },
    { id: 6, name: "Model Engineering College", location: "Ernakulam", complaintsRegistered: 29, complaintsSolved: 25, safetyScore: 89 },
    { id: 7, name: "MES College of Engineering", location: "Malappuram", complaintsRegistered: 72, complaintsSolved: 48, safetyScore: 73 },
    { id: 8, name: "TKM College of Engineering", location: "Kollam", complaintsRegistered: 39, complaintsSolved: 33, safetyScore: 86 },
    { id: 9, name: "Federal Institute of Science and Technology (FISAT)", location: "Angamaly", complaintsRegistered: 18, complaintsSolved: 17, safetyScore: 96 },
    { id: 10, name: "Amrita School of Engineering", location: "Amritapuri", complaintsRegistered: 58, complaintsSolved: 42, safetyScore: 79 }
];

  const [colleges, setColleges] = useState(initialColleges);
  const [searchTerm, setSearchTerm] = useState('');
  const [locationFilter, setLocationFilter] = useState('');

  // Get unique locations for filter dropdown
  const locations = [...new Set(initialColleges.map(college => college.location))];

  // Filter colleges based on search term and location
  const filteredColleges = initialColleges.filter(college => {
    const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesLocation = locationFilter === '' || college.location === locationFilter;
    return matchesSearch && matchesLocation;
  });

  // Function to determine safety score color
  const getSafetyScoreColor = (score) => {
    if (score >= 90) return 'text-green-400';
    if (score >= 80) return 'text-blue-400';
    if (score >= 70) return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-purple-300">College Safety Ratings Dashboard</h1>
        
        {/* Search and Filter Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="flex-1">
            <input
              type="text"
              placeholder="Search colleges..."
              className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="w-full md:w-64">
            <select
              className="w-full p-3 rounded bg-gray-800 border border-gray-700 text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            >
              <option value="">All Locations</option>
              {locations.map((location) => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>
          </div>
        </div>
        
        {/* Table Section */}
        <div className="overflow-x-auto rounded-lg border border-gray-700 shadow-lg">
          <table className="min-w-full divide-y divide-gray-700">
            <thead className="bg-gray-800">
              <tr>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  College Name
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Location
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Complaints Registered
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Complaints Solved
                </th>
                <th scope="col" className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">
                  Safety Score
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-800 divide-y divide-gray-700">
              {filteredColleges.length > 0 ? (
                filteredColleges.map((college) => (
                  <tr key={college.id} className="hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                      {college.name}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {college.location}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {college.complaintsRegistered}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                      {college.complaintsSolved} ({Math.round((college.complaintsSolved / college.complaintsRegistered) * 100)}%)
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <span className={`${getSafetyScoreColor(college.safetyScore)} font-bold`}>
                        {college.safetyScore}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-400">
                    No colleges found matching your search criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Summary section */}
        <div className="mt-8 p-6 bg-gray-800 rounded-lg border border-gray-700">
          <h2 className="text-xl font-semibold mb-4 text-purple-300">Dashboard Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Total Colleges</p>
              <p className="text-2xl font-bold text-white">{filteredColleges.length}</p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Average Safety Score</p>
              <p className="text-2xl font-bold text-blue-400">
                {filteredColleges.length > 0 
                  ? Math.round(filteredColleges.reduce((sum, college) => sum + college.safetyScore, 0) / filteredColleges.length) 
                  : 'N/A'}
              </p>
            </div>
            <div className="bg-gray-700 p-4 rounded-lg">
              <p className="text-gray-400 text-sm">Complaint Resolution Rate</p>
              <p className="text-2xl font-bold text-green-400">
                {filteredColleges.length > 0 
                  ? Math.round((filteredColleges.reduce((sum, college) => sum + college.complaintsSolved, 0) / 
                     filteredColleges.reduce((sum, college) => sum + college.complaintsRegistered, 0)) * 100) + '%'
                  : 'N/A'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}