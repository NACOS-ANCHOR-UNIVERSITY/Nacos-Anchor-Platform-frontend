import React from "react";
import {
  Users,
  TrendingUp,
  AlertCircle,
  FileText,
  CreditCard,
  Calendar,
  MessageSquare,
  ClipboardCheck,
  Dot,
  Vote,
  Briefcase,
  Clock,
  Download,
  ArrowRight,
  Plus,
} from "lucide-react";

export default function AdminDashboard() {
  const recentActivities = [
    {
      id: 1,
      activity: 'Resource Upload: "CSC 301 Notes"',
      user: "Sarah J. (300L)",
      date: "Oct 24, 10:30 AM",
      status: "Pending Review",
      action: "Review",
    },
    {
      id: 2,
      activity: "Dues Payment Verification",
      user: "Michael O. (100L)",
      date: "Oct 24, 09:15 AM",
      status: "Completed",
      action: "Details",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto">
      {/* PAGE HEADER */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Executive Dashboard
          </h1>
          <p className="text-gray-500 mt-1">
            Overview of system performance and administrative tasks.
          </p>
        </div>
        <button className="bg-green-600 text-white px-5 py-2.5 rounded-lg text-sm font-medium hover:bg-green-700 shadow-sm flex items-center gap-2 transition-transform active:scale-95">
          <Plus className="w-4 h-4" /> Create Post
        </button>
      </div>

      {/* //defined props to be used here */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        <StatsCard
          label="Total Registration"
          value="2,450"
          sub="Target: 2,600 students"
          progress={65}
          icon={<Users className="text-green-600" />}
         trend={
         <div className="flex items-center gap-2 text-green-600 rounded-2xl h-7 w-15">
            <div>{<TrendingUp className="text-green-600 pl-2"/>}</div>
            <span>+12%</span>
          </div>
  }
        />
        <StatsCard
          label="Dues Collected"
          value="₦12.5M"
          sub="85% Completion Rate"
          progress={85}
          icon={<TrendingUp className="text-green-600" />}
          trend={
            <p className=" text-gray-600 rounded h-5.5 pt-1 w-20 text-center">This Session</p>
          }
        />
        <StatsCard
          label="Pending Approvals"
          value="14"
          sub="Resources : 8"
          icon={<ClipboardCheck className="text-orange-500" />}
          trend={<Dot className="w-2 h-2 bg-orange-500 rounded-full" />}
        />
        <StatsCard
          label="Daily Active Users"
          value="452"
          sub="Active Now"
          icon={<Users className="text-purple-500" />}
          trend={
            <p className="text-purple-500 rounded h-5.5 pt-1 w-10 text-center">Active</p>
          }
        />
      </div>

      {/*  ADMINISTRATION MODULES */}
      <div className="mb-10">
        <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
          <div className="w-2 h-2 bg-green-600 rounded-full"></div>{" "}
          Administration Modules
        </h3>

        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <ModuleCard
            title="User Management"
            desc="Manage students & class reps. Assign roles and verify profiles."
            action="Manage Users"
            icon={<Users className="w-6 h-6 text-green-600" />}
          />
          <ModuleCard
            title="Content Moderation"
            desc="Review student uploads & chats. Approve or reject resources."
            action="Review Content"
            icon={<FileText className="w-6 h-6 text-orange-500" />}
          />
          <ModuleCard
            title="Finance & Payments"
            desc="Monitor incoming departmental dues and approve manual payments."
            action="Go to Finance"
            icon={<CreditCard className="w-6 h-6 text-green-700" />}
          />
          <ModuleCard
            title="Voting System"
            desc="Set up upcoming elections, manage candidates, and monitor live results."
            action="Manage Elections"
            icon={<Vote className="w-6 h-6 text-green-600" />}
          />
          <ModuleCard
            title="SIWES Board"
            desc="Review student logbooks, approve placement letters."
            action="Open Board"
            icon={<Briefcase className="w-6 h-6 text-purple-600" />}
          />
          <ModuleCard
            title="Event Manager"
            desc="Create new events, manage RSVPs, and broadcast notifications."
            action="Manage Events"
            icon={<Calendar className="w-6 h-6 text-red-500" />}
          />
        </div>
      </div>

      {/* RECENT ADMIN ACTIVITIES */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <h3 className="text-lg font-bold text-gray-900 flex items-center gap-2">
            <Clock className="w-5 h-5 text-green-700" /> Recent Admin Activities
          </h3>
          <div className="flex gap-3">
            <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-gray-600 bg-white border border-gray-200 rounded hover:bg-gray-50 shadow-sm">
              <Download className="w-3 h-3" /> Export Log
            </button>
            <button className="flex items-center gap-2 px-3 py-1.5 text-xs font-medium text-white bg-green-700 rounded hover:bg-green-800 shadow-sm">
              View All <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Activity
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Date/Time
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">
                  Action
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {recentActivities.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 transition-colors group"
                >
                  <td className="px-6 py-4 text-sm font-medium text-gray-900">
                    {item.activity}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {item.user}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {item.date}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        item.status === "Completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-orange-100 text-orange-700"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      className={`text-sm font-medium hover:underline ${
                        item.action === "Review"
                          ? "text-green-700"
                          : "text-gray-400 group-hover:text-gray-600"
                      }`}
                    >
                      {item.action}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}



function ModuleCard({title, desc, action, icon}) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:shadow-md hover:border-green-200 transition-all flex flex-col h-full group">
      <div className="flex items-start gap-4 mb-4">
        <div className="p-3 bg-gray-50 rounded-lg shrink-0 group-hover:bg-green-50 transition-colors">
          {icon}
        </div>
        <div>
          <h4 className="font-bold text-gray-900 text-lg">{title}</h4>
        </div>
      </div>
      <p className="text-sm text-gray-500 mb-6 flex-1 leading-relaxed">
        {desc}
      </p>
      <button className="w-full py-2.5 border border-gray-300 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-green-700 hover:border-green-200 transition-all">
        {action}
      </button>
    </div>
  );
}

function StatsCard({ label, value, sub, icon, trend, progress }) {
  return (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm hover:border-green-200 transition-colors">
      <div className="flex justify-between items-start mb-4">
        <div className="p-2 bg-gray-50 rounded-lg">{icon}</div>
        
        {/* 1. Trend is now flexible. It renders whatever color/icon you pass in. */}
        {trend && (
          <div className="text-xs font-bold px-2 py-1 rounded bg-gray-50">
            {trend}
          </div>
        )}
      </div>

      <h3 className="text-3xl font-bold text-gray-900 tracking-tight">
        {value}
      </h3>
      <p className="text-sm font-medium text-gray-500 mt-1">{label}</p>

      {/* 2. Progress Line: Only renders if 'progress' prop exists */}
      {progress && (
        <div className="w-full bg-gray-100 h-1.5 rounded-full mt-3 overflow-hidden">
          <div
            className="bg-green-500 h-full rounded-full"
            style={{ width: `${progress}%` }} // Dynamic width
          ></div>
        </div>
      )}

      <p className="text-xs text-gray-400 mt-2">{sub}</p>
    </div>
  );

}
