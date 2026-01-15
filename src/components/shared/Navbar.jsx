// src/components/shared/Navbar.jsx
import { useState } from 'react';

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-center">
      {/* Breadcrumb */}
      <div className="flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v6a2 2 0 002 2h2v4a2 2 0 002 2h6a2 2 0 002-2v-4h2a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 002 2h2a2 2 0 002-2m-3 7h3m-3 4h3m-6-4h6m6 4h.01M9 16h.01" />
        </svg>
        <span className="text-sm font-medium text-gray-700">/ Content Moderation</span>
      </div>

      {/* Search + Notifications + Avatar */}
      <div className="flex items-center space-x-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search students, logs..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nacos-green"
          />
          <svg xmlns="http://www.w3.org/2000/svg" className="absolute left-3 top-2.5 h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>

        <button className="p-2 text-gray-500 hover:text-gray-700">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-5-5.055A6.002 6.002 0 006 11v3.159A2.032 2.032 0 019.595 16.59l1.405 1.405z" />
          </svg>
        </button>

        <div className="flex items-center space-x-2">
          <img src="/avatar.png" alt="Admin" className="w-8 h-8 rounded-full" />
          <span className="text-sm font-medium text-gray-700">Admin User</span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;