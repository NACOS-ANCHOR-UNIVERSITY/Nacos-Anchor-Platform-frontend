import React from "react";
import { Clock, Download, Loader2 } from "lucide-react";
import { useAdminDashboard, useExportLogs } from "@/hooks/useAdmin";
import Skeleton from "@/components/ui/Skeleton";

// Helper for status badge colors
const getStatusColor = (status) => {
  switch (status?.toLowerCase()) {
    case "success":
    case "completed":
    case "successful":
    case "active":
      return "bg-green-100 text-green-700";
    case "pending":
    case "review":
    case "processing":
      return "bg-amber-100 text-amber-700";
    case "failed":
    case "rejected":
    case "error":
      return "bg-red-100 text-red-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

const AdminActivityLogs = () => {
  const { data: dashboardData, isLoading, error } = useAdminDashboard();
  const { mutate: exportLogs, isPending: isExporting } = useExportLogs();

  const activities =
    dashboardData?.data?.activities ||
    dashboardData?.data?.recent_activities ||
    [];

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
          Error loading logs: {error.message || "Something went wrong"}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[#0F172A] font-bold text-2xl lg:text-3xl">
            Activity Logs
          </h1>
          <p className="text-[#64748B] text-sm mt-1">
            View and monitor all administrative actions and system events.
          </p>
        </div>

        <button
          onClick={() => exportLogs()}
          disabled={isExporting}
          className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-[#334155] bg-white border border-[#E2E8F0] rounded-xl hover:bg-gray-50 transition-all active:scale-95 shadow-sm disabled:opacity-50 cursor-pointer"
        >
          {isExporting ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Download className="w-4 h-4" />
          )}
          {isExporting ? "Exporting..." : "Export Report"}
        </button>
      </div>

      {/* Main Table Card */}
      <div className="bg-white border border-[#F1F5F9] rounded-3xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[#F1F5F9] bg-[#F8FAFC]">
          <h3 className="text-lg font-bold text-[#0F172A] flex items-center gap-2">
            <Clock className="w-5 h-5 text-[#138601]" />
            System Activities
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-[#F8FAFC] border-b border-[#F1F5F9]">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase tracking-wider">
                  Activity
                </th>
                <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase tracking-wider">
                  Date & Time
                </th>
                <th className="px-6 py-4 text-xs font-bold text-[#64748B] uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {isLoading ? (
                // Skeleton Rows
                Array(8)
                  .fill(0)
                  .map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      <td className="px-6 py-4">
                        <Skeleton className="h-4 w-48" />
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <Skeleton className="h-8 w-8 rounded-full" />
                          <div className="space-y-1">
                            <Skeleton className="h-3 w-24" />
                            <Skeleton className="h-2 w-16" />
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <Skeleton className="h-3 w-20" />
                          <Skeleton className="h-2 w-16" />
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <Skeleton className="h-6 w-20 rounded-full" />
                      </td>
                    </tr>
                  ))
              ) : activities.length === 0 ? (
                // Empty State
                <tr>
                  <td colSpan="4" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center text-gray-400">
                      <div className="bg-gray-50 p-4 rounded-full mb-3">
                        <Clock className="w-8 h-8 opacity-50" />
                      </div>
                      <p className="font-medium text-gray-500">
                        No recent activities found
                      </p>
                      <p className="text-sm mt-1">
                        Actions performed by admins will appear here.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                // Data Rows
                activities.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50/50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <p className="font-semibold text-[#0F172A] text-sm">
                        {item.action}
                      </p>
                      <p className="text-xs text-[#64748B] mt-0.5">
                        {item.details || "System Action"}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#138601]/10 flex items-center justify-center text-[#138601] font-bold text-xs">
                          {item.admin_name?.[0] || "A"}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-[#334155]">
                            {item.admin_name}
                          </p>
                          <p className="text-[10px] text-[#64748B]">
                            {item.role || "Administrator"}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-xs font-medium text-[#334155]">
                          {item.formatted_date ||
                            item.created_at?.split(" ")[0]}
                        </span>
                        <span className="text-[10px] text-[#64748B]">
                          {item.time_ago ||
                            item.created_at?.split(" ")[1] ||
                            "Just now"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(
                          item.status,
                        )}`}
                      >
                        {item.status || "Completed"}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer (Placeholder for now since we don't have real pagination) */}
        {!isLoading && activities.length > 0 && (
          <div className="px-6 py-4 border-t border-[#F1F5F9] bg-[#F8FAFC] flex items-center justify-between">
            <p className="text-xs text-[#64748B]">
              Showing <span className="font-bold">{activities.length}</span>{" "}
              results
            </p>
            <div className="flex gap-2">
              <button
                disabled
                className="px-3 py-1 text-xs border border-[#E2E8F0] rounded-lg bg-white text-[#94A3B8] cursor-not-allowed"
              >
                Previous
              </button>
              <button
                disabled
                className="px-3 py-1 text-xs border border-[#E2E8F0] rounded-lg bg-white text-[#94A3B8] cursor-not-allowed"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminActivityLogs;
