import {ChevronDown, Search } from "lucide-react";
import redDot from "../assets/topbar/Red-dot.png";
import verticalDivider from "../assets/topbar/Vertical-Divider.png";
import bell from "../assets/topbar/Bell.svg";
import adminUser from "../assets/topbar/Admin-user.png";
import paymentOverview from "../assets/topbar/Payment-overview.svg";


export default function AdminTopbar() {
  return (
    <div className="flex items-center justify-between border-b border-slate-200 bg-white px-8 py-4">
      <div className="flex items-center gap-3 text-sm text-slate-600">
        <img src={paymentOverview} alt="" className="h-4 w-4" />
        <span className="text-slate-400">/</span>
        <span className="font-medium text-slate-700">Payment overview</span>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden md:flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 w-[360px]">
          <Search className="h-4 w-4 text-slate-400" />
          <input className="w-full bg-transparent outline-none" placeholder="Search students, logs..." />
        </div>

        {/* Bell button + red dot */}
        <button className="relative grid h-9 w-9 place-items-center rounded-full border border-slate-200 bg-white hover:bg-slate-50">
          <img src={bell} alt="" className="h-4 w-4" />
          <img src={redDot} alt="" className="absolute top-2 right-2 h-2 w-2" />
        </button>

        {/* Divider */}
        <img src={verticalDivider} alt="" className="hidden md:block h-6" />

        {/* Admin user dropdown */}
        <button className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-2 hover:bg-slate-50">
          <img src={adminUser} alt="" className="h-7 w-7 rounded-full" />
          <span className="text-sm font-semibold text-slate-700">Admin User</span>
          <ChevronDown className="h-4 w-4 text-slate-500" />
        </button>
      </div>
    </div>
  );
}
