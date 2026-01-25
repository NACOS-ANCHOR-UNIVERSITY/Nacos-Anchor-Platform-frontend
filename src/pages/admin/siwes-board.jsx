import {
  Briefcase3Icon,
  CheckMark2Icon,
  DownloadIcon,
  EnvelopeIcon,
  LogbookIcon,
  PendingLogsIcon,
  SettingsIcon,
} from "../../assets/icons";
import { Link } from "react-router-dom";

import ManageListings from "@/components/admin/siwes-board/ManageListing";
import PostNewOpportunity from "@/components/admin/siwes-board/PostNewOpportunity";
import ModerationQueue from "@/components/admin/siwes-board/ModerationQueue";
import { useEffect, useState } from "react";
import { getSiwesBoardData } from "@/features/admin/siwes/api";
import Spinner from "@/components/ui/Spinner";
import Skeleton from "@/components/ui/Skeleton";

const SiwesBoardMgt = () => {
  const [loading, setLoading] = useState(true);
  const [metrics, setMetrics] = useState({
    active_opportunities: 0,
    pending_logs: 0,
    placed_students: 0,
  });
  const [moderationQueue, setModerationQueue] = useState([]);
  const [listings, setListings] = useState([]);

  const fetchBoardData = () => {
    setLoading(true);
    getSiwesBoardData()
      .then((res) => {
        if (res?.status === "success" && res.data) {
          setMetrics(res.data.metrics || {});
          setModerationQueue(res.data.moderation_queue || []);
          setListings(res.data.listings || []);
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBoardData();
  }, []);

  return (
    <div className="flex flex-col gap-6">
      {/* header */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between">
        <span className="flex flex-col gap-1">
          <h1 className="text-[#0F172A] font-bold text-2xl lg:text-3xl">
            SIWES Board Management
          </h1>
          <p className="text-sm md:text-base text-[#64748B]">
            Manage opportunities, track student placements, and moderate
            logbooks.
          </p>
        </span>

        <button
          type="button"
          className="flex items-center w-max gap-2 py-2 px-4 border border-[#E2E8F0] bg-white rounded-xl text-sm text-[#334155] font-medium transition-all active:scale-95 duration-150 cursor-pointer"
        >
          <DownloadIcon />
          Export Report
        </button>
      </div>

      {/* stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white border border-[#F1F5F9] drop-shadow-sm hover:drop-shadow-none transition-all duration-100 flex items-center gap-4 p-6 rounded-3xl">
          <span className="size-12 rounded-2xl flex items-center justify-center bg-[#EFF6FF]">
            <Briefcase3Icon className="text-[#2563EB]" />
          </span>
          <span>
            <p className="text-[#64748B] font-bold uppercase">
              Active Opportunities
            </p>
            <p className="text-[#0F172A] text-2xl font-bold">
              {loading ? (
                <Skeleton className="h-7 w-10" />
              ) : (
                metrics.active_opportunities
              )}
            </p>
          </span>
        </div>
        <div className="bg-white border border-[#F1F5F9] drop-shadow-sm hover:drop-shadow-none transition-all duration-100 flex items-center gap-4 p-6 rounded-3xl">
          <span className="size-12 rounded-2xl flex items-center justify-center bg-[#FFF7ED]">
            <PendingLogsIcon className="text-[#EA580C]" />
          </span>
          <span>
            <p className="text-[#64748B] font-bold uppercase">Pending Logs</p>
            <p className="text-[#0F172A] text-2xl font-bold">
              {loading ? (
                <Skeleton className="h-7 w-10" />
              ) : (
                metrics.pending_logs
              )}
            </p>
          </span>
        </div>
        <div className="bg-white border border-[#F1F5F9] drop-shadow-sm hover:drop-shadow-none transition-all duration-100 flex items-center gap-4 p-6 rounded-3xl">
          <span className="size-12 rounded-2xl flex items-center justify-center bg-[#1386011A]">
            <CheckMark2Icon className="text-[#138601]" />
          </span>
          <span>
            <p className="text-[#64748B] font-bold uppercase">
              Placed Students
            </p>
            <p className="text-[#0F172A] text-2xl font-bold">
              {loading ? (
                <Skeleton className="h-7 w-10" />
              ) : (
                metrics.placed_students
              )}
            </p>
          </span>
        </div>
      </div>

      {/* grid */}
      <div className="flex flex-col xl:flex-row gap-6">
        {/* column 1 */}
        <div className="flex-1 w-full flex flex-col gap-6">
          {/* post new opportunity */}
          <PostNewOpportunity onSuccess={fetchBoardData} />
          {/* manage listing */}
          <ManageListings listings={listings} loading={loading} />
        </div>

        {/* column 2 */}
        <div className="flex-none w-full xl:max-w-102.5 flex flex-col md:flex-row xl:flex-col gap-6">
          {/* moderation */}
          <ModerationQueue queue={moderationQueue} loading={loading} />

          {/* quick actions */}
          <div className="w-full rounded-3xl drop-shadow-sm bg-white p-5 border border-[#F1F5F9] flex flex-col gap-4">
            <p className="flex items-center gap-2 text-[#0F172A] font-bold text-sm">
              Quick Actions
            </p>

            <div className="flex flex-col gap-4 text-[#475569] text-xs font-medium">
              <div className="flex items-center gap-2 py-2 px-3">
                <LogbookIcon className="size-3.5 text-[#16A34A]" />

                <Link
                  to="#"
                  className="hover:text-black transition-colors duration-150"
                >
                  Download Logbook Template
                </Link>
              </div>
              <div className="flex items-center gap-2 py-2 px-3">
                <EnvelopeIcon className="size-3.5 text-[#2563EB]" />

                <Link
                  to="#"
                  className="hover:text-black transition-colors duration-150"
                >
                  Email All Interns
                </Link>
              </div>
              <div className="flex items-center gap-2 py-2 px-3">
                <SettingsIcon className="size-3.5 text-[#9333EA]" />

                <Link
                  to="#"
                  className="hover:text-black transition-colors duration-150"
                >
                  Board Settings
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiwesBoardMgt;

