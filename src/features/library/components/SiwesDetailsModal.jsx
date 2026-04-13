import React, {useState, useEffect} from "react";
import {
  X,
  Building2,
  MapPin,
  Clock,
  Calendar,
  ExternalLink,
  Loader2,
  Briefcase,
} from "lucide-react";

export default function SiwesDetailsModal({isOpen, onClose, opportunityId}) {
  const [details, setDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Only fetch if the modal is open and we have an ID
    if (!isOpen || !opportunityId) return;

    const fetchDetails = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // 1. 🧠 SMART TOKEN EXTRACTOR
        let token =
          localStorage.getItem("ACCESS_TOKEN") || localStorage.getItem("token");

        if (!token || token === "null") {
          try {
            const authKey = Object.keys(localStorage).find((key) =>
              key.startsWith("nacos-au"),
            );
            if (authKey) {
              const authData = JSON.parse(localStorage.getItem(authKey));
              console.log("📦 [MODAL] INSIDE THE VAULT:", authData);

              token =
                authData?.state?.token ||
                authData?.state?.user?.token ||
                authData?.token;
              console.log("🔑 [MODAL] EXTRACTED TOKEN:", token);
            }
          } catch (e) {}
        }

        // 2. VITE PROXY URL
        const response = await fetch(
          `https://nacos.nextgenerationones.org/api/siwes/details.php?id=${opportunityId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "application/json",
            },
          },
        );

        const result = await response.json();

        if (result.status === "success") {
          setDetails(result.data);
        } else {
          throw new Error(result.message || "Failed to load details");
        }
      } catch (err) {
        console.error("Error fetching SIWES details:", err);
        setError("Could not load the opportunity details. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchDetails();
  }, [isOpen, opportunityId]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <h2 className="text-xl font-bold text-gray-900">
            Opportunity Details
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Content Area */}
        <div className="overflow-y-auto p-6 md:p-8">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20">
              <Loader2 className="w-8 h-8 text-[#138601] animate-spin mb-4" />
              <p className="text-gray-500 text-sm">Loading details...</p>
            </div>
          ) : error ? (
            <div className="text-center py-10 bg-red-50 rounded-xl border border-red-100 text-red-600">
              {error}
            </div>
          ) : details ? (
            <div className="space-y-8">
              {/* Top Section: Title & Company */}
              <div>
                <div className="flex justify-between items-start mb-3">
                  <h1 className="text-2xl font-bold text-gray-900">
                    {details.role_title}
                  </h1>
                  {details.is_featured === 1 && (
                    <span className="bg-purple-100 text-purple-700 text-xs px-3 py-1 rounded-full font-bold uppercase tracking-wide">
                      Featured
                    </span>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-4 text-gray-600 text-sm">
                  <div className="flex items-center gap-1.5 font-medium text-gray-900">
                    <Building2 className="w-4 h-4 text-[#138601]" />
                    {details.company_name}
                  </div>
                  <div className="hidden sm:block text-gray-300">•</div>
                  <div className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    {details.location}
                  </div>
                </div>
              </div>

              {/* Quick Tags */}
              <div className="flex flex-wrap gap-3">
                <span className="bg-[#1386010D] text-[#138601] px-3 py-1.5 rounded-lg flex items-center gap-2 font-medium text-sm">
                  <Clock className="w-4 h-4" /> {details.duration}
                </span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg flex items-center gap-2 font-medium text-sm">
                  <Briefcase className="w-4 h-4 text-gray-500" />{" "}
                  {details.category}
                </span>
                <span className="bg-gray-100 text-gray-700 px-3 py-1.5 rounded-lg flex items-center gap-2 font-medium text-sm">
                  <Calendar className="w-4 h-4 text-gray-500" />{" "}
                  {details.posted_text}
                </span>
              </div>

              {/* Requirements & Skills */}
              <div className="border-t border-gray-100 pt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-3">
                  Requirements & Details
                </h3>
                <p className="text-gray-600 leading-relaxed text-sm mb-6 whitespace-pre-wrap">
                  {details.requirements || "No specific requirements listed."}
                </p>

                <h4 className="text-sm font-bold text-gray-900 mb-3">
                  Required Skills
                </h4>
                <div className="flex flex-wrap gap-2">
                  {details.tags &&
                    details.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-sm bg-gray-50 border border-gray-200 text-gray-700 px-3 py-1 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                </div>
              </div>

              {/* Apply Button */}
              <div className="border-t border-gray-100 pt-6 mt-8">
                <a
                  href={details.application_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#138601] hover:bg-[#0f6600] text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  Apply for this Role <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
