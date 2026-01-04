import { NavLink, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  LibraryBig,
  BriefcaseBusiness,
  CreditCard,
  Package,
  User,
  Settings,
  LogOut,
} from "lucide-react";

function NavItem({ to, label, Icon }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [
          "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition",
          isActive
            ? "bg-[var(--color-brand-primary)] text-white"
            : "text-slate-700 hover:bg-slate-100",
        ].join(" ")
      }
    >
      <Icon className="h-4 w-4" />
      <span>{label}</span>
    </NavLink>
  );
}

export default function StudentLayout() {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-72 border-r bg-white px-5 py-6 flex flex-col">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-[var(--color-brand-primary)] text-white grid place-items-center font-bold">
            N
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900">NACOS</div>
            <div className="text-xs text-slate-500">Anchor University</div>
          </div>
        </div>

        {/* Nav */}
        <nav className="mt-7 space-y-1">
          <NavItem to="/student/dashboard" label="Dashboard" Icon={LayoutDashboard} />
          <NavItem to="/student/library" label="Academic Library" Icon={LibraryBig} />
          <NavItem to="/student/siwes" label="SIWES" Icon={BriefcaseBusiness} />
          <NavItem to="/student/payments" label="Payments" Icon={CreditCard} />
          <NavItem to="/student/resources" label="Resources" Icon={Package} />

          <div className="pt-3">
            <NavItem to="/student/portfolio" label="Profile" Icon={User} />
            <NavItem to="/student/settings" label="Settings" Icon={Settings} />
          </div>
        </nav>

        <div className="flex-1" />

        {/* Logout */}
        <button
          type="button"
          className="mt-6 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </aside>

      {/* Content area */}
      <main className="flex-1 px-10 py-8">
        <Outlet />
      </main>
    </div>
  );
}
