import { Search, Filter, Calendar as CalendarIcon } from "lucide-react";
import adjust from "../assets/table/Adjust.png";
import calendar from "../assets/table/Calendar.png";

export default function TableToolbar({
  selectedCount = 0,
  searchTerm,
  setSearchTerm,
  statusFilter,
  setStatusFilter,
  dateFilter,
  setDateFilter,
}) {
  return (
    <div className="flex flex-col gap-3 border-b border-slate-200 bg-white px-5 py-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-1 items-center gap-3">
        {/* Search */}
        <div className="flex w-full max-w-md items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus-within:ring-2 focus-within:ring-green-500/20">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-transparent outline-none placeholder:text-slate-400"
            placeholder="Search transactions..."
          />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="appearance-none pl-9 pr-8 py-2 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-green-500/20 cursor-pointer"
          >
            <option value="All">All Status</option>
            <option value="Successful">Successful</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>
          <img
            src={adjust}
            alt=""
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 pointer-events-none"
          />
        </div>

        {/* Date Filter */}
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
            <img src={calendar} alt="" className="h-4 w-4" />
          </div>
          <input
            type="date"
            value={dateFilter}
            onChange={(e) => setDateFilter(e.target.value)}
            className="pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 bg-white text-sm font-medium text-slate-700 hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-green-500/20 cursor-pointer min-h-[38px]"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-xs text-slate-500">
          {selectedCount > 0 ? `${selectedCount} selected` : ""}
        </div>
        <button
          disabled={selectedCount === 0}
          className={
            "rounded-lg px-3 py-2 text-sm font-medium transition-colors " +
            (selectedCount === 0
              ? "bg-slate-100 text-slate-400 cursor-not-allowed"
              : "bg-[#138601] text-white hover:bg-[#0e6001] shadow-sm shadow-green-200")
          }
        >
          Bulk Approve
        </button>
      </div>
    </div>
  );
}
