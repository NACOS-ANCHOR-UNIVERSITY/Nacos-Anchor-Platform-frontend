import React, { useState, useEffect } from "react";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import { Menu, X, ChevronDown } from "lucide-react";
import {
  DashboardIcon,
  BriefcaseIcon,
  CashIcon,
  CloudIcon,
  IDCardIcon,
  SettingsIcon,
  LogoutIcon,
  HomeIcon,
  SearchIcon,
  NotificationIcon,
  BookIcon,
} from "../assets/icons";
import { toast } from "sonner";
import { authService } from "@/services/authService";
import useUserStore from "@/store/useUserStore";
import useNotificationStore from "@/store/useNotificationStore";
import { markNotificationAsRead } from "@/services/notificationsService";

const StudentDashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const {
    notifications,
    loading,
    fetchNotifications,
    getUnreadCount,
    markAsRead,
  } = useNotificationStore();
  const unreadCount = getUnreadCount();

  // Get user data from Zustand store
  const { user } = useUserStore();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchNotifications();

    // Optional: Poll for new notifications every 5 minutes
    const interval = setInterval(fetchNotifications, 5 * 60 * 1000);
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  // get initials (e.g., "Chukwuebuka Ezirim" -> "CE")
  const getInitials = () => {
    if (!user?.first_name) return "ST";
    return `${user.first_name[0]}${user.last_name ? user.last_name[0] : ""}`.toUpperCase();
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  const handleLogout = () => {
    authService.logout();
    toast.success("Signed out successfully");
    navigate("/login");
  };

  const handleNotificationClick = async (notif) => {
    if (!notif.is_read) {
      // 1. Update UI immediately (Optimistic UI)
      markAsRead(notif.id);
      // 2. Update Backend
      await markNotificationAsRead(notif.id);
    }
    // 3. Navigate if the notification has a link
    if (notif.link) navigate(notif.link);
  };

  const navItems = [
    { name: "Dashboard", icon: DashboardIcon, href: "/student/dashboard" },
    { name: "Academic Library", icon: BookIcon, href: "/student/library" },
    { name: "SIWES", icon: BriefcaseIcon, href: "/student/siwes" },
    { name: "Payments", icon: CashIcon, href: "/student/payments" },
    { name: "News", icon: CloudIcon, href: "/student/news" },
    { name: "Profile", icon: IDCardIcon, href: "/student/profile" },
    { name: "Settings", icon: SettingsIcon, href: "/student/settings" },
  ];

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-slate-800">
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-30 w-full sm:max-w-[288px] transform bg-white border-r border-[#E2E8F0] transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } flex flex-col shadow-lg lg:shadow-none`}
      >
        <div className="flex items-center justify-between p-6 h-22">
          <Link to="/" className="flex items-center gap-3">
            <img
              src="/src/assets/images/nacos-logo.svg"
              alt="NACOS Logo"
              width={40}
              height={40}
            />
            <div>
              <h1 className="font-bold text-lg text-[#0F172A]">NACOS</h1>
              <p className="text-xs text-[#64748B] font-medium">
                Anchor University
              </p>
            </div>
          </Link>
          <button onClick={toggleSidebar} className="lg:hidden text-gray-500">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 flex flex-col gap-2 overflow-y-auto">
          {navItems.map((item) => {
            const isActive =
              location.pathname === item.href ||
              (location.pathname.includes(item.href) &&
                item.href !== "/student/dashboard");

            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center gap-3 px-4 py-2.5 h-12 rounded-xl transition-all font-medium text-sm duration-200 ${
                  isActive
                    ? "bg-[#138601] text-white drop-shadow-md"
                    : "text-[#475569] hover:bg-green-50 hover:text-green-700"
                }`}
              >
                <item.icon className="size-4.5" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <button
            type="button"
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-sm text-[#EF4444] hover:bg-red-50 rounded-xl transition-colors font-medium text-left cursor-pointer"
          >
            <LogoutIcon className="size-4.5" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        <header className="h-20 bg-white border-b border-gray-100 flex items-center justify-between px-6 lg:px-10 z-10 relative">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={toggleSidebar}
              className="lg:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
            >
              <Menu size={24} />
            </button>
            <div className="hidden md:flex items-center text-sm text-[#94A3B8]">
              <Link
                to="/student/dashboard"
                className="hover:text-[#1E293B] transition-colors"
              >
                <HomeIcon className="size-3.5" />
              </Link>
              <span className="mx-2">/</span>
              <span className="text-[#1E293B] font-medium capitalize">
                {location.pathname.split("/").pop() || "Dashboard"}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="hidden md:flex items-center bg-[#F1F5F9] px-4 py-2.5 rounded-full w-64 border border-transparent focus-within:border-green-500 transition-all">
              <SearchIcon className="size-4.5 text-[#94A3B8]" />
              <input
                type="text"
                placeholder="Search resources..."
                className="bg-transparent border-none outline-none text-sm ml-2 w-full text-gray-700"
              />
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowNotifications(!showNotifications)}
                className={`relative size-9.5 flex items-center justify-center rounded-full transition-colors cursor-pointer ${
                  showNotifications
                    ? "bg-green-50 text-[#138601]"
                    : "text-gray-500 hover:bg-gray-100"
                }`}
              >
                <NotificationIcon className="size-4.5" />
                {unreadCount > 0 && (
                  <span className="absolute top-2 right-2 size-2 bg-[#EF4444] rounded-full border-2 border-white"></span>
                )}
              </button>

              {showNotifications && (
                <div className="absolute right-0 mt-3 w-80 bg-white rounded-xl shadow-xl border border-gray-100 p-4 z-50">
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="font-bold text-sm">Notifications</h4>
                    <button
                      type="button"
                      onClick={handleNotificationClick}
                      className="text-xs text-[#138601] hover:underline"
                    >
                      Mark all read
                    </button>
                  </div>

                  <div className="space-y-3 max-h-75 overflow-y-auto">
                    {loading ? (
                      <p className="text-xs text-center py-4 text-gray-400">
                        Loading...
                      </p>
                    ) : notifications.length > 0 ? (
                      notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className={`p-3 rounded-lg text-sm transition-colors ${
                            notif.is_read
                              ? "bg-white"
                              : "bg-green-50/50 border-l-2 border-green-500"
                          }`}
                        >
                          <p className="font-semibold text-gray-800">
                            {notif.title}
                          </p>
                          <p className="text-xs mt-1 text-gray-600">
                            {notif.message}
                          </p>
                          <span className="text-[10px] text-gray-400 mt-2 block">
                            {new Date(notif.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-center py-4 text-gray-400">
                        No new notifications
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>

            <span className="border-r-2 border-[#E2E8F0] h-8" />

            {/* Profile Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-3 md:w-52 hover:bg-gray-50 p-1.5 rounded-full transition-all pr-3 cursor-pointer"
              >
                {/* Dynamic Avatar */}
                <div className="w-9 h-9 bg-orange-100 rounded-full flex items-center justify-center text-orange-700 font-bold text-sm">
                  {getInitials()}
                </div>
                {/* Dynamic Name */}
                <span className="hidden md:block text-sm font-medium text-gray-700 truncate">
                  {user?.first_name || "User"}
                </span>
                <ChevronDown
                  size={14}
                  className="hidden md:block text-gray-400"
                />
              </button>

              {showProfileMenu && (
                <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100 mb-1">
                    <p className="text-sm font-bold text-gray-800">
                      {user?.first_name} {user?.last_name}
                    </p>
                    <p className="text-xs text-gray-500 capitalize">
                      {user?.role || "Student"}
                    </p>
                  </div>
                  <Link
                    to="/student/profile"
                    className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-green-600"
                  >
                    View Profile
                  </Link>
                  <button
                    type="button"
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-sm text-red-500 hover:bg-red-50"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-[#F6F7F8] p-4 lg:p-8 flex flex-col">
          <div className="max-w-7xl mx-auto w-full flex-1">
            <Outlet />
          </div>
          <footer className="max-w-7xl mx-auto w-full mt-12 pt-6 border-t border-[#E2E8F0] text-xs text-[#94A3B8]">
            <p>© {new Date().getFullYear()} NACOS Anchor University.</p>
          </footer>
        </main>
      </div>
    </div>
  );
};

export default StudentDashboardLayout;

