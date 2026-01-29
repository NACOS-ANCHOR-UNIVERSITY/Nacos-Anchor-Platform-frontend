import React, { useState, useEffect } from "react";
import {
  Clock,
  Tag,
  ExternalLink,
  Calendar,
  User,
  Search,
  Newspaper,
} from "lucide-react";
import { adminService } from "@/services/adminService"; // Import adminService

const StudentNews = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null); // Added error state
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await adminService.getNews();
        // Handle different response structures: response.data (array/object) or response (array)
        const newsItems = Array.isArray(response)
          ? response
          : response.data || [];

        // Map to ensure date formatting and fallback values
        const formattedNews = newsItems.map((post) => ({
          ...post,
          formatted_date:
            post.formatted_date ||
            (post.created_at
              ? new Date(post.created_at).toLocaleDateString()
              : "Just now"),
          category: post.category || "Announcement", // Default category
          author: post.author || "Admin Exec",
        }));

        setPosts(formattedNews);
        setError(null);
      } catch (err) {
        console.error("Error fetching news:", err);
        setError(err.message || "Failed to load news");
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="max-w-5xl mx-auto pb-10">
      {/* Header Banner */}
      <div className="bg-linear-to-r from-gray-900 to-gray-800 rounded-2xl p-8 mb-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2 flex items-center gap-3">
            <Newspaper className="w-8 h-8 text-green-400" /> Departmental News
          </h1>
          <p className="text-gray-300 max-w-2xl text-lg">
            Stay updated with the latest announcements, events, and academic
            notices from the department.
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="absolute right-0 top-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
        <div className="absolute left-0 bottom-0 w-48 h-48 bg-blue-500/10 rounded-full blur-3xl -ml-10 -mb-10"></div>
      </div>

      {/* Search Bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
        <div className="relative w-full md:w-96">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search news & updates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-green-500/20 focus:border-green-500 transition-all shadow-sm"
          />
        </div>
        <div className="flex gap-2 text-sm text-gray-500">
          <span>Sort by:</span>
          <span className="font-bold text-gray-800 cursor-pointer hover:text-green-600">
            Newest First
          </span>
        </div>
      </div>

      {/* News Feed Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl h-64 border border-gray-100 p-6 animate-pulse"
            >
              <div className="h-4 w-1/3 bg-gray-100 rounded mb-4"></div>
              <div className="h-6 w-3/4 bg-gray-100 rounded mb-4"></div>
              <div className="space-y-2">
                <div className="h-3 w-full bg-gray-100 rounded"></div>
                <div className="h-3 w-full bg-gray-100 rounded"></div>
                <div className="h-3 w-5/6 bg-gray-100 rounded"></div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-20 bg-red-50 rounded-2xl border border-dashed border-red-200">
          <div className="bg-white p-4 rounded-full inline-flex mb-4 shadow-sm">
            <Newspaper className="w-8 h-8 text-red-300" />
          </div>
          <h3 className="text-lg font-bold text-red-900 mb-1">
            Failed to Load News
          </h3>
          <p className="text-red-500">
            {error}. Please check your connection or try again later.
          </p>
        </div>
      ) : filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col group"
            >
              {post.image_url && (
                <div className="h-48 w-full bg-gray-100 overflow-hidden">
                  <img
                    src={post.image_url}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              )}

              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-3">
                  <span
                    className={`px-2.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                      post.category === "Announcement"
                        ? "bg-amber-50 text-amber-700 border border-amber-100"
                        : post.category === "Academic"
                          ? "bg-blue-50 text-blue-700 border border-blue-100"
                          : "bg-green-50 text-green-700 border border-green-100"
                    }`}
                  >
                    {post.category}
                  </span>
                  <span className="text-gray-400 text-xs flex items-center gap-1">
                    <Calendar className="w-3 h-3" /> {post.formatted_date}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-700 transition-colors">
                  {post.title}
                </h2>

                <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3">
                  {post.content}
                </p>

                <div className="mt-auto pt-4 border-t border-gray-50 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500">
                      <User className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-700">
                        {post.author}
                      </p>
                      <p className="text-[10px] text-gray-500">
                        Posted by Admin
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
          <div className="bg-white p-4 rounded-full inline-flex mb-4 shadow-sm">
            <Newspaper className="w-8 h-8 text-gray-300" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            No Updates Found
          </h3>
          <p className="text-gray-500">
            There are no news updates available at the moment.
          </p>
        </div>
      )}
    </div>
  );
};

export default StudentNews;
