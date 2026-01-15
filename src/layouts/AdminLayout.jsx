// src/layouts/AdminLayout.jsx
import React, { useState } from "react";
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
  Bell,
  ChevronDown,
  Menu,
} from "lucide-react";
import profileImg from "../assets/images/profile.png";
import Logo from "../assets/images/nacos-logo.svg";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();

  // Sidebar Navigation Data
  const mainLinks = [
    { name: "Dashboard", path: "/admin/dashboard", icon: LayoutDashboard },
    { name: "User Management", path: "/admin/users", icon: Users },
    { name: "Content Moderation", path: "/admin/moderation", icon: FileText }, // ✅ Your route is already here!
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
        onClick={() => setIsSidebarOpen(false)}
        className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl transition-all mb-1 ${
          isActive
            ? "bg-[#138601] text-white shadow-sm"
            : "text-[#475569] hover:bg-gray-50 hover:text-gray-900"
        }`}
      >
        <item.icon
          className={`w-5 h-5 ${isActive ? "text-white" : "text-gray-500"}`}
        />
        {item.name}
      </Link>
    );
  };

  return (
    <div className="flex h-screen bg-[#F8FAFC]">
      {/* SIDEBAR */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-30 w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <img src={Logo} alt="NACOS Anchor" className="h-8" />
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto">
          <div className="space-y-1">{mainLinks.map(renderLink)}</div>

          <div className="mt-6 mb-2 px-4 border-t border-gray-100 pt-4">
            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">
              Modules
            </p>
          </div>
          <div className="space-y-1">{moduleLinks.map(renderLink)}</div>
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-gray-100">
          <button className="flex items-center gap-3 text-red-600 w-full px-4 py-3 text-sm font-medium hover:bg-red-50 rounded-lg transition-colors">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header className="h-16 bg-white border-b border-[#E2E8F0] flex items-center justify-between px-4 md:px-8 sticky top-0 z-10">
          <div className="flex items-center gap-4">
            <button
              className="lg:hidden p-2 hover:bg-gray-100 rounded-md text-gray-600"
              onClick={() => setIsSidebarOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>

            <div className="flex items-center text-sm text-[#94A3B8]">
              <span>Admin Console</span>
              <span className="mx-2">/</span>
              <span className="text-[#1E293B] font-medium">
                {[...mainLinks, ...moduleLinks].find((link) =>
                  location.pathname.startsWith(link.path)
                )?.name || "Dashboard"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6">
            <div className="hidden md:block relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-4 pr-4 py-2 bg-[#F1F5F9] rounded-full text-sm focus:ring-2 focus:ring-green-500 outline-none w-64"
              />
            </div>

            <button className="relative w-10 h-10 flex items-center justify-center rounded-full bg-[#E8F3E6] text-green-700 hover:bg-green-100">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-green-100 border border-green-200 overflow-hidden">
                <img src={profileImg} alt="Admin" className="w-full h-full object-cover" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-[#1E293B]">Admin User</p>
                <p className="text-xs text-gray-500">Super Admin</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="w-full max-w-7xl mx-auto">
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;