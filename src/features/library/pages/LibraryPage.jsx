import React from "react";
import {Search, Filter, Plus, ChevronDown, ChevronUp} from "lucide-react";
import {Link} from "react-router-dom";
import ResourceCard from "../components/ResourceCard";

const LibraryPage = () => {
  // Mock Data
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
    {
      id: 5,
      type: "PDF",
      code: "PHY 101",
      title: "Mechanics Textbook Vol 1",
      author: "Library Admin",
      size: "45 MB",
      desc: "Digital copy of the recommended text for first year physics.",
    },
    {
      id: 6,
      type: "PDF",
      code: "CSC 401",
      title: "Final Year Project Guidelines",
      author: "Project Coordinator",
      size: "1.1 MB",
      desc: "Formatting rules, chapter outlines, and submission deadlines for FYP.",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
    
      <div className="bg-green-50 border border-green-100 rounded-xl p-6 mb-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-1">
            Digital Library
          </h1>
          <p className="text-sm text-gray-600 max-w-xl leading-snug">
            Access verified course materials, past questions, and handouts.
          </p>
        </div>
        <Link
          to="/student/resources/upload"
          className="bg-green-600 text-white px-5 py-2.5 rounded-lg text-sm font-bold hover:bg-green-700 flex items-center gap-2 shadow-sm transition-transform active:scale-95 shrink-0"
        >
          <Plus className="w-4 h-4" /> Upload Resource
        </Link>
      </div>

    
      <div className="flex flex-col lg:flex-row gap-8 items-start">
        {/* --- LEFT SIDEBAR (FILTERS) --- */}
        <aside className="w-full lg:w-64 shrink-0">
          <div className="bg-white border border-gray-200 rounded-xl p-5 sticky top-6">
            <div className="flex items-center gap-2 mb-6 text-gray-900 font-bold border-b border-gray-100 pb-4">
              <Filter className="w-4 h-4 text-green-600" />
              Filters
            </div>

            {/* Filter 1: Academic Level */}
            <FilterGroup title="Academic Level" open>
              {["100 Level", "200 Level", "300 Level", "400 Level"].map(
                (lvl) => (
                  <CheckboxItem key={lvl} label={lvl} />
                )
              )}
            </FilterGroup>

            {/* Filter 2: Resource Type */}
            <FilterGroup title="Resource Type">
              {["Lecture Notes", "Past Questions", "Textbooks", "Datasets"].map(
                (type) => (
                  <CheckboxItem key={type} label={type} />
                )
              )}
            </FilterGroup>

            {/* Filter 3: Semester */}
            <FilterGroup title="Semester">
              {["Alpha Semester", "Omega Semester"].map((sem) => (
                <CheckboxItem key={sem} label={sem} />
              ))}
            </FilterGroup>
          </div>
        </aside>

        {/* --- RIGHT COLUMN (SEARCH & GRID) --- */}
        <div className="flex-1 min-w-0">
          {/* Search & Sort Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by course code, title, or lecturer name (e.g., 'CSC 201')"
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-green-100 focus:border-green-400 transition-all shadow-sm"
              />
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">Recent Uploads</h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Sort by:</span>
              <button className="font-bold text-gray-900 flex items-center gap-1">
                Newest First <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* The Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {resources.map((res) => (
              <ResourceCard key={res.id} {...res} />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-10">
            <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50">
              {"<"}
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-green-600 text-white font-bold shadow-sm">
              1
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">
              2
            </button>
            <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">
              3
            </button>
            <span className="flex items-end px-2 text-gray-400">...</span>
            <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50">
              {">"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Helper Components for the Filters ---

const FilterGroup = ({title, children, open = false}) => {
  const [isOpen, setIsOpen] = React.useState(open);
  return (
    <div className="mb-6 border-b border-gray-50 pb-4 last:border-0 last:mb-0 last:pb-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-sm font-bold text-gray-800 mb-3 hover:text-green-700 transition-colors"
      >
        {title}
        {isOpen ? (
          <ChevronUp className="w-3.5 h-3.5 text-gray-400" />
        ) : (
          <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
        )}
      </button>
      {isOpen && (
        <div className="space-y-2.5 animate-in slide-in-from-top-1 duration-200">
          {children}
        </div>
      )}
    </div>
  );
};

const CheckboxItem = ({label}) => (
  <label className="flex items-center gap-2.5 text-sm text-gray-500 cursor-pointer hover:text-gray-900 group">
    <input
      type="checkbox"
      className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500 transition-all cursor-pointer"
    />
    <span className="group-hover:translate-x-0.5 transition-transform">
      {label}
    </span>
  </label>
);

export default LibraryPage;
