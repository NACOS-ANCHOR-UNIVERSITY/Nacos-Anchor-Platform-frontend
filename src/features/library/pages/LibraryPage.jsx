import React, { useState, useEffect } from "react";
import { Search, Filter, Plus, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
import ResourceCard from "../components/ResourceCard";

const LibraryPage = () => {
  // --- STATE ---
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  // Filter states
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedSemesters, setSelectedSemesters] = useState([]);

  // Sorting and pagination
  const [sortBy, setSortBy] = useState("newest"); // newest, oldest, title, downloads
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9; // 3 columns x 3 rows

  // --- MOCK DATA (Fallback) ---
  const FALLBACK_RESOURCES = [
    {
      id: 1,
      type: "PDF",
      code: "CSC 201",
      title: "Data Structures & Algorithms",
      author: "Dr. Adeyemi",
      size: "2.4 MB",
      desc: "Comprehensive notes on binary trees, graphs, and sorting...",
      file_url: "#",
      level: "200 Level",
      semester: "Alpha Semester",
      resourceType: "Lecture Notes",
      downloads: 45,
      created_at: "2025-12-15"
    },
    {
      id: 2,
      type: "File",
      code: "GNS 101",
      title: "Use of English Handout",
      author: "Dept. Office",
      size: "500 KB",
      desc: "Official department handout for general studies covering grammar...",
      file_url: "#",
      level: "100 Level",
      semester: "Omega Semester",
      resourceType: "Textbooks",
      downloads: 120,
      created_at: "2025-11-20"
    },
  ];

  // --- FETCH LOGIC ---
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const token = localStorage.getItem("ACCESS_TOKEN") || localStorage.getItem("token");

        console.log("Fetching library resources...");

        const response = await fetch("https://nacos.nextgenerationones.org/api/resources/library", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
        });

        const result = await response.json();
        console.log("API Response:", result);

        if (!response.ok) {
          throw new Error(result.message || "Failed to fetch");
        }

        const apiData = result.data || result;

        if (Array.isArray(apiData) && apiData.length > 0) {
          // Map API fields to your UI fields
          const mappedData = apiData.map(item => ({
            id: item.id,
            type: item.file_type?.toUpperCase() || "PDF",
            code: item.course_code || "GEN 000",
            title: item.title,
            author: item.uploader_name || "Lecturer",
            size: item.file_size || "1.2 MB",
            desc: item.description || "No description provided.",
            file_url: item.file_path,
            level: item.level || "100 Level",
            semester: item.semester || "Alpha Semester",
            resourceType: item.resource_type || "Lecture Notes",
            downloads: item.downloads || 0,
            created_at: item.created_at
          }));
          setResources(mappedData);
        } else {
          console.log("API empty, using fallback data.");
          setResources(FALLBACK_RESOURCES);
        }

      } catch (error) {
        console.error("Library Error:", error);
        setResources(FALLBACK_RESOURCES);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResources();
  }, []);

  // --- FILTER HANDLERS ---
  const handleLevelToggle = (level) => {
    setSelectedLevels(prev =>
      prev.includes(level)
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
    setCurrentPage(1); // Reset to first page when filtering
  };

  const handleTypeToggle = (type) => {
    setSelectedTypes(prev =>
      prev.includes(type)
        ? prev.filter(t => t !== type)
        : [...prev, type]
    );
    setCurrentPage(1);
  };

  const handleSemesterToggle = (semester) => {
    setSelectedSemesters(prev =>
      prev.includes(semester)
        ? prev.filter(s => s !== semester)
        : [...prev, semester]
    );
    setCurrentPage(1);
  };

  // --- FILTERING LOGIC ---
  const filteredResources = resources.filter((res) => {
    // Search filter
    const search = searchTerm.toLowerCase();
    const matchesSearch =
      res.title?.toLowerCase().includes(search) ||
      res.code?.toLowerCase().includes(search) ||
      res.author?.toLowerCase().includes(search) ||
      res.desc?.toLowerCase().includes(search);

    // Level filter
    const matchesLevel =
      selectedLevels.length === 0 || selectedLevels.includes(res.level);

    // Type filter
    const matchesType =
      selectedTypes.length === 0 || selectedTypes.includes(res.resourceType);

    // Semester filter
    const matchesSemester =
      selectedSemesters.length === 0 || selectedSemesters.includes(res.semester);

    return matchesSearch && matchesLevel && matchesType && matchesSemester;
  });

  // --- SORTING LOGIC ---
  const sortedResources = [...filteredResources].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.created_at) - new Date(a.created_at);
      case "oldest":
        return new Date(a.created_at) - new Date(b.created_at);
      case "title":
        return a.title.localeCompare(b.title);
      case "downloads":
        return b.downloads - a.downloads;
      default:
        return 0;
    }
  });

  // --- PAGINATION LOGIC ---
  const totalPages = Math.ceil(sortedResources.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentResources = sortedResources.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generate page numbers for pagination
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
      } else {
        pages.push(1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages);
      }
    }

    return pages;
  };

  // --- CLEAR ALL FILTERS ---
  const clearAllFilters = () => {
    setSelectedLevels([]);
    setSelectedTypes([]);
    setSelectedSemesters([]);
    setSearchTerm("");
    setCurrentPage(1);
  };

  const activeFiltersCount = selectedLevels.length + selectedTypes.length + selectedSemesters.length;

  return (
    <div className="max-w-7xl mx-auto pb-10">
      {/* Header Banner */}
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
            <div className="flex items-center justify-between mb-6 text-gray-900 font-bold border-b border-gray-100 pb-4">
              <div className="flex items-center gap-2">
                <Filter className="w-4 h-4 text-green-600" />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="bg-green-100 text-green-700 text-xs font-bold px-2 py-0.5 rounded-full">
                    {activeFiltersCount}
                  </span>
                )}
              </div>
              {activeFiltersCount > 0 && (
                <button
                  onClick={clearAllFilters}
                  className="text-xs text-gray-500 hover:text-green-600 font-normal"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Filter 1: Academic Level */}
            <FilterGroup title="Academic Level" open>
              {["100 Level", "200 Level", "300 Level", "400 Level"].map((lvl) => (
                <CheckboxItem
                  key={lvl}
                  label={lvl}
                  checked={selectedLevels.includes(lvl)}
                  onChange={() => handleLevelToggle(lvl)}
                />
              ))}
            </FilterGroup>

            {/* Filter 2: Resource Type */}
            <FilterGroup title="Resource Type">
              {["Lecture Notes", "Past Questions", "Textbooks", "Datasets"].map((type) => (
                <CheckboxItem
                  key={type}
                  label={type}
                  checked={selectedTypes.includes(type)}
                  onChange={() => handleTypeToggle(type)}
                />
              ))}
            </FilterGroup>

            {/* Filter 3: Semester */}
            <FilterGroup title="Semester">
              {["Alpha Semester", "Omega Semester"].map((sem) => (
                <CheckboxItem
                  key={sem}
                  label={sem}
                  checked={selectedSemesters.includes(sem)}
                  onChange={() => handleSemesterToggle(sem)}
                />
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
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(1);
                }}
                placeholder="Search by course code, title, or lecturer name (e.g., 'CSC 201')"
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-green-100 focus:border-green-400 transition-all shadow-sm"
              />
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">
              {isLoading
                ? "Loading resources..."
                : `All Resources (${sortedResources.length})`}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Sort by:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white border border-gray-200 rounded-lg px-3 py-1.5 pr-8 font-bold text-gray-900 text-sm cursor-pointer hover:border-green-300 focus:outline-none focus:ring-2 focus:ring-green-100"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="title">Title (A-Z)</option>
                  <option value="downloads">Most Downloaded</option>
                </select>
                <ChevronDown className="w-4 h-4 absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
              </div>
            </div>
          </div>

          {/* LOADING STATE */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="h-48 bg-gray-100 rounded-xl animate-pulse"
                ></div>
              ))}
            </div>
          ) : (
            <>
              {/* THE GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {currentResources.map((res) => (
                  <ResourceCard key={res.id} {...res} />
                ))}
              </div>

              {/* EMPTY STATE */}
              {sortedResources.length === 0 && (
                <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <p className="text-gray-500 font-medium mb-2">
                    No resources found
                  </p>
                  {searchTerm && (
                    <p className="text-sm text-gray-400 mb-4">
                      No results for "{searchTerm}"
                    </p>
                  )}
                  {(searchTerm || activeFiltersCount > 0) && (
                    <button
                      onClick={clearAllFilters}
                      className="text-green-600 text-sm font-bold hover:underline"
                    >
                      Clear all filters
                    </button>
                  )}
                </div>
              )}
            </>
          )}

          {/* PAGINATION */}
          {!isLoading && sortedResources.length > 0 && (
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-10">
              <p className="text-sm text-gray-600">
                Showing {startIndex + 1}-{Math.min(endIndex, sortedResources.length)} of{" "}
                {sortedResources.length} resources
              </p>

              <div className="flex items-center gap-2">
                {/* Previous Button */}
                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {"<"}
                </button>

                {/* Page Numbers */}
                {getPageNumbers().map((page, index) =>
                  page === "..." ? (
                    <span
                      key={`ellipsis-${index}`}
                      className="flex items-end px-2 text-gray-400"
                    >
                      ...
                    </span>
                  ) : (
                    <button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      className={`w-9 h-9 flex items-center justify-center rounded-lg font-bold transition-all ${currentPage === page
                          ? "bg-green-600 text-white shadow-sm"
                          : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                        }`}
                    >
                      {page}
                    </button>
                  )
                )}

                {/* Next Button */}
                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                  {">"}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// --- Helper Components for the Filters ---
const FilterGroup = ({ title, children, open = false }) => {
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

const CheckboxItem = ({ label, checked, onChange }) => (
  <label className="flex items-center gap-2.5 text-sm text-gray-500 cursor-pointer hover:text-gray-900 group">
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500 transition-all cursor-pointer"
    />
    <span className="group-hover:translate-x-0.5 transition-transform">
      {label}
    </span>
  </label>
);

export default LibraryPage;