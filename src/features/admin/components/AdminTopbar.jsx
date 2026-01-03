import { Bell, ChevronDown, Search } from "lucide-react";

export default function AdminTopbar() {
  return (
    <div className="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-4">
      <div className="flex items-center gap-3 text-sm text-slate-600">
        <span className="text-slate-400">/</span>
        <span className="font-medium text-slate-700">Payment overview</span>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 w-[360px]">
          <Search className="h-4 w-4 text-slate-400" />
          <input
            className="w-full bg-transparent outline-none"
            placeholder="Search students, logs..."
          />
        </div>

        <button className="grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white hover:bg-slate-50">
          <Bell className="h-4 w-4 text-slate-600" />
        </button>

        <button className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 hover:bg-slate-50">
          <div className="h-7 w-7 rounded-full bg-slate-200" />
          <span className="text-sm font-semibold text-slate-700">Admin User</span>
          <ChevronDown className="h-4 w-4 text-slate-500" />
        </button>
      </div>
    </div>
  );
}
