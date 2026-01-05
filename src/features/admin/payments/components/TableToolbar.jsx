import { Search } from "lucide-react";
import adjust from "../assets/table/Adjust.png";
import calendar from "../assets/table/Calendar.png";


export default function TableToolbar({ selectedCount = 0 }) {
  return (
    <div className="flex flex-col gap-3 border-b border-slate-200 bg-white px-5 py-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-1 items-center gap-3">
        <div className="flex w-full max-w-md items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            className="w-full bg-transparent outline-none"
            placeholder=""
          />
        </div>

        <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
        <img src={adjust} alt="Adjust" className="h-4 w-4" />
          Filter
        </button>

        <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
          <img src={calendar} alt="Calendar" className="h-4 w-4" />
          Date
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="text-xs text-slate-500">
          {selectedCount > 0 ? `${selectedCount} selected` : ""}
        </div>
        <button
          disabled={selectedCount === 0}
          className={
            "rounded-lg px-3 py-2 text-sm font-medium " +
            (selectedCount === 0
              ? "bg-slate-100 text-slate-400"
              : "bg-[var(--color-brand-primary)] text-white hover:bg-emerald-800")
          }
        >
          Bulk Approve
        </button>
      </div>
    </div>
  );
}
