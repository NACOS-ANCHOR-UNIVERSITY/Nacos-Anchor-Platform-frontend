import React, { useState, useMemo } from "react";
import {
  Plus,
  Search,
  Clock,
  ArrowRight,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";

import {
  CalendarIcon,
  CodeIcon,
  PaintIcon,
  ServerIcon,
  ShieldIcon,
} from "../../assets/icons";

// 1. Import the hook we created
import { useOpportunities } from "../../hooks";
import Skeleton from "../../components/ui/Skeleton";

// Helper function to get icon based on category
const getCategoryIcon = (category) => {
  switch (category) {
    case "Software Dev":
      return { icon: <CodeIcon className="text-[#94A3B8]" size={24} />, bg: "bg-[#F1F5F9] border-[#F1F5F9]" };
    case "Networking":
      return { icon: <ServerIcon className="text-[#6366F1]" size={24} />, bg: "bg-[#EEF2FF] border-[#F1F5F9]" };
    case "Product Design":
      return { icon: <PaintIcon className="text-[#F97316]" size={24} />, bg: "bg-[#FFF7ED] border-[#FFEDD5]" };
    case "Data Analysis":
      return { icon: <ShieldIcon className="text-[#A855F7]" size={24} />, bg: "bg-[#FAF5FF] border-[#F3E8FF]" };
    default:
      return { icon: <CodeIcon className="text-[#94A3B8]" size={24} />, bg: "bg-[#F1F5F9] border-[#F1F5F9]" };
  }
};

// Helper to extract location type for filtering
const getLocationType = (location) => {
  if (location?.toLowerCase().includes("remote")) return "Remote";
  if (location?.toLowerCase().includes("hybrid")) return "Hybrid";
  if (location?.toLowerCase().includes("abuja")) return "Abuja";
  return "Lagos"; // Default to Lagos for any Lagos-based location
};

const ITEMS_PER_PAGE = 4;
const CATEGORIES = [
  "Software Dev",
  "Networking",
  "Data Analysis",
  "Product Design",
];
const LOCATIONS = ["Lagos", "Remote", "Abuja", "Hybrid"];

const SiwesBoard = () => {
  // 2. Use the hook to fetch data from API
  const { data: apiResponse, isLoading, error } = useOpportunities();
  
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedLocations, setSelectedLocations] = useState(["Lagos"]);
  const [currentPage, setCurrentPage] = useState(1);

  // 3. Transform API data to match our component's expected structure
  const jobData = useMemo(() => {
    if (!apiResponse?.data) return [];
    
    return apiResponse.data.map((opportunity) => {
      const { icon, bg } = getCategoryIcon(opportunity.category);
      // Handle tags - API returns array, but might be string in some cases
      const tags = Array.isArray(opportunity.tags) 
        ? opportunity.tags 
        : opportunity.tags?.split(",").map(t => t.trim()) || [];
      
      return {
        id: opportunity.id,
        title: opportunity.role_title,
        company: opportunity.company_name,
        location: opportunity.location,
        type: getLocationType(opportunity.location),
        category: opportunity.category,
        duration: opportunity.duration,
        tags: tags,
        status: opportunity.is_featured ? "Featured" : opportunity.status === "Active" ? "Active" : null,
        posted: opportunity.posted_text || "Recently",
        icon,
        bg,
      };
    });
  }, [apiResponse]);

  const handleCategoryChange = (category) => {
    setCurrentPage(1);
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleLocationChange = (location) => {
    setCurrentPage(1);
    setSelectedLocations((prev) =>
      prev.includes(location)
        ? prev.filter((l) => l !== location)
        : [...prev, location]
    );
  };

  const clearFilters = () => {
    setSearchQuery("");
    setSelectedCategories([]);
    setSelectedLocations([]);
    setCurrentPage(1);
  };

  // Filtering Logic - Now uses jobData from API instead of INITIAL_JOB_DATA
  const filteredJobs = useMemo(() => {
    return jobData.filter((job) => {
      // Search Filter
      const matchesSearch =
        job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        job.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      //  Category Filter (OR logic within categories)
      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(job.category);

      //  Location Filter (OR logic within locations)
      const matchesLocation =
        selectedLocations.length === 0 ||
        selectedLocations.some(
          (loc) => job.type === loc || job.location.includes(loc)
        );

      return matchesSearch && matchesCategory && matchesLocation;
    });
  }, [jobData, searchQuery, selectedCategories, selectedLocations]);

  // Pagination
  const totalPages = Math.ceil(filteredJobs.length / ITEMS_PER_PAGE);
  const currentJobs = filteredJobs.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <div className="w-full max-w-285.5 flex flex-col gap-8">
      {/* Top Header */}
      <div className="bg-white flex flex-col md:flex-row md:items-end justify-between rounded-xl drop-shadow-sm border border-[#E2E8F099] p-6 md:p-8 gap-4">
        <div className="flex flex-col gap-3 max-w-162.25">
          <h1 className="text-[#0F172A] font-bold text-2xl lg:text-3xl xl:text-4xl">
            SIWES Opportunities Board
          </h1>
          <p className="text-[#475569] md:text-lg">
            Find your perfect Industrial Training placement. Browse curated
            internships and job openings posted directly by the NACOS
            executives.
          </p>
        </div>

        <button
          type="button"
          className="bg-[#138601] hover:bg-[#138601]/90 text-white px-5 py-3 rounded-xl text-sm font-medium flex items-center justify-center gap-2 shadow-lg shadow-[#138601]/20 transition-all cursor-pointer whitespace-nowrap"
        >
          <Plus size={18} /> Post Opportunity
        </button>
      </div>

      {/* Main Content Grid */}
      <div className="flex md:flex-row flex-col gap-6">
        {/* Sidebar (Filters) */}
        <div className="md:max-w-55.5 w-full">
          <div className="flex flex-col gap-6 sticky top-4">
            {/* Search */}
            <div className="flex flex-col gap-2 bg-white drop-shadow-xs rounded-xl border border-[#E2E8F099] p-4">
              <label className="text-sm font-bold text-[#0F172A]">Search</label>
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  size={18}
                />
                <input
                  type="text"
                  placeholder="Keywords..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-[#F8FCF8] border border-[#E2E8F0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#138601]/20 focus:border-[#138601] transition-all"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    <X size={14} />
                  </button>
                )}
              </div>
            </div>

            <div className="bg-white drop-shadow-xs rounded-xl border border-[#E2E8F099] p-4 flex flex-col gap-6">
              {/* Category */}
              <div className="flex flex-col gap-3 ">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-[#0F172A]">
                    Category
                  </label>
                  {selectedCategories.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setSelectedCategories([])}
                      className="text-xs text-[#138601] font-medium hover:underline"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  {CATEGORIES.map((cat) => (
                    <label
                      key={cat}
                      className="flex items-center gap-2 cursor-pointer group select-none"
                    >
                      <div className="relative flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedCategories.includes(cat)}
                          onChange={() => handleCategoryChange(cat)}
                          className="peer size-4 cursor-pointer appearance-none rounded bg-brand-secondary border border-[#CBD5E1] transition-all checked:border-[#138601] checked:bg-[#138601] hover:border-[#138601]"
                        />
                        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 peer-checked:opacity-100 text-white pointer-events-none">
                          <svg
                            width="10"
                            height="8"
                            viewBox="0 0 10 8"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M1 4L3.5 6.5L9 1"
                              stroke="currentColor"
                              strokeWidth="1.5"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                      </div>
                      <span
                        className={`text-sm transition-colors ${
                          selectedCategories.includes(cat)
                            ? "text-slate-900 font-medium"
                            : "text-slate-600 group-hover:text-slate-900"
                        }`}
                      >
                        {cat}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <hr className="my-2 border-t-2 border-[#F1F5F9]" />

              {/* Location */}
              <div className="flex flex-col gap-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-bold text-[#0F172A]">
                    Location
                  </label>
                  {selectedLocations.length > 0 && (
                    <button
                      type="button"
                      onClick={() => setSelectedLocations([])}
                      className="text-xs text-[#138601] font-medium hover:underline"
                    >
                      Clear
                    </button>
                  )}
                </div>
                <div className="flex flex-wrap gap-2">
                  {LOCATIONS.map((loc) => {
                    const isActive = selectedLocations.includes(loc);
                    return (
                      <button
                        type="button"
                        key={loc}
                        onClick={() => handleLocationChange(loc)}
                        className={`px-3 py-1 rounded-md text-xs font-medium border transition-colors cursor-pointer ${
                          isActive
                            ? "bg-green-50 text-[#138601] border-green-200 shadow-sm"
                            : "bg-slate-50 text-slate-600 border-slate-200 hover:border-slate-300"
                        }`}
                      >
                        {loc}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Global Clear (Visible if any filter is active) */}
              {(searchQuery ||
                selectedCategories.length > 0 ||
                selectedLocations.length > 0) && (
                <button
                  type="button"
                  onClick={clearFilters}
                  className="mt-2 text-xs text-slate-500 hover:text-[#138601] underline flex justify-center w-full"
                >
                  Reset all filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Job Feed */}
        <div className="w-full flex flex-col gap-4">
          {/* Feed Header */}
          <div className="flex justify-between items-center">
            <p className="text-[#64748B] text-sm">
              {isLoading ? (
                <Skeleton className="h-5 w-32" />
              ) : (
                <>
                  <span className="font-bold text-[#0F172A]">
                    {filteredJobs.length}
                  </span>{" "}
                  opportunities found
                </>
              )}
            </p>

            <div className="flex items-center gap-2">
              <span className="text-[#64748B] text-sm hidden sm:inline">
                Sort by:
              </span>
              <button
                type="button"
                className="flex items-center justify-between gap-1 min-w-30 text-sm font-semibold text-[#138601]"
              >
                Newest <ChevronDown size={16} />
              </button>
            </div>
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-col gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-xl p-5 border border-[#E2E8F099]">
                  <div className="flex gap-4 mb-4">
                    <Skeleton className="size-16 rounded-lg" />
                    <div className="flex-1">
                      <Skeleton className="h-6 w-48 mb-2" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                  <div className="flex gap-2 ml-20 mb-6">
                    <Skeleton className="h-6 w-20" />
                    <Skeleton className="h-6 w-16" />
                    <Skeleton className="h-6 w-16" />
                  </div>
                  <div className="ml-20 pt-4 border-t-2 border-[#F1F5F9]">
                    <Skeleton className="h-4 w-24" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error State */}
          {error && !isLoading && (
            <div className="bg-red-50 rounded-xl p-12 border border-red-200 flex flex-col items-center justify-center text-center gap-3">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-2">
                <X className="text-red-500" size={32} />
              </div>
              <h3 className="text-lg font-bold text-red-800">
                Failed to load opportunities
              </h3>
              <p className="text-red-600 max-w-xs">
                {error.message || "Something went wrong. Please try again later."}
              </p>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && filteredJobs.length === 0 && (
            <div className="bg-white rounded-xl p-12 border border-[#E2E8F099] flex flex-col items-center justify-center text-center gap-3">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-2">
                <Search className="text-slate-400" size={32} />
              </div>
              <h3 className="text-lg font-bold text-slate-800">
                No opportunities found
              </h3>
              <p className="text-slate-500 max-w-xs">
                Try adjusting your search terms or filters to find what you're
                looking for.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="text-[#138601] font-medium hover:underline mt-2"
              >
                Clear all filters
              </button>
            </div>
          )}

          {/* Job Cards - Only show when not loading and no error */}
          {!isLoading && !error && (
          <div className="flex flex-col gap-4">
            {currentJobs.map((job) => (
              <div
                key={job.id}
                className="bg-white rounded-xl p-5 border border-[#E2E8F099] hover:border-[#138601]/50 drop-shadow-xs transition-all group"
              >
                <div className="flex justify-between items-start mb-4">
                  <div className="flex gap-4">
                    <div
                      className={`size-16 rounded-lg ${job.bg} flex items-center justify-center shrink-0`}
                    >
                      {job.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-[#0F172A] text-lg">
                        {job.title}
                      </h3>
                      <p className="text-[#64748B] text-sm font-medium">
                        {job.company} • {job.location}
                      </p>
                    </div>
                  </div>
                  {job.status && (
                    <span
                      className={`text-xs font-medium capitalize px-2 py-1 rounded-md border-2 ${
                        job.status === "Active"
                          ? "bg-[#F0FDF4] text-green-700 border-[#E2E8F099]"
                          : "bg-blue-50 text-blue-700 border-blue-200"
                      }`}
                    >
                      {job.status}
                    </span>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mb-6 ml-20">
                  <span className="px-2 py-1 bg-[#1386010D] rounded text-xs text-[#138601] font-medium flex items-center gap-1">
                    <Clock size={12} /> {job.duration}
                  </span>
                  {job.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-[#F1F5F9]  rounded text-xs text-[#475569] font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="ml-20 flex justify-between items-center pt-4 border-t-2 border-[#F1F5F9]">
                  <span className="text-xs text-[#94A3B8] flex items-center gap-1">
                    <CalendarIcon className="size-3" />
                    Posted {job.posted}
                  </span>
                  <button
                    type="button"
                    className="text-sm font-bold text-[#138601] flex items-center gap-1 hover:gap-2 transition-all"
                  >
                    View Details <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
          )}

          {/* Pagination - Only show when not loading */}
          {!isLoading && !error && totalPages > 1 && (
            <div className="flex justify-center mt-4 gap-2">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
                className="size-9 flex items-center justify-center rounded-lg border border-[#E2E8F0] text-[#475569] hover:bg-slate-50 hover:text-slate-900 bg-white disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronLeft size={16} />
              </button>

              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    type="button"
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`size-9 flex items-center justify-center rounded-lg text-sm font-medium transition-colors cursor-pointer ${
                      currentPage === page
                        ? "bg-[#138601] text-white shadow-sm"
                        : "bg-white border border-slate-200 text-[#475569] hover:bg-slate-50"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}

              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
                className="size-9 flex items-center justify-center rounded-lg border border-[#E2E8F0] text-[#475569] hover:bg-slate-50 hover:text-slate-900 bg-white disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                <ChevronRight size={16} />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-linear-to-r from-[#138601] to-[#1A4A12] rounded-2xl p-8 lg:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl shadow-green-900/10">
        <div className="absolute top-0 right-0 size-64 bg-white/5 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none" />

        <div className="max-w-103 lg:max-w-143 flex flex-col gap-2 text-center md:text-left">
          <h2 className="text-white font-black text-2xl md:text-3xl">
            Are you a Student Representative?
          </h2>
          <p className="text-[#F0FDF4] text-sm md:text-base leading-relaxed">
            If you have verified SIWES opportunities, please contact the Excos
            to get them listed here for your fellow students.
          </p>
        </div>

        <button
          type="button"
          className="bg-white text-[#138601] px-6 py-3 rounded-xl font-bold text-sm hover:bg-green-50 transition-colors drop-shadow-lg cursor-pointer"
        >
          Contact Excos
        </button>
      </div>
    </div>
  );
};

export default SiwesBoard;

