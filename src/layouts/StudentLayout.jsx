import { NavLink, Outlet } from "react-router-dom";
import academicLibrary from "../features/student/portfolio/assets/sidebar/Academic-library.svg";
import dashboard from "../features/student/portfolio/assets/sidebar/Dashboard.svg";
import siwes from "../features/student/portfolio/assets/sidebar/SIWES.svg";
import payments from "../features/student/portfolio/assets/sidebar/Payments.svg";
import resources from "../features/student/portfolio/assets/sidebar/Resources.svg";
import profile from "../features/student/portfolio/assets/sidebar/Profile.svg";
import settings from "../features/student/portfolio/assets/sidebar/Settings.svg";
import logout from "../features/student/portfolio/assets/sidebar/Log-out.svg";
import overlay from "../features/student/portfolio/assets/sidebar/Overlay.png";

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
          <div className="h-10 w-10 rounded-full bg-[var(--color-brand-primary)]  place-items-center">
            <img src={overlay} alt="" className="h-4 w-4" />
          </div>
          <div>
            <div className="text-sm font-bold text-slate-900">NACOS</div>
            <div className="text-xs text-slate-500">Anchor University</div>
          </div>
        </div>

        /* Nav */
          <nav className="mt-7 space-y-1">
            <NavItem to="/student/dashboard" label="Dashboard" Icon={() => <img src={dashboard} alt="Dashboard" className="h-4 w-4" />} />
            <NavItem to="/student/library" label="Academic Library" Icon={() => <img src={academicLibrary} alt="Academic Library" className="h-4 w-4" />} />
            <NavItem to="/student/siwes" label="SIWES" Icon={() => <img src={siwes} alt="SIWES" className="h-4 w-4" />} />
            <NavItem to="/student/payments" label="Payments" Icon={() => <img src={payments} alt="Payments" className="h-4 w-4" />} />
            <NavItem to="/student/resources" label="Resources" Icon={() => <img src={resources} alt="Resources" className="h-4 w-4" />} />

            <div className="pt-3">
              <NavItem to="/student/portfolio" label="Profile" Icon={() => <img src={profile} alt="Profile" className="h-4 w-4" />} />
              <NavItem to="/student/settings" label="Settings" Icon={() => <img src={settings} alt="Settings" className="h-4 w-4" />} />
            </div>
          </nav>

          <div className="flex-1" />

          {/* Logout */}
        <button
          type="button"
          className="mt-6 flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50"
        >
          <img src={logout} alt="Logout" className="h-4 w-4" />
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
