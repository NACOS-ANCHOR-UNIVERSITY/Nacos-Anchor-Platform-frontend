import React, { useState } from "react";
import { PencilIcon, TrashIcon } from "@/assets/icons";
import Spinner from "@/components/ui/Spinner";
import Skeleton from "@/components/ui/Skeleton";

const ManageListings = ({ listings = [], loading }) => {
  const [activeTab, setActiveTab] = useState("active");

  return (
    <div className="rounded-3xl drop-shadow-sm border border-[#F1F5F9] bg-white">
      {/* Header */}
      <div className="bg-white border-b border-[#F1F5F9] px-6 py-5 rounded-t-3xl flex items-center justify-between">
        <p className="text-[#0F172A] font-bold text-lg">Manage Listings</p>

        <div className="flex items-center gap-4 text-sm font-medium">
          <button
            onClick={() => setActiveTab("active")}
            className={`pb-1 transition-all duration-200 ${
              activeTab === "active"
                ? "border-b-2 border-[#138601] text-[#138601]"
                : "border-b-2 border-transparent text-[#64748B] hover:text-[#0F172A]"
            }`}
          >
            Active (12)
          </button>
          <button
            onClick={() => setActiveTab("archived")}
            className={`pb-1 transition-all duration-200 ${
              activeTab === "archived"
                ? "border-b-2 border-[#138601] text-[#138601]"
                : "border-b-2 border-transparent text-[#64748B] hover:text-[#0F172A]"
            }`}
          >
            Archived
          </button>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F8FAFC] text-[#64748B] text-xs font-medium uppercase tracking-wide border-b border-[#F1F5F9]">
              <th className="px-6 py-4 font-semibold">Role / Company</th>
              <th className="px-6 py-4 font-semibold">Posted</th>
              <th className="px-6 py-4 font-semibold">Location</th>
              <th className="px-6 py-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F5F9]">
            {loading ? (
              Array.from({ length: 3 }).map((_, i) => (
                <tr key={i}>
                  <td className="px-6 py-4">
                    <Skeleton className="h-5 w-32 mb-2" />
                    <Skeleton className="h-4 w-20" />
                  </td>
                  <td className="px-6 py-4">
                    <Skeleton className="h-4 w-20" />
                  </td>
                  <td className="px-6 py-4">
                    <Skeleton className="h-4 w-20" />
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Spinner size={20} />
                  </td>
                </tr>
              ))
            ) : listings.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center py-8">
                  No listings found.
                </td>
              </tr>
            ) : (
              listings.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50/50 transition-colors duration-150"
                >
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-[#0F172A] font-bold text-sm">
                        {item.role_title}
                      </span>
                      <span className="text-[#64748B] text-xs">
                        {item.company_name}
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-[#475569] text-sm">
                    {item.formatted_date || item.posted_at}
                  </td>
                  <td className="px-6 py-4 text-[#475569] text-sm">
                    {item.location}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        type="button"
                        className="size-7.5 flex items-center justify-center rounded-md bg-[#F1F5F9] text-[#94A3B8] hover:text-[#138601] hover:bg-[#e6f5e3] transition-colors cursor-pointer"
                      >
                        <PencilIcon className="size-4.5" />
                      </button>
                      <button
                        type="button"
                        className="size-7.5 flex items-center justify-center rounded-md bg-[#F1F5F9] text-[#94A3B8] hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                      >
                        <TrashIcon className="size-4.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-[#F1F5F9] bg-white rounded-b-3xl flex justify-center">
        <button
          type="button"
          className="text-[#64748B] uppercase text-xs font-medium tracking-wider hover:text-[#0F172A] transition-colors duration-150 cursor-pointer"
        >
          View All Listings
        </button>
      </div>
    </div>
  );
};

export default ManageListings;

