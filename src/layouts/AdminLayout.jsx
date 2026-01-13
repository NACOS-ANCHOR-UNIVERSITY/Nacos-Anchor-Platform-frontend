import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  FileText,
  CreditCard,
  Calendar,
  Briefcase,
  Vote,
  LogOut,
  Search,
  Bell,
  ChevronDown,
} from "lucide-react";
import profileImg from "../assets/images/profile.png";

const AdminLayout = () => {
  const location = useLocation();

  // SIDEBAR LINKS
  const mainLinks = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "User Management", path: "/admin/users", icon: Users },
    { name: "Content Moderation", path: "/admin/moderation", icon: FileText },
    { name: "Payments", path: "/admin/payments", icon: CreditCard },
  ];

  const moduleLinks = [
    { name: "Events & Polls", path: "/admin/events", icon: Calendar },
    { name: "SIWES Board", path: "/admin/siwes", icon: Briefcase },
    { name: "Voting System", path: "/admin/voting", icon: Vote },
  ];

  const renderLink = (item) => {
    const isActive = location.pathname.startsWith(item.path);
    return (
      <Link
        key={item.name}
        to={item.path}
        className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-colors mb-1 ${
          isActive
            ? "bg-green-600 text-white shadow-sm"
            : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
        }`}
      >
        <item.icon className="w-5 h-5" />
        {item.name}
      </Link>
    );
  };

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      {/* 1. FIXED SIDEBAR */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-full z-20">
        <div className="h-20 flex items-center px-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-green-100 text-green-700 flex items-center justify-center font-bold">
              N
            </div>
            <div>
              <h1 className="font-bold text-gray-900 leading-tight">NACOS</h1>
              <p className="text-xs text-gray-500">Admin Console</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 overflow-y-auto custom-scrollbar">
          <div className="space-y-1">{mainLinks.map(renderLink)}</div>
          <div className="mt-6 mb-2 px-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Modules
            </p>
          </div>
          <div className="space-y-1">{moduleLinks.map(renderLink)}</div>
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button className="flex items-center gap-3 text-red-600 w-full px-4 py-3 text-sm font-medium hover:bg-red-50 rounded-lg transition-colors">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/*  MAIN(Includes Topbar) */}
      <main className="flex-1 ml-64 flex flex-col h-screen overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10 shrink-0">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <LayoutDashboard className="w-4 h-4" />
            <span>/</span>
            <span className="font-medium text-gray-900">
              Dashboard Overview
            </span>
          </div>

          {/* Search & Profile */}
          <div className="flex items-center gap-6">
            {/* Search Bar */}
            <div className="relative hidden md:block">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search students, logs..."
                className="pl-9 pr-4 py-2 bg-gray-100 rounded-full text-sm focus:ring-2 focus:ring-green-500 outline-none w-64 transition-all"
              />
            </div>

            {/* Icons */}
            <button className="relative text-gray-500 hover:text-green-700 transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>

            {/* Profile Dropdown */}
            <div className="flex items-center gap-3 border-l pl-6 border-gray-200">
              <div className="w-8 h-8 rounded-full bg-green-100 border border-green-200 flex items-center justify-center">
                <img
                  src={profileImg}
                  alt="Admin"
                  className="w-full h-full rounded-full"
                />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-gray-700 leading-none">
                  Admin User
                </p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400 cursor-pointer" />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;

