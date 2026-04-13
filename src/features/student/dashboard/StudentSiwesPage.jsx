import React, {useState, useEffect} from "react";
import PageHeader from "../../../components/ui/PageHeader";
import SiwesDetailsModal from "../../../features/library/components/SiwesDetailsModal";
// import Sidebar from "../../../components/ui/Sidebar" // Uncomment if using
import {
  Calendar,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Clock5,
  Code,
  HardDrive,
  Paintbrush,
  Search,
  ShieldUser,
  Loader2,
} from "lucide-react";

function StudentSiwesPageHeader() {
  return (
    <div className="bg-white rounded-2xl p-8 mt-2 mb-8 border-1 border-[#E2E8F099]">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 text-stroke-1 mb-2">
            SIWES Opportunities Board
          </h1>
          <p className="text-gray-600 text-sm ">
            Find your perfect Industrial Training placement. Browse curated{" "}
            <br />
            internships and job openings posted directly by the NACOS
            executives.
          </p>
        </div>
        <button className="bg-[#138601] hover:bg-[#0f6600] text-white px-6 py-2 rounded-xl font-semibold flex items-center gap-2 transition whitespace-nowrap sm:ml-4 w-full sm:w-auto cursor-pointer">
          <span>+</span> Post Opportunity
        </button>
      </div>
    </div>
  );
}

// Helper to assign icons based on API category
const getCategoryIcon = (category) => {
  const cat = (category || "").toLowerCase();
  if (cat.includes("network")) return <HardDrive className="text-[#6366F1]" />;
  if (cat.includes("design") || cat.includes("ui"))
    return <Paintbrush className="text-[#F97316]" />;
  if (cat.includes("security") || cat.includes("cyber"))
    return <ShieldUser className="text-[#A855F7]" />;
  return <Code className="text-[#94A3B8]" />; // Default for Software Dev / Others
};

function StudentSiwesPageBody() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]); // Default empty to show all
  const [sortBy, setSortBy] = useState("Newest");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedLocation, setSelectedLocation] = useState(null);

  // API States
  const [opportunities, setOpportunities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  //to track click action on view details
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedOppId, setSelectedOppId] = useState(null);

  const categories = [
    "Software Dev",
    "Networking",
    "Data Analysis",
    "Product Design",
  ];
  const locations = ["Lagos", "Remote", "Abuja", "Hybrid"];

  // Fetch Data from API
  // Fetch Data from API
  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        // 1. 🧠 SMART TOKEN EXTRACTOR (X-RAY VERSION)
        let token =
          localStorage.getItem("token") || localStorage.getItem("ACCESS_TOKEN");

        if (!token || token === "null") {
          try {
            const authKey = Object.keys(localStorage).find((key) =>
              key.startsWith("nacos-au"),
            );
            if (authKey) {
              const authData = JSON.parse(localStorage.getItem(authKey));
              console.log("📦 [LIST] INSIDE THE VAULT:", authData); // <--- Look for this in the console!

              token =
                authData?.state?.token ||
                authData?.state?.user?.token ||
                authData?.token;
              console.log("🔑 [LIST] EXTRACTED TOKEN:", token);
            }
          } catch (e) {
            console.error("Failed to parse auth storage:", e);
          }
        }

        // 2. VITE PROXY URL (Tricks the browser to bypass CORS!)
        const response = await fetch("https://nacos.nextgenerationones.org/api/siwes/list", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        if (data.status === "success") {
          setOpportunities(data.data);
        }
      } catch (error) {
        console.error("Error fetching SIWES opportunities:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchOpportunities();
  }, []);

  // Filter Logic
  const filteredOpportunities = opportunities.filter((opp) => {
    // Search (matches role or company)
    const matchesSearch =
      (opp.role_title || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      (opp.company_name || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

    // Category
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(opp.category);

    // Location (Partial match since API returns e.g. "Victoria Island, Lagos")
    const matchesLocation =
      !selectedLocation ||
      (opp.location || "")
        .toLowerCase()
        .includes(selectedLocation.toLowerCase());

    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <div className="flex flex-col lg:flex-row gap-6">
      {/* SIDEBAR FILTERS */}
      <div className="w-full lg:w-72 flex-shrink-0 flex flex-col gap-4 lg:gap-2 rounded-2xl p-0 lg:p-6 h-fit lg:sticky lg:top-24">
        <div className="bg-white rounded-2xl p-6 border-1 border-[#E2E8F099]">
          <label className="block text-sm font-bold text-gray-900 mb-3">
            Search
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-[10px] w-5 h-5 text-[#138601]" />
            <input
              type="text"
              placeholder="Keywords..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#F8FCF8] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#138601] text-sm"
            />
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 border-1 border-[#E2E8F099]">
          <div className="flex justify-end">
            <button
              className="text-sm text-[#138601] cursor-pointer"
              onClick={() => setSelectedCategories([])}
            >
              Clear
            </button>
          </div>
          <div className="mb-8 pb-8 border-b border-gray-200">
            <label className="block text-sm font-bold text-gray-900 mb-3">
              Category
            </label>
            <div className="space-y-3">
              {categories.map((category) => (
                <label
                  key={category}
                  className="flex items-center gap-3 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(category)}
                    onChange={(e) =>
                      e.target.checked
                        ? setSelectedCategories([
                            ...selectedCategories,
                            category,
                          ])
                        : setSelectedCategories(
                            selectedCategories.filter((c) => c !== category),
                          )
                    }
                    className="w-4 h-4 cursor-pointer appearance-none rounded-md border border-[#CBD5E1] bg-[#F8FAFC] checked:bg-[#138601] checked:border-[#138601] flex items-center justify-center after:content-['✔'] after:text-white after:text-xs after:hidden checked:after:block"
                  />
                  <span className="text-sm text-gray-700">{category}</span>
                </label>
              ))}
            </div>
          </div>

          <label className="block text-sm font-bold text-gray-900 mb-3">
            Location
          </label>
          <div className="flex flex-wrap gap-2">
            {locations.map((location) => {
              const isSelected = selectedLocation === location;
              return (
                <button
                  key={location}
                  onClick={() =>
                    setSelectedLocation(isSelected ? null : location)
                  }
                  className={`px-3 py-1 text-xs rounded-lg transition font-medium cursor-pointer ${
                    isSelected
                      ? "border border-[#138601] text-[#138601] bg-[#1386010D]"
                      : "bg-[#F1F5F9] text-gray-600 border border-[#F1F5F9] hover:border-0 hover:border-[#138601] hover:text-[#138601] hover:bg-[#1386010D]"
                  }`}
                >
                  {location}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* MAIN CONTENT AREA */}
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-6">
          <p className="text-[#64748B] font-medium text-sm">
            <span className="font-bold text-black">
              {filteredOpportunities.length}{" "}
            </span>
            opportunities found
          </p>
          <div>
            <span className="text-gray-600 text-sm">Sort by:</span>
            <div className="relative inline-block ml-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 py-1 pr-8 bg-transparent rounded-lg text-sm font-semibold text-[#138601] focus:outline-none focus:ring-2 focus:ring-[#138601] cursor-pointer appearance-none"
              >
                <option>Newest</option>
                <option>Oldest</option>
                <option>Most Relevant</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
            </div>
          </div>
        </div>

        {/* LOADING STATE */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-8 h-8 text-[#138601] animate-spin" />
          </div>
        ) : filteredOpportunities.length === 0 ? (
          <div className="bg-white rounded-xl p-8 text-center border-1 border-[#E2E8F099]">
            <p className="text-gray-500">
              No opportunities match your current filters.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOpportunities.map((opp) => (
              <div
                key={opp.id}
                className="bg-white rounded-xl p-6 hover:shadow-lg transition border-1 border-[#E2E8F099]"
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#1386010D] flex items-center justify-center flex-shrink-0">
                    {getCategoryIcon(opp.category)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        {/* Mapped to API keys */}
                        <h3 className="text-base font-bold text-gray-900">
                          {opp.role_title}
                        </h3>
                        <p className="text-gray-600 text-sm">
                          {opp.company_name} • {opp.location}
                        </p>
                      </div>
                      {opp.is_featured === 1 && (
                        <span className="bg-purple-100 text-purple-700 text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wide">
                          Featured
                        </span>
                      )}
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3 mt-1">
                      <span className="text-xs bg-[#1386010D] text-[#138601] px-2 py-1 rounded flex items-center gap-1 font-medium">
                        <Clock5 className="w-3 h-3" />
                        {opp.duration}
                      </span>
                      {/* Mapping 'tags' array instead of 'skills' */}
                      {opp.tags &&
                        opp.tags.map((tag) => (
                          <span
                            key={tag}
                            className="text-xs bg-gray-100 text-gray-600 px-2 py-1 flex items-center rounded"
                          >
                            {tag}
                          </span>
                        ))}
                    </div>

                    <div className="flex justify-between items-center mt-4">
                      {/* Using 'posted_text' from the API directly */}
                      <p className="text-xs text-gray-500 flex items-center gap-1">
                        <Calendar className="w-3" />
                        {opp.posted_text}
                      </p>

                      <button
                        onClick={() => {
                          console.log("🚨 BUTTON CLICKED! ID:", opp.id); // ADD THIS LINE
                          setSelectedOppId(opp.id);
                          setIsDetailsModalOpen(true);
                        }}
                        className="text-[#138601] font-semibold text-sm hover:underline cursor-pointer"
                      >
                        View Details →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* PAGINATION (Static for now, but UI preserved) */}
        {!isLoading && filteredOpportunities.length > 0 && (
          <div className="flex flex-wrap justify-center items-center gap-2 mt-8">
            <button className="px-3 py-2 text-gray-400 rounded transition cursor-pointer hover:bg-gray-100">
              <ChevronLeft className="w-4 h-4" />
            </button>
            {[1, 2, 3].map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded transition font-semibold text-sm cursor-pointer ${
                  page === currentPage
                    ? "bg-[#138601] text-white"
                    : "text-[#475569] hover:bg-[#1386010D] border-1 border-[#E2E8F0] hover:border-[#138601]"
                }`}
              >
                {page}
              </button>
            ))}
            <button className="px-3 py-2 text-[#475569] rounded transition cursor-pointer hover:bg-gray-100">
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
      <SiwesDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        opportunityId={selectedOppId}
      />
    </div>
  );
}

function StudentSiwesPageCTA() {
  return (
    <div className="mt-16 bg-gradient-to-r from-[#138601] to-[#1A4A12] rounded-2xl p-8 py-10 text-white">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold mb-2">
            Are you a Student Representative?
          </h2>
          <p className="text-green-100 text-sm lg:w-3/5">
            If you have verified SIWES opportunities, please contact the Excos
            to get them listed here for your fellow students.
          </p>
        </div>
        <button className="bg-white text-[#138601] px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transition flex-shrink-0 w-full sm:w-auto cursor-pointer">
          Contact Excos
        </button>
      </div>
    </div>
  );
}

export default function StudentSiwesPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#F8FCF8] font-sans">
      {/* <Sidebar {...{ isOpen, setIsOpen, active: "SIWES" }} /> */}
      <main className="flex-1 relative">
        <PageHeader {...{isOpen, setIsOpen, location: "SIWES Board"}} />
        <div className="flex justify-center">
          <div className="container w-full max-w-6xl px-4 py-4 sm:px-6 sm:py-6 lg:p-8">
            <StudentSiwesPageHeader />
            <StudentSiwesPageBody />
            <StudentSiwesPageCTA />
          </div>
        </div>
      </main>
    </div>
  );
}
 