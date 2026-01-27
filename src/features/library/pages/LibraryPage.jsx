import React, { useState, useEffect } from "react";
import { Search, Filter, Plus, ChevronDown, ChevronUp } from "lucide-react";
import { Link } from "react-router-dom";
import ResourceCard from "../components/ResourceCard";

const LibraryPage = () => {
  // --- STATE ---
  const [resources, setResources] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

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
      file_url: "#"
    },
    {
      id: 2,
      type: "File",
      code: "GNS 101",
      title: "Use of English Handout",
      author: "Dept. Office",
      size: "500 KB",
      desc: "Official department handout for general studies covering grammar...",
      file_url: "#"
    },

  ];

  // --- FETCH LOGIC ---
  useEffect(() => {
    const fetchResources = async () => {
      try {
        const token = localStorage.getItem("ACCESS_TOKEN") || localStorage.getItem("token");

        console.log("Fetching library resources...");

        // 1. Direct Fetch
        const response = await fetch("https://nacos.nextgenerationones.org/api/resources", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
            "Accept": "application/json"
          }
        });

        const result = await response.json();

        // 2. Handle Errors
        if (!response.ok) {
          throw new Error(result.message || "Failed to fetch");
        }

        // 3. Process Data
        const apiData = result.data || result;

        if (Array.isArray(apiData) && apiData.length > 0) {
          // Map API fields to your UI fields
          const mappedData = apiData.map(item => ({
            id: item.id,
            type: item.type || "PDF", // Default to PDF if missing
            code: item.course_code || "GEN 000",
            title: item.title,
            author: item.uploaded_by || "Lecturer", // Adjust based on actual API
            size: item.size || "1.2 MB", // Fake size if API doesn't have it
            desc: item.description || "No description provided.",
            file_url: item.file_url
          }));
          setResources(mappedData);
        } else {
          // If API returns empty list, use fallback
          console.log("API empty, using fallback data.");
          setResources(FALLBACK_RESOURCES);
        }

      } catch (error) {
        console.error("Library Error:", error);
        // On crash, use fallback so demo continues
        setResources(FALLBACK_RESOURCES);
      } finally {
        setIsLoading(false);
      }
    };

    fetchResources();
  }, []);

  // --- CLIENT-SIDE SEARCH FILTER ---
  const filteredResources = resources.filter((res) => {
    const search = searchTerm.toLowerCase();
    return (
      res.title?.toLowerCase().includes(search) ||
      res.code?.toLowerCase().includes(search) ||
      res.author?.toLowerCase().includes(search)
    );
  });

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
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by course code, title, or lecturer name (e.g., 'CSC 201')"
                className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl text-sm outline-none focus:ring-2 focus:ring-green-100 focus:border-green-400 transition-all shadow-sm"
              />
            </div>
          </div>

          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">
              {isLoading ? "Loading resources..." : `All Resources (${filteredResources.length})`}
            </h3>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Sort by:</span>
              <button className="font-bold text-gray-900 flex items-center gap-1">
                Newest First <ChevronDown className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* LOADING STATE */}
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-48 bg-gray-100 rounded-xl animate-pulse"></div>
              ))}
            </div>
          ) : (
            <>
              {/* THE GRID */}
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filteredResources.map((res) => (
                  <ResourceCard key={res.id} {...res} />
                ))}
              </div>

              {/* EMPTY STATE (If search returns nothing) */}
              {filteredResources.length === 0 && (
                <div className="text-center py-20 bg-gray-50 rounded-xl border border-dashed border-gray-200">
                  <p className="text-gray-500 font-medium">No resources found matching "{searchTerm}"</p>
                  <button onClick={() => setSearchTerm("")} className="text-green-600 text-sm font-bold mt-2 hover:underline">Clear Search</button>
                </div>
              )}
            </>
          )}

          {/* Pagination (Static for Demo) */}
          {!isLoading && filteredResources.length > 0 && (
            <div className="flex justify-center gap-2 mt-10">
              <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50">{"<"}</button>
              <button className="w-9 h-9 flex items-center justify-center rounded-lg bg-green-600 text-white font-bold shadow-sm">1</button>
              <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">2</button>
              <span className="flex items-end px-2 text-gray-400">...</span>
              <button className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-50">{">"}</button>
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
        {isOpen ? <ChevronUp className="w-3.5 h-3.5 text-gray-400" /> : <ChevronDown className="w-3.5 h-3.5 text-gray-400" />}
      </button>
      {isOpen && <div className="space-y-2.5 animate-in slide-in-from-top-1 duration-200">{children}</div>}
    </div>
  );
};

const CheckboxItem = ({ label }) => (
  <label className="flex items-center gap-2.5 text-sm text-gray-500 cursor-pointer hover:text-gray-900 group">
    <input
      type="checkbox"
      className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500 transition-all cursor-pointer"
    />
    <span className="group-hover:translate-x-0.5 transition-transform">{label}</span>
  </label>
);

export default LibraryPage;