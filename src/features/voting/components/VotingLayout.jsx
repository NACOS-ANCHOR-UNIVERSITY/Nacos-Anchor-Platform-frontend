import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ChevronLeft, List, ClipboardList, ChevronDown } from "lucide-react";
import { toast } from "sonner";
import useUserStore from "@/store/useUserStore";
import { authService } from "@/services/authService";
import { ELECTION_END_DATE } from "../mockData";

function getTimeLeft(targetDate) {
  const diff = targetDate - new Date();
  if (diff <= 0) return { hours: "00", minutes: "00", seconds: "00" };
  const hours = String(Math.floor(diff / 1000 / 60 / 60)).padStart(2, "0");
  const minutes = String(Math.floor((diff / 1000 / 60) % 60)).padStart(2, "0");
  const seconds = String(Math.floor((diff / 1000) % 60)).padStart(2, "0");
  return { hours, minutes, seconds };
}

const NAV_LINKS = ["Home", "Live Stats", "My Ballot"];

const VotingLayout = ({
  progressSidebar,
  ballotSidebar,
  children,
  mobilePanel,
  onMobilePanelChange,
  activeNav,
  onNavChange,
}) => {
  const { user } = useUserStore();
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(ELECTION_END_DATE));
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft(getTimeLeft(ELECTION_END_DATE));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Close profile dropdown when clicking outside
  useEffect(() => {
    const handleClick = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  const getInitials = () => {
    if (!user?.first_name) return "ST";
    return `${user.first_name[0]}${user.last_name ? user.last_name[0] : ""}`.toUpperCase();
  };

  const handleLogout = () => {
    authService.logout();
    toast.success("Signed out successfully");
    navigate("/login");
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden bg-[#F8FAFC]">
      {/* Header */}
      <header className="shrink-0 bg-white border-b border-[#E2E8F0] px-4 lg:px-6 h-16 flex items-center justify-between z-20 gap-4">
        {/* Left: back + logo */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/student/dashboard"
            className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-800 transition-colors"
          >
            <ChevronLeft size={16} />
            <span className="hidden sm:inline text-sm">Back</span>
          </Link>
          <span className="text-[#E2E8F0] hidden sm:block">|</span>
          <div className="flex items-center gap-2">
            <img
              src="/src/assets/images/nacos-logo.svg"
              alt="NACOS"
              width={28}
              height={28}
            />
            <div className="hidden md:block">
              <p className="text-xs font-bold text-[#0F172A] leading-tight">
                NACOS Anchor University
              </p>
              <p className="text-[10px] text-[#64748B] uppercase tracking-wide">
                Digital Voting System
              </p>
            </div>
          </div>
        </div>

        {/* Center: nav links — visible on all screen sizes */}
        <nav className="flex items-center gap-0.5 sm:gap-1">
          {NAV_LINKS.map((label) => (
            <button
              key={label}
              type="button"
              onClick={() => onNavChange(label)}
              className={`px-2 sm:px-3 py-1.5 text-xs sm:text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
                activeNav === label
                  ? "text-[#138601] border-b-2 border-[#138601]"
                  : "text-slate-500 hover:text-slate-800 rounded-lg"
              }`}
            >
              {label}
            </button>
          ))}
        </nav>

        {/* Right: election status + user */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Compact election status (desktop) */}
          <div className="hidden lg:flex items-center gap-3 text-xs text-[#64748B]">
            <span className="flex items-center gap-1.5 font-bold text-[#16A34A]">
              <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse" />
              LIVE
            </span>
            <span className="w-px h-4 bg-[#E2E8F0]" />
            <span className="font-bold text-[#0F172A] tabular-nums">
              {timeLeft.hours}h : {timeLeft.minutes}m : {timeLeft.seconds}s
            </span>
          </div>

          <span className="hidden lg:block w-px h-6 bg-[#E2E8F0]" />

          {/* Profile */}
          <div className="relative" ref={profileRef}>
            <button
              type="button"
              onClick={() => setShowProfileMenu((v) => !v)}
              className="flex items-center gap-2 hover:bg-gray-50 p-1.5 rounded-full transition-all pr-2 cursor-pointer"
            >
              <div className="w-9 h-9 rounded-full bg-orange-100 flex items-center justify-center text-orange-700 font-bold text-sm shrink-0">
                {getInitials()}
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-semibold text-[#0F172A] leading-tight">
                  {user?.first_name} {user?.last_name}
                </p>
                <p className="text-[11px] text-[#64748B]">
                  {user?.level
                    ? `${user.level} • ${user?.department || user?.course || ""}`
                    : user?.matric_no || user?.matricNo || "Student"}
                </p>
              </div>
              <ChevronDown
                size={13}
                className="hidden md:block text-slate-400"
              />
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-xl border border-gray-100 py-2 z-50">
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
                  onClick={() => setShowProfileMenu(false)}
                  className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-green-600"
                >
                  View Profile
                </Link>
                <Link
                  to="/student/dashboard"
                  onClick={() => setShowProfileMenu(false)}
                  className="block px-4 py-2 text-sm text-gray-600 hover:bg-gray-50 hover:text-green-600"
                >
                  Dashboard
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

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left sidebar (desktop only) — 280px */}
        <div className="hidden lg:flex flex-col w-70 shrink-0 bg-white border-r border-[#E2E8F0] overflow-y-auto">
          {progressSidebar}
        </div>

        {/* Main content — center max-w-[1024px] */}
        <main className="flex-1 overflow-y-auto pb-16 lg:pb-0 flex flex-col">
          <div className="flex-1 max-w-5xl w-full mx-auto flex flex-col">
            {children}
          </div>
        </main>

        {/* Right sidebar (desktop only) — 320px */}
        <div className="hidden lg:flex flex-col w-[320px] shrink-0 bg-white border-l border-[#E2E8F0] overflow-y-auto">
          {ballotSidebar}
        </div>
      </div>

      {/* ── MOBILE ────────────────────────────────────────────────── */}

      {/* Backdrop */}
      {(mobilePanel === "progress" || mobilePanel === "ballot") && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => onMobilePanelChange("main")}
        />
      )}

      {/* Progress slide-up panel */}
      {mobilePanel === "progress" && (
        <div className="fixed inset-x-0 bottom-14 z-50 max-h-[80vh] bg-white rounded-t-2xl shadow-2xl overflow-y-auto lg:hidden">
          <div className="px-4 pt-3 pb-1 sticky top-0 bg-white border-b border-slate-100">
            <div className="w-10 h-1 rounded-full bg-slate-200 mx-auto mb-3" />
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Voting Progress
              </p>
              <button
                type="button"
                onClick={() => onMobilePanelChange("main")}
                className="text-xs text-slate-400 hover:text-slate-600"
              >
                Close ✕
              </button>
            </div>
          </div>
          {progressSidebar}
        </div>
      )}

      {/* Ballot slide-up panel */}
      {mobilePanel === "ballot" && (
        <div className="fixed inset-x-0 bottom-14 z-50 max-h-[80vh] bg-white rounded-t-2xl shadow-2xl overflow-y-auto lg:hidden">
          <div className="px-4 pt-3 pb-1 sticky top-0 bg-white border-b border-slate-100">
            <div className="w-10 h-1 rounded-full bg-slate-200 mx-auto mb-3" />
            <div className="flex items-center justify-between">
              <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Your Ballot
              </p>
              <button
                type="button"
                onClick={() => onMobilePanelChange("main")}
                className="text-xs text-slate-400 hover:text-slate-600"
              >
                Close ✕
              </button>
            </div>
          </div>
          {ballotSidebar}
        </div>
      )}

      {/* Bottom tab bar */}
      <nav className="fixed bottom-0 inset-x-0 h-14 bg-white border-t border-[#E2E8F0] flex lg:hidden z-30">
        <button
          type="button"
          onClick={() =>
            onMobilePanelChange(
              mobilePanel === "progress" ? "main" : "progress",
            )
          }
          className={`flex-1 flex flex-col items-center justify-center gap-0.5 text-[11px] font-medium transition-colors ${
            mobilePanel === "progress" ? "text-[#138601]" : "text-slate-400"
          }`}
        >
          <List size={18} />
          <span>Progress</span>
        </button>

        <button
          type="button"
          onClick={() => onMobilePanelChange("main")}
          className={`flex-1 flex flex-col items-center justify-center gap-0.5 text-[11px] font-medium transition-colors ${
            mobilePanel === "main" ? "text-[#138601]" : "text-slate-400"
          }`}
        >
          <img
            src="/src/assets/images/nacos-logo.svg"
            alt=""
            className="w-5 h-5"
          />
          <span>Candidates</span>
        </button>

        <button
          type="button"
          onClick={() =>
            onMobilePanelChange(mobilePanel === "ballot" ? "main" : "ballot")
          }
          className={`flex-1 flex flex-col items-center justify-center gap-0.5 text-[11px] font-medium transition-colors ${
            mobilePanel === "ballot" ? "text-[#138601]" : "text-slate-400"
          }`}
        >
          <ClipboardList size={18} />
          <span>Ballot</span>
        </button>
      </nav>
    </div>
  );
};

export default VotingLayout;

