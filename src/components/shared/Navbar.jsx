import React from "react";
import {Search, Bell} from "lucide-react"; // Ensure you have lucide-react installed

const Navbar = () => {
  return (
    <div className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 fixed top-0 left-0 right-0 z-50">
      {/* Left: Logo */}
      <div className="flex items-center gap-8">
        <h1 className="text-xl font-bold text-[#0F2B47]">
          NACOS Anchor University
        </h1>

        {/* Navigation Links (Hidden on small screens) */}
        <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-500 cursor-pointer">
          <a className="hover:text-green-700">
            Home
          </a>
          <a  className="text-green-700">
            Resources
          </a>
          <a  className="hover:text-green-700">
            Events
          </a>
          <a  className="hover:text-green-700">
            Payments
          </a>
          <a  className="hover:text-green-700">
            Profile
          </a>
        </div>
      </div>

      {/* Right: Search & Profile */}
      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search resources..."
            className="pl-9 pr-4 py-1.5 bg-gray-100 rounded-lg text-sm focus:ring-2 focus:ring-green-500 outline-none w-64"
          />
        </div>

        <button className="text-gray-500 hover:text-green-700">
          <Bell className="w-5 h-5" />
        </button>

        {/* Profile Circle */}
        <div className="w-8 h-8 rounded-full bg-[#0F2B47] text-white flex items-center justify-center text-xs font-bold">
          JD
        </div>
      </div>
    </div>
  );
};

export default Navbar;
