import React from "react";
import {Search, Bell} from "lucide-react";
import {Link} from "react-router-dom";

export default function TopNavbar() {
  return (
    <header className="h-16 border-b border-gray-200 bg-white flex items-center justify-between px-6 sticky top-0 z-50">
      {/* 1. LEFT: Logo Text */}
      <div className="flex items-center gap-2">
        {/* Optional: Add Logo Icon if you have one */}
        {/* <div className="w-8 h-8 bg-green-100 text-green-700 rounded flex items-center justify-center font-bold">N</div> */}
        <h1 className="text-lg font-bold text-gray-900">
          NACOS Anchor University
        </h1>
      </div>

      {/* 2. CENTER: Search Bar */}
      <div className="flex-1 max-w-xl mx-8 hidden md:block">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search for messages, students, or resources..."
            className="w-full bg-gray-100 border border-transparent focus:bg-white focus:border-green-500 rounded-lg pl-10 pr-4 py-2 text-sm outline-none transition-all"
          />
        </div>
      </div>

      {/* 3. RIGHT: Navigation & Profile */}
      <div className="flex items-center gap-6">
        {/* Nav Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium">
          <Link
            to="/student/dashboard"
            className="text-gray-500 hover:text-green-700 transition-colors"
          >
            Dashboard
          </Link>
          <Link to="/student/resources" className="text-green-700 font-bold">
            Academics
          </Link>
          <Link
            to="/student/community"
            className="text-gray-500 hover:text-green-700 transition-colors"
          >
            Community
          </Link>
        </nav>

        <div className="h-6 w-px bg-gray-200 hidden lg:block"></div>

        {/* Icons */}
        <div className="flex items-center gap-3">
          <button className="relative text-gray-500 hover:text-gray-700 transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
          </button>

          <div className="w-9 h-9 rounded-full bg-orange-100 border border-orange-200 flex items-center justify-center text-orange-700 font-bold text-sm">
            O
          </div>
        </div>
      </div>
    </header>
  );
}
