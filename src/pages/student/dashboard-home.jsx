import React, { useState, useEffect } from "react"; // Added imports
// import useUserStore from "../../store/useUserStore"; // 🛑 Commented out to prevent conflicts

import {
  Plus,
} from "lucide-react";
import {
  ActiveIcon,
  AlertIcon,
  BookIcon,
  Briefcase2Icon,
  CheckMarkIcon,
  CloudIcon,
  HatIcon,
  MegaphoneIcon,
  ModuleIcon,
  NotificationIcon,
  SupportIcon,
  WalletIcon,
} from "../../assets/icons";

const DashboardHome = () => {
  // 1. GET USER DIRECTLY FROM STORAGE (Matches your Login Logic)
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : {
      first_name: "Student",
      last_name: "",
      department: "Computer Science",
      level: "100",
      matric_number: "AUL/SCI/24/000"
    };
  });

  return (
    <div className="flex flex-col gap-8 pb-10">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            {/* 👇 FIXED: Uses first_name instead of name */}
            Welcome back, {user?.first_name || "Student"} 👋
          </h2>
          <p className="text-[#64748B] mt-1 text-sm md:text-base">
            {user?.department || "Computer Science"} • {user?.level || "100"} Level • 2024/2025 Session
          </p>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-[#E2E8F0] text-[#334155] text-sm rounded-xl font-medium drop-shadow-sm">
            <ActiveIcon className="animate-pulse text-[#22C55E]" />
            <span>Online</span>
          </div>
          <button
            type="button"
            className="bg-[#138601] hover:bg-[#138601]/70 text-white px-4 py-2 rounded-xl text-sm font-medium flex items-center gap-2 drop-shadow-sm drop-shadow-[#138601] transition-all cursor-pointer"
          >
            <Plus size={16} /> Quick Action
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-6 items-start">
        {/* ID Card */}
        <div className="w-full sm:max-w-96.25">
          <div className="relative overflow-hidden bg-linear-to-br from-[#138601] to-[#0B5501] rounded-3xl p-6 text-white shadow-xl h-full flex flex-col justify-between gap-3 min-h-55">
            {/* Decorative Circles */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white opacity-3 rounded-full" />
            <div className="absolute bottom-10 left-10 w-20 h-20 bg-white opacity-3 rounded-full" />

            <div className="flex justify-between items-start relative z-10">
              <div className="flex items-center gap-2 opacity-90">
                <div className="bg-white/20 rounded-md size-8 flex items-center justify-center">
                  <HatIcon size={16} />
                </div>
                <div>
                  <p className="text-[10px] font-bold tracking-wider uppercase">
                    Anchor University
                  </p>
                  <p className="text-[8px] opacity-80 uppercase">Student ID</p>
                </div>
              </div>

              {/* QR Code Placeholder */}
              <div className="bg-white p-1 rounded-md">
                <div className="w-8 h-8 bg-gray-900" />
              </div>
            </div>

            <div className="flex items-center gap-4 sm:gap-2.5 md:gap-4 z-10">
              <div className="size-24! rounded-2xl bg-[#5d8b83] drop-shadow-sm drop-shadow-[#0000001A] border-3 border-white/30 flex items-center justify-center text-white text-2xl font-bold uppercase">
                {user?.first_name?.[0]}{user?.last_name?.[0]}
              </div>

              <div>
                <h3 className="text-xl font-bold">
                  {/* 👇 FIXED: Shows First + Last Name */}
                  {user?.first_name} {user?.last_name}
                </h3>
                <p className="text-xs text-white/70 mt-1 uppercase">
                  {/* 👇 FIXED: Shows Real Matric Number */}
                  {user?.matric_number || "AUL/SCI/24/..."}
                </p>
                <div className="flex gap-2 pt-2">
                  <span className="bg-white/20 text-white border border-white/10 text-[10px] font-bold px-2 py-1 h-5.25 flex items-center justify-center rounded-lg">
                    {user?.level || "100"} LVL
                  </span>
                  <span className="bg-[#22C55ECC] text-white border border-[#4ADE8033] text-[10px] font-bold px-2 py-1 h-5.25 flex items-center justify-center rounded-lg">
                    ACTIVE
                  </span>
                </div>
              </div>
            </div>

            <div className="flex justify-between items-end pt-2.5 border-t border-white/20 text-[10px] text-green-200 relative z-10">
              <div>
                <p className="opacity-70 uppercase text-[9px]">Department</p>
                <p className="font-medium text-white text-xs">
                  {user?.department || "Computer Science"}
                </p>
              </div>
              <div className="text-right">
                <p className="opacity-70 uppercase text-[9px]">Expires</p>
                <p className="font-medium text-white text-xs">Dec 2027</p>
              </div>
            </div>
          </div>
        </div>
        {/* Profile Completion */}
        <div className="w-full bg-white rounded-2xl p-6 border border-[#F1F5F9] drop-shadow-sm flex justify-between items-center gap-2">
          <div className="flex-1">
            <h3 className="font-bold text-[#0F172A] text-sm">
              Complete your profile
            </h3>
            <p className="text-xs text-[#64748B] mt-1">
              Add your bio and skills to reach 100%
            </p>
            <div className="overflow-hidden mt-3 h-2 text-xs flex rounded-full bg-[#F1F5F9]">
              <div
                style={{ width: "75%" }}
                className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#138601] rounded-full transition-all duration-500 ease-out"
              />
            </div>
          </div>

          {/* progress circle */}
          <div className="relative w-16 h-16 shrink-0">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
              <circle
                cx="48"
                cy="48"
                r="40"
                stroke="#F1F5F9"
                strokeWidth="8"
                fill="none"
              />
              <circle
                cx="48"
                cy="48"
                r="40"
                // stroke="#138601"
                strokeWidth="8"
                fill="none"
                strokeDasharray="251.2"
                strokeDashoffset="62.8"
                strokeLinecap="round"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-bold text-[#138601]">75%</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <h3 className="font-bold text-lg text-[#0F172A] flex items-center gap-2">
          <ModuleIcon className="text-[#138601] size-6" />
          Modules
        </h3>

        {/* Modules */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-2xl border border-[#F1F5F9] drop-shadow-sm hover:drop-shadow-md transition-shadow relative">
            <span className="absolute top-4 right-4 bg-[#FEE2E2] text-[#DC2626] text-[10px] font-bold px-2 py-1 rounded-full uppercase">
              Pending
            </span>
            <div className="size-12 bg-[#FEF2F2] rounded-2xl flex items-center justify-center text-[#EF4444] mb-4">
              <WalletIcon className="size-6" />
            </div>
            <h4 className="font-bold text-[#0F172A] text-base">
              Departmental Dues
            </h4>
            <p className="text-sm text-[#64748B] mt-1">2023/24 Session</p>
            <div className="mt-6 flex items-center justify-between">
              <span className="font-bold text-lg text-[#0F172A]">₦5,000</span>
              <button
                type="button"
                className="bg-[#0F172A] hover:bg-[#0F172A]/80 text-white text-sm font-medium px-3 py-1.5 rounded-xl transition-colors cursor-pointer"
              >
                Pay Now
              </button>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white p-6 rounded-2xl border border-[#F1F5F9] drop-shadow-sm hover:drop-shadow-md transition-shadow relative">
            <div className="size-2 rounded-full bg-[#3B82F6] absolute top-6 right-6 animate-pulse" />
            <div className="size-12 bg-[#EFF6FF] rounded-2xl flex items-center justify-center text-[#3B82F6] mb-4">
              <BookIcon className="size-6" />
            </div>
            <h4 className="font-bold text-[#0F172A] text-base">
              Academic Library
            </h4>
            <p className="text-sm text-[#64748B] mt-1">
              Access lecture notes and past questions.
            </p>
            <div className="mt-6">
              <span className="text-xs font-medium text-[#2563EB] bg-[#EFF6FF] px-3 py-2 rounded-xl">
                3 New Materials Added
              </span>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white p-6 rounded-2xl border border-[#F1F5F9] drop-shadow-sm hover:drop-shadow-md transition-shadow relative">
            <div className="size-12 bg-[#FFF7ED] rounded-2xl flex items-center justify-center text-[#F97316] mb-4">
              <Briefcase2Icon className="size-6" />
            </div>
            <h4 className="font-bold text-[#0F172A] text-base">SIWES Board</h4>
            <p className="text-sm text-[#64748B] mt-1">
              Manage your internship placements.
            </p>
            <div className="mt-6 flex flex-col gap-1">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#64748B]">Logbook Status</span>
                <span className="text-[#F97316] font-bold">Week 4</span>
              </div>
              <div className="overflow-hidden h-2 text-xs flex rounded-full bg-[#F1F5F9]">
                <div
                  style={{ width: "75%" }}
                  className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-[#F97316] rounded-full transition-all duration-500 ease-out"
                />
              </div>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white p-6 rounded-2xl border border-[#F1F5F9] drop-shadow-sm hover:drop-shadow-md transition-shadow relative">
            <div className="size-12 bg-[#F0FDFA] rounded-2xl flex items-center justify-center text-[#14B8A6] mb-4">
              <CloudIcon className="size-6" />
            </div>
            <h4 className="font-bold text-[#0F172A] text-base">
              Upload Center
            </h4>
            <p className="text-sm text-[#64748B] mt-1">
              Submit assignments and project files.
            </p>
            <div className="mt-4">
              <button className="w-full py-2 border border-dashed border-[#CBD5E1] rounded-lg text-sm font-medium text-[#64748B] hover:bg-gray-50 flex items-center justify-center gap-2 cursor-pointer">
                <Plus size={14} /> New Upload
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications & Help - Keeping your existing layout below */}
      <div className="flex flex-col sm:flex-row gap-6">
        <div className="w-full bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-[#0F172A] text-lg flex items-center gap-2">
              <NotificationIcon className="text-[#138601] size-5" /> Recent
              Notifications
            </h3>
            <a href="#" className="text-sm font-medium text-[#138601] hover:underline">
              View All
            </a>
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex gap-4 p-3">
              <div className="size-10 rounded-full flex items-center justify-center bg-[#DBEAFE] shrink-0">
                <MegaphoneIcon className="text-[#138601] size-5" />
              </div>
              <div className="w-full">
                <div className="flex justify-between items-start gap-2">
                  <h4 className="text-sm font-bold text-[#0F172A]">
                    General Meeting Postponed
                  </h4>
                  <span className="text-xs text-[#94A3B8] whitespace-nowrap">
                    2 hrs ago
                  </span>
                </div>
                <p className="text-sm text-[#64748B] mt-1 leading-relaxed">
                  The departmental meeting scheduled for Friday has been moved
                  to next week Tuesday.
                </p>
              </div>
            </div>
            <div className="flex gap-4 p-3">
              <div className="size-10 rounded-full flex items-center justify-center bg-[#DCFCE7] shrink-0">
                <CheckMarkIcon className="text-[#16A34A] size-5" />
              </div>
              <div className="w-full">
                <div className="flex justify-between items-start gap-2">
                  <h4 className="text-sm font-bold text-[#0F172A]">
                    Course Registration Approved
                  </h4>
                  <span className="text-xs text-[#94A3B8] whitespace-nowrap">
                    Yesterday
                  </span>
                </div>
                <p className="text-sm text-[#64748B] mt-1 leading-relaxed">
                  Your course registration for the 2023/2024 session has been
                  successfully approved by your...
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full sm:max-w-92 bg-linear-to-b from-[#138601] to-[#0B5501] rounded-3xl p-6 text-white flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 size-32 bg-white opacity-3 backdrop-blur-3xl rounded-full -mr-10 -mt-10" />

          <div className="relative z-10">
            <div className="size-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center mb-4">
              <SupportIcon className="text-white size-5" />
            </div>
            <h3 className="text-xl font-bold">Need Help?</h3>
            <p className="text-sm text-white/80 mt-2 leading-relaxed">
              Contact the student support team for issues regarding your portal
              or academics.
            </p>
          </div>

          <button className="relative z-10 bg-white text-green-800 w-full py-3 rounded-xl font-bold text-sm mt-6 hover:bg-green-50 transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;