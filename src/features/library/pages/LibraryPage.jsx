import React from "react";
import {Search, Filter, Plus, ChevronDown} from "lucide-react";
import ResourceCard from "../components/ResourceCard";
import {Link} from "react-router-dom";

const LibraryPage = () => {
  // Mock Data to match your screenshot
  const resources = [
    {
      id: 1,
      type: "PDF",
      code: "CSC 201",
      title: "Data Structures & Algorithms",
      author: "Dr. Adeyemi",
      size: "2.4 MB",
      desc: "Comprehensive notes on binary trees, graphs, and sorting...",
    },
    {
      id: 2,
      type: "File",
      code: "GNS 101",
      title: "Use of English Handout",
      author: "Dept. Office",
      size: "500 KB",
      desc: "Official department handout for general studies covering grammar...",
    },
    {
      id: 3,
      type: "Video",
      code: "MTH 102",
      title: "Calculus II Past Questions",
      author: "NACOS Academic",
      size: "1.2 MB",
      desc: "Collected past questions from 2018-2023 sessions for exam prep.",
    },
    {
      id: 4,
      type: "PDF",
      code: "CSC 304",
      title: "Database Lab Dataset",
      author: "Mr. Collins",
      size: "15 MB",
      desc: "Sample SQL dumps and CSV files for the weekly database lab.",
    },
  ];

  return (
    <div className="flex gap-8 items-start">
      {/* --- LEFT SIDEBAR (FILTERS) --- */}
      <aside className="w-64 hidden lg:block shrink-0">
        <div className="bg-white border border-gray-200 rounded-xl p-5 sticky top-24">
          <div className="flex items-center gap-2 mb-6 text-gray-900 font-bold">
            <Filter className="w-5 h-5 text-green-600" />
            Filters
          </div>

          {/* Filter Group 1 */}
          <div className="mb-6 border-b border-gray-100 pb-6">
            <h4 className="text-sm font-bold text-gray-700 mb-3 flex justify-between cursor-pointer">
              Academic Level <ChevronDown className="w-4 h-4" />
            </h4>
            <div className="space-y-2">
              {["100 Level", "200 Level", "300 Level", "400 Level"].map(
                (lvl) => (
                  <label
                    key={lvl}
                    className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-green-700"
                  >
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    {lvl}
                  </label>
                )
              )}
            </div>
          </div>

          {/* Filter Group 2 */}
          <div className="mb-6">
            <h4 className="text-sm font-bold text-gray-700 mb-3 flex justify-between cursor-pointer">
              Resource Type <ChevronDown className="w-4 h-4" />
            </h4>
            <div className="space-y-2">
              {["Lecture Notes", "Past Questions", "Textbooks", "Datasets"].map(
                (type) => (
                  <label
                    key={type}
                    className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer hover:text-green-700"
                  >
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-green-600 focus:ring-green-500"
                    />
                    {type}
                  </label>
                )
              )}
            </div>
          </div>
        </div>
      </aside>

      {/* --- RIGHT CONTENT (GRID) --- */}
      <div className="flex-1">
        {/* 1. Green Header Banner */}
        <div className="bg-green-50 border border-green-100 rounded-xl p-6 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Digital Library
            </h1>
            <p className="text-sm text-gray-600 mt-1 max-w-lg">
              Access verified course materials, past questions, and handouts.
              Organized by level for your convenience.
            </p>
          </div>
          {/* This button links to the Upload Page you already built! */}
          <Link
            to="/student/resources/upload"
            className="bg-green-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-green-700 flex items-center gap-2 shadow-sm transition-transform active:scale-95"
          >
            <Plus className="w-4 h-4" /> Upload Resource
          </Link>
        </div>

        {/* 2. Search & Sort Bar */}
        <div className="bg-white border border-gray-200 rounded-xl p-2 mb-6 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by course code, title, or lecturer..."
              className="w-full pl-10 pr-4 py-2 text-sm outline-none focus:bg-gray-50 rounded-lg transition-colors"
            />
          </div>
          <div className="border-l border-gray-100 pl-4 flex items-center gap-2 pr-2">
            <span className="text-xs text-gray-500 font-medium">Sort by:</span>
            <select className="text-sm font-bold text-gray-700 bg-transparent outline-none cursor-pointer">
              <option>Newest First</option>
              <option>Most Downloaded</option>
              <option>Oldest</option>
            </select>
          </div>
        </div>

        {/* 3. The Grid */}
        <div className="mb-6">
          <h3 className="font-bold text-gray-900 mb-4">Recent Uploads</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {resources.map((res) => (
              <ResourceCard
                key={res.id}
                {...res} // Passes all properties (title, code, etc.) automatically
              />
            ))}
          </div>
        </div>

        {/* 4. Pagination (Simple Visual) */}
        <div className="flex justify-center gap-2 mt-8">
          <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-gray-50">
            {"<"}
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded bg-green-600 text-white font-bold">
            1
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50">
            2
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-600 hover:bg-gray-50">
            3
          </button>
          <span className="flex items-end px-1 text-gray-400">...</span>
          <button className="w-8 h-8 flex items-center justify-center rounded border border-gray-200 text-gray-500 hover:bg-gray-50">
            {">"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default LibraryPage;
