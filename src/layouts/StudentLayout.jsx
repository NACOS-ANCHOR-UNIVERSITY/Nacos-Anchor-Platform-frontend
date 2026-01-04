import React from "react";
import {Outlet, Link, useLocation} from "react-router-dom";
import {
  LayoutDashboard,
  BookOpen,
  GraduationCap,
  Calendar,
  CreditCard,
  Bell,
  Settings,
  LogOut,
} from "lucide-react";

const StudentLayout = () => {
  const location = useLocation();

  // 1. 👇 INSERT THIS HELPER FUNCTION HERE (Right after useLocation)
  const getBreadcrumbText = () => {
    const path = location.pathname;

    // Custom text for Library/Resources
    if (path.includes("/student/library"))
      return (
        <span className="flex items-center gap-2">
          <span className="font-medium text-gray-500">Library</span>
          <span className="text-gray-300">/</span>
          <span className="font-medium text-gray-900">Resources</span>
        </span>
      );

    // Standard text for other pages
    if (path.includes("/student/dashboard"))
      return <span className="font-medium text-gray-900">Dashboard</span>;
    if (path.includes("/student/courses"))
      return <span className="font-medium text-gray-900">My Courses</span>;
    if (path.includes("/student/timetable"))
      return <span className="font-medium text-gray-900">Timetable</span>;
    if (path.includes("/student/payments"))
      return <span className="font-medium text-gray-900">Payments</span>;

    return <span className="font-medium text-gray-900">Portal</span>;
  };
  // 👆 END OF NEW HELPER FUNCTION

  const navLinks = [
    {name: "Dashboard", path: "/student/dashboard", icon: LayoutDashboard},
    {name: "Library", path: "/student/library", icon: BookOpen},
    {name: "My Courses", path: "/student/courses", icon: GraduationCap},
    {name: "Timetable", path: "/student/timetable", icon: Calendar},
    {name: "Payments", path: "/student/payments", icon: CreditCard},
  ];

  return (
    <div className="flex h-screen bg-white font-sans overflow-hidden">
      {/* ... (Your Sidebar code remains exactly the same) ... */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-full z-20 hidden md:flex">
        <div className="h-20 flex items-center px-6 border-b border-gray-50">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded bg-green-100 text-green-700 flex items-center justify-center font-bold">
              N
            </div>
            <div>
              <h1 className="font-bold text-gray-900 leading-tight">NACOS</h1>
              <p className="text-[10px] text-gray-500 uppercase tracking-wider">
                Anchor University
              </p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navLinks.map((item) => {
            const isActive = location.pathname.includes(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                  isActive
                    ? "bg-green-50 text-green-700"
                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <item.icon
                  className={`w-5 h-5 ${
                    isActive ? "text-green-600" : "text-gray-400"
                  }`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
        <div className="p-4 border-t border-gray-100">
          <div className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
            <img
              src="https://api.dicebear.com/7.x/avataaars/svg?seed=Student"
              alt="User"
              className="w-10 h-10 rounded-full bg-gray-100"
            />
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-bold text-gray-900 truncate">
                Student User
              </h4>
              <p className="text-xs text-gray-500 truncate">
                oluwatobi@student.aul.edu.ng
              </p>
            </div>
            <LogOut className="w-4 h-4 text-gray-400 hover:text-red-500" />
          </div>
        </div>
      </aside>

      <main className="flex-1 md:ml-64 flex flex-col h-screen">
        {/* --- GLOBAL TOPBAR --- */}
        <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-8 shrink-0">
          {/* 2. 👇 REPLACE THE OLD BREADCRUMB DIV WITH THIS NEW ONE */}
          <div className="flex items-center gap-2 text-sm">
            <BookOpen className="w-4 h-4 text-gray-400" />
            <span className="text-gray-300">/</span>
            {/* CALL THE FUNCTION HERE */}
            {getBreadcrumbText()}
          </div>
          {/* 👆 END OF CHANGE */}

          <div className="flex items-center gap-4">
            <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto bg-gray-50 p-6 md:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default StudentLayout;
