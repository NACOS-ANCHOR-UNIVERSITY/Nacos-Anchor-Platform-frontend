import { NavLink, Outlet } from "react-router-dom";
import adminConsole from "../features/admin/payments/assets/sidebar/admin-console.svg";
import dashboard from "../features/admin/payments/assets/sidebar/Dashboard.svg";
import userManagement from "../features/admin/payments/assets/sidebar/User-management.svg";
import contentModeration from "../features/admin/payments/assets/sidebar/Content-moderation.svg";
import payments from "../features/admin/payments/assets/sidebar/Payments.svg";
import eventsAndPolls from "../features/admin/payments/assets/sidebar/Event-and-polls.svg";
import siwesBoard from "../features/admin/payments/assets/sidebar/Siwes-board.svg";
import votingSystem from "../features/admin/payments/assets/sidebar/Voting-system.svg";
import logout from "../features/admin/payments/assets/sidebar/Logout.svg";


function Item({ to, iconSrc, label }) {
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
      <img src={iconSrc} alt="" className="h-4 w-4" />
      {label}
    </NavLink>
  );
}


export default function AdminLayout() {
  return (
    <div className="min-h-screen bg-slate-50 flex">
      <aside className="w-72 border-r bg-white px-5 py-6 flex flex-col">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-full bg-slate-50 grid place-items-center">
            <img src={adminConsole} alt="" className="h-4 w-4" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900">NACOS</div>
            <div className="text-xs text-slate-500">Admin Console</div>
          </div>
        </div>

        <nav className="mt-7 space-y-1">
          <Item to="/admin/dashboard" iconSrc={dashboard} label="Dashboard" />
          <Item to="/admin/users" iconSrc={userManagement} label="User Management" />
          <Item to="/admin/moderation" iconSrc={contentModeration} label="Content Moderation" />
          <Item to="/admin/payments" iconSrc={payments} label="Payments" />

          <div className="pt-4">
            <div className="px-1 pb-2 text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Modules
            </div>
            <Item to="/admin/events" iconSrc={eventsAndPolls} label="Events & Polls" />
            <Item to="/admin/siwes" iconSrc={siwesBoard} label="SIWES Board" />
            <Item to="/admin/voting" iconSrc={votingSystem} label="Voting System" />
          </div>
        </nav>

        <div className="flex-1" />

        <button className="mt-6 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50">
          <img src={logout} alt="" className="h-4 w-4" />
          Logout
        </button>

      </aside>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
