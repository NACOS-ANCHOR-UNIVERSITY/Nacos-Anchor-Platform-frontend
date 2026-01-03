import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  ShieldCheck,
  CreditCard,
  CalendarDays,
  BriefcaseBusiness,
  Vote,
  LogOut,
} from "lucide-react";

function Item({ to, icon: Icon, label }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition",
          isActive ? "bg-emerald-700 text-white" : "text-slate-700 hover:bg-slate-100",
        ].join(" ")
      }
    >
      <Icon className="h-4 w-4" />
      {label}
    </NavLink>
  );
}

export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-72 border-r bg-white px-5 py-6 flex flex-col">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-emerald-700 text-white grid place-items-center font-bold">
            N
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900">NACOS</div>
            <div className="text-xs text-slate-500">Admin Console</div>
          </div>
        </div>

        <nav className="mt-7 space-y-1">
          <Item to="/admin/dashboard" icon={LayoutDashboard} label="Dashboard" />
          <Item to="/admin/users" icon={Users} label="User Management" />
          <Item to="/admin/moderation" icon={ShieldCheck} label="Content Moderation" />
          <Item to="/admin/payments" icon={CreditCard} label="Payments" />

          <div className="pt-4">
            <div className="px-1 pb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Modules
            </div>
            <Item to="/admin/events" icon={CalendarDays} label="Events & Polls" />
            <Item to="/admin/siwes" icon={BriefcaseBusiness} label="SIWES Board" />
            <Item to="/admin/voting" icon={Vote} label="Voting System" />
          </div>
        </nav>

        <div className="flex-1" />

        <button className="mt-6 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50">
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </aside>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
