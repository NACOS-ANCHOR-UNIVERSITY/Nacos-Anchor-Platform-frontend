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

      {/* STATS OVERVIEW */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
        {/* 1. Total Registration */}
        <StatsCard
          title="Total Registration"
          value="2,450"
          icon={<Users className="w-6 h-6" />}
          color="green"
          trend={
            <span className="bg-green-50 text-green-600 text-xs font-bold px-2 py-1 rounded-lg">
              +12%
            </span>
          }
          progress={85}
          footer="Target: 2,800 students"
        />

        {/* 2. Dues Collected */}
        <StatsCard
          title="Dues Collected"
          value="₦12.5M"
          icon={<CreditCard className="w-6 h-6" />}
          color="green"
          trend={
            <span className="bg-gray-100 text-gray-600 text-xs font-bold px-2 py-1 rounded-lg">
              This Session
            </span>
          }
          progress={65}
          footer="65% Completion Rate"
        />

        {/* 3. Pending Approvals (Split Footer) */}
        <StatsCard
          title="Pending Approvals"
          value="14"
          icon={<ClipboardCheck className="w-6 h-6" />}
          color="orange"
          trend={
            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2"></div>
          }
          // Custom Footer with Split Text
          footer={
            <div className="flex justify-between items-center text-xs font-medium text-gray-500 pt-2 border-t border-gray-50 mt-2">
              <span>
                Resources: <span className="text-gray-900 font-bold">8</span>
              </span>
              <span>
                SIWES: <span className="text-gray-900 font-bold">6</span>
              </span>
            </div>
          }
        />

        {/* 4. Daily Active Users (Avatar Stack) */}
        <StatsCard
          title="Daily Active Users"
          value="452"
          icon={<TrendingUp className="w-6 h-6" />}
          color="purple"
          trend={
            <span className="bg-purple-50 text-purple-600 text-xs font-bold px-2 py-1 rounded-lg">
              Active
            </span>
          }
          // Custom Footer with Avatar Stack
          footer={
            <div className="flex items-center -space-x-2 pt-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center text-[10px] font-bold text-gray-500"
                >
                  U{i}
                </div>
              ))}
              <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">
                +400
              </div>
            </div>
          }
        />
      </div>

      {/* ADMINISTRATION MODULES GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 1. User Management (Checklist Style) */}
        <ModuleCard
          title="User Management"
          sub="Manage students & class reps"
          color="green"
          features={["Assign Class Representatives", "Verify Student Profiles"]}
          action="Manage Users"
          icon={<Users className="w-6 h-6" />}
        />

        {/* 2. Content Moderation (Badge Style) */}
        <ModuleCard
          title="Content Moderation"
          sub="Review uploads & chats"
          color="orange"
          stats={[
            {label: "3 Reports", bg: "bg-red-100", text: "text-red-600"},
            {
              label: "8 Pending Resources",
              bg: "bg-blue-100",
              text: "text-blue-600",
            },
          ]}
          action="Review Content"
          icon={<FileText className="w-6 h-6" />}
        />

        {/* 3. Finance (Description Style) */}
        <ModuleCard
          title="Finance & Payments"
          sub="Track dues and generate receipts"
          desc="Monitor incoming departmental dues, approve manual payments, and manage refunds."
          color="green"
          action="Go to Finance"
          icon={<CreditCard className="w-6 h-6" />}
        />

        {/* 4. Voting System (Description Style) */}
        <ModuleCard
          title="Voting System"
          sub="Elections & Polls"
          desc="Set up upcoming elections, manage candidates, and monitor live poll results."
          color="purple"
          action="Manage Elections"
          icon={<Vote className="w-6 h-6" />} // Make sure <Vote> is imported from lucide-react
        />

        {/* 5. SIWES Board (Description Style) */}
        <ModuleCard
          title="SIWES Board"
          sub="Internship Placements"
          desc="Review student logbooks, approve placement letters, and track industry supervision."
          color="purple"
          action="Open Board"
          icon={<Briefcase className="w-6 h-6" />}
        />

        {/* 6. Event Manager (Description Style) */}
        <ModuleCard
          title="Event Manager"
          sub="Scheduling & Publicity"
          desc="Create new events, manage RSVPs, and broadcast notifications to students."
          color="red"
          action="Manage Events"
          icon={<Calendar className="w-6 h-6" />}
        />
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



function ModuleCard({
  title,
  sub,
  icon,
  action,
  color = "green",
  stats,
  features,
  desc,
}) {
  
  const colorMap = {
    green: "bg-green-50 text-green-600 border-green-100",
    orange: "bg-orange-50 text-orange-500 border-orange-100",
    purple: "bg-purple-50 text-purple-600 border-purple-100",
    blue: "bg-blue-50 text-blue-600 border-blue-100",
    red: "bg-red-50 text-red-600 border-red-100",
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md hover:border-gray-200 transition-all flex flex-col h-full group">
      {/* Header */}
      <div className="flex items-start gap-4 mb-3">
        <div className={`p-3 rounded-2xl border ${colorMap[color]} shrink-0`}>
          {icon}
        </div>
        <div>
          <h4 className="font-bold text-gray-900 text-lg leading-tight">
            {title}
          </h4>
          <p className="text-xs font-medium text-gray-500 mt-1">{sub}</p>
        </div>
      </div>

      <div className="flex-1 mb-6">
        {features && (
          <ul className="space-y-2 mt-2">
            {features.map((item, i) => (
              <li
                key={i}
                className="flex items-center gap-2 text-xs font-semibold text-gray-600"
              >
                <div className="w-4 h-4 rounded-full bg-green-100 text-green-600 flex items-center justify-center text-[10px]">
                  ✔
                </div>
                {item}
              </li>
            ))}
          </ul>
        )}

        {stats && (
          <div className="flex flex-wrap gap-2 mt-2">
            {stats.map((stat, i) => (
              <span
                key={i}
                className={`text-xs px-3 py-1.5 font-bold  rounded-md ${stat.bg} ${stat.text}`}
              >
                {stat.label}
              </span>
            ))}
          </div>
        )}

        {!features && !stats && desc && (
          <p className="text-sm text-gray-500 leading-relaxed mt-1">{desc}</p>
        )}
      </div>

      <button className="w-full py-3 bg-gray-50 text-gray-800 text-sm font-bold rounded-xl border border-gray-100 hover:bg-white hover:border-green-200 hover:text-green-700 hover:shadow-sm transition-all">
        {action}
      </button>
    </div>
  );
}
function StatsCard({
  title,
  value,
  icon,
  trend,
  color = "green",
  progress,
  footer,
}) {
  const colorMap = {
    green: "bg-green-50 text-green-600",
    orange: "bg-orange-50 text-orange-500",
    purple: "bg-purple-50 text-purple-600",
    blue: "bg-blue-50 text-blue-600",
  };

  return (
    <div className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full">
      {/* 1. TOP SECTION (Icon & Trend) */}
      <div className="flex justify-between items-start">
        <div className={`p-3 rounded-2xl ${colorMap[color] || colorMap.green}`}>
          {icon}
        </div>
        {trend}
      </div>

      {/* 2. THE SPACER (This pushes the text & progress bar to the bottom) */}
      <div className="flex-1 min-h-[24px]"></div>

      {/* 3. MIDDLE SECTION (Title & Value) */}
      {/* Reduced mb-1 to mb-0.5 for tighter spacing */}
      <div className="mb-1">
        <p className="text-sm font-medium text-gray-500 mb-0.5">{title}</p>
        <h3 className="text-3xl font-bold text-gray-900 tracking-tight leading-none">
          {value}
        </h3>
      </div>

      {/* 4. BOTTOM SECTION (Progress & Footer) */}
      {/* Changed mt-6 to mt-2 so it sits right under the number */}
      <div className="mt-2">
        {progress ? (
          <div>
            <div className="w-full bg-gray-100 h-1.5 rounded-full mb-1.5 overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  color === "green" ? "bg-green-500" : "bg-blue-500"
                }`}
                style={{width: `${progress}%`}}
              ></div>
            </div>
            {footer && (
              <p className="text-xs text-gray-400 font-medium">{footer}</p>
            )}
          </div>
        ) : (
          <div>{footer}</div>
        )}
      </div>
    </div>
  );
}
