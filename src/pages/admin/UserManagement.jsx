import React, { useState } from "react";
import Logo from "../../assets/images/nacos-logo.svg";
// import Dashboard from "../../assets/icons/dashboard.svg";
// import UserManage from "../../assets/icons/user_m.svg";
import Content from "../../assets/icons/content.svg";
import Payments from "../../assets/icons/payment.svg";
import Events from "../../assets/icons/event.svg";
import Siwes from "../../assets/icons/siwes.svg";
import Voting from "../../assets/icons/voting.svg";
import Logout from "../../assets/icons/logout.svg";
import Notification from "../../assets/icons/notification.svg";
import Profile from "../../assets/icons/profile.svg";
import ArrowDown from "../../assets/icons/ArrowDown.svg";
import People from "../../assets/icons/people.svg";
import UpArrow from "../../assets/icons/ArrowUp.svg";
import Trade from "../../assets/icons/tradingArrow.svg";
import Wallet from "../../assets/icons/Wallet.svg";
import Date from "../../assets/icons/date.svg";
import MarkDone from "../../assets/icons/mark_done.svg";
import Reject from "../../assets/icons/cancel.svg";
import View from "../../assets/icons/eye.svg";
import Edit from "../../assets/icons/edit.svg";
import Recent from "../../assets/icons/recent.svg";
import Filter from "../../assets/icons/filter.svg";

// temporary layout componet
// replaced with the actual Layout component later
const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full relative">
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 min-[1200px]:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* SIDEBAR */}
      <aside
        className={`
                fixed top-0 left-0 z-50 h-full bg-white border-r border-[#E2E8F0] pt-4 flex flex-col 
                transition-transform duration-300 ease-in-out
                w-64 min-[1200px]:w-[18%] min-[1200px]:static min-[1200px]:translate-x-0
                ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
            `}
      >
        <div className="mb-8 flex items-center gap-2 px-6">
          <div className="w-12 h-12 rounded-full bg-[#E8F3E6] flex items-center justify-center">
            <img src={Logo} alt="Nacos Logo" className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <h1 className="font-bold text-[18px] text-[#0F172A]">NACOS</h1>
            <span className="font-medium text-xs text-[#64748B]">
              Admin Console
            </span>
          </div>
          {/* Close Button for Mobile */}
          <button
            className="ml-auto min-[1200px]:hidden text-gray-500"
            onClick={() => setIsSidebarOpen(false)}
          >
            ✕
          </button>
        </div>
        <nav className="px-6 mb-auto overflow-y-auto">
          <ul className="flex flex-col gap-6 font-medium text-[14px] text-[#475569]">
            <li className="flex items-center gap-2">
              <img
                // src={Dashboard}
                alt="Dashboard"
                className="w-5 h-5 mr-2 inline"
              />{" "}
              Dashboard
            </li>
            <li className="flex items-center gap-2 bg-[#138601] rounded-xl text-white px-4 py-2.5">
              <img
                // src={UserManage}
                alt="User Management"
                className="w-5 h-5 mr-2 inline"
              />{" "}
              User Management
            </li>
            <li className="flex items-center gap-2">
              <img
                src={Content}
                alt="Content Moderation"
                className="w-5 h-5 mr-2 inline"
              />{" "}
              Content Moderation
            </li>
            <li className="flex items-center gap-2">
              <img
                src={Payments}
                alt="Payments"
                className="w-5 h-5 mr-2 inline"
              />{" "}
              Payments
            </li>

            <li className="border-t border-[#E2E8F0] text-xs my-3">MODULES</li>

            <li className="flex items-center gap-2">
              <img
                src={Events}
                alt="Events & Polls"
                className="w-5 h-5 mr-2 inline"
              />{" "}
              Events & Polls
            </li>
            <li className="flex items-center gap-2">
              <img
                src={Siwes}
                alt="SIWES Board"
                className="w-5 h-5 mr-2 inline"
              />{" "}
              SIWES Board
            </li>
            <li className="flex items-center gap-2">
              <img
                src={Voting}
                alt="Voting System"
                className="w-5 h-5 mr-2 inline"
              />{" "}
              Voting System
            </li>
          </ul>
        </nav>
        <div className="border-t border-[#E2E8F0] py-6 flex-col pl-6 flex items-start gap-2 bg-white">
          <button className="text-red-600 cursor-pointer font-medium text-[14px] flex items-center gap-2">
            <img src={Logout} alt="Logout" className="w-5 h-5 mr-2 inline" />{" "}
            Logout
          </button>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <div className="w-full min-[1200px]:w-[82%] bg-[#F8FAFC]">
        <header className="w-full py-3.5 bg-white border-b border-[#E2E8F0] px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            {/* Menu Button (Visible only on mobile) */}
            <button
              className="min-[1200px]:hidden p-2 hover:bg-gray-100 rounded-md"
              onClick={() => setIsSidebarOpen(true)}
            >
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  d="M3 12h18M3 6h18M3 18h18"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
            <h2 className="font-medium text-[14px] text-[#1E293B]">
              User Management
            </h2>
          </div>
          <div className="flex justify-center">
            <input
              type="search"
              placeholder="Search..."
              className="hidden md:block outline-0 bg-[#F1F5F9] rounded-full py-2.25 px-6"
            />
            <div className="w-12 h-12 rounded-full bg-brand-secondary inline-flex items-center justify-center ml-4 cursor-pointer">
              <img src={Notification} alt="Notification icon" className="" />
            </div>
            <div className="hidden md:block h-11 bg-[#E2E8F0] w-0.5 mx-6"></div>
            <div className="flex items-center gap-3 cursor-pointer">
              <img
                src={Profile}
                alt="Profile"
                className="w-12 h-12 rounded-full"
              />
              <h2 className="hidden md:block">Akintunde Moses</h2>
              <img src={ArrowDown} alt="Arrow Down" className="w-4 h-4" />
            </div>
          </div>
        </header>
        {/* main content */}
        <main className="w-full px-4 md:px-15 py-5 h-[calc(100vh-80px)] overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

// user data
const initialUsers = [
  {
    id: 1,
    name: "Adebayo John",
    email: "adebayo.j@student.edu",
    matric: "AUL/CMP/22/080",
    level: "400L",
    role: "Class Rep",
    status: "Active",
    avatarColor: "bg-blue-100 text-blue-600",
    selected: false,
  },
  {
    id: 2,
    name: "Chioma Nwechuku",
    email: "chioma.n@student.edu",
    matric: "AUL/CMP/22/081",
    level: "300L",
    role: "Student",
    status: "Active",
    avatarColor: "bg-pink-100 text-pink-600",
    selected: false,
  },
  {
    id: 3,
    name: "Emmanuel Ojo",
    email: "emmanuel.o@student.edu",
    matric: "AUL/CMP/22/082",
    level: "200L",
    role: "Student",
    status: "Pending",
    avatarColor: "bg-yellow-100 text-yellow-600",
    selected: false,
  },
  {
    id: 4,
    name: "Fatima Yusuf",
    email: "fatima.y@student.edu",
    matric: "AUL/CMP/22/083",
    level: "100L",
    role: "Student",
    status: "Active",
    avatarColor: "bg-green-100 text-green-600",
    selected: false,
  },
  {
    id: 5,
    name: "Daniel Peters",
    email: "daniel.p@student.edu",
    matric: "AUL/CMP/22/084",
    level: "400L",
    role: "Student",
    status: "Active",
    avatarColor: "bg-purple-100 text-purple-600",
    selected: false,
  },
  // Added more users to demonstrate pagination
  {
    id: 6,
    name: "Sarah Connor",
    email: "sarah.c@student.edu",
    matric: "AUL/CMP/22/085",
    level: "300L",
    role: "Student",
    status: "Pending",
    avatarColor: "bg-red-100 text-red-600",
    selected: false,
  },
  {
    id: 7,
    name: "John Wick",
    email: "john.w@student.edu",
    matric: "AUL/CMP/22/086",
    level: "400L",
    role: "Student",
    status: "Active",
    avatarColor: "bg-gray-100 text-gray-600",
    selected: false,
  },
  {
    id: 8,
    name: "Bruce Wayne",
    email: "bruce.w@student.edu",
    matric: "AUL/CMP/22/087",
    level: "200L",
    role: "Class Rep",
    status: "Active",
    avatarColor: "bg-blue-100 text-blue-600",
    selected: false,
  },
  {
    id: 9,
    name: "Clark Kent",
    email: "clark.k@student.edu",
    matric: "AUL/CMP/22/088",
    level: "400L",
    role: "Student",
    status: "Pending",
    avatarColor: "bg-blue-100 text-blue-600",
    selected: false,
  },
  {
    id: 10,
    name: "Diana Prince",
    email: "diana.p@student.edu",
    matric: "AUL/CMP/22/089",
    level: "300L",
    role: "Student",
    status: "Active",
    avatarColor: "bg-pink-100 text-pink-600",
    selected: false,
  },
  {
    id: 11,
    name: "Barry Allen",
    email: "barry.a@student.edu",
    matric: "AUL/CMP/22/090",
    level: "100L",
    role: "Student",
    status: "Active",
    avatarColor: "bg-red-100 text-red-600",
    selected: false,
  },
  {
    id: 12,
    name: "Hal Jordan",
    email: "hal.j@student.edu",
    matric: "AUL/CMP/22/091",
    level: "200L",
    role: "Class Rep",
    status: "Pending",
    avatarColor: "bg-green-100 text-green-600",
    selected: false,
  },
];

// log data for the new section
const recentLogs = [
  {
    id: 1,
    activity: 'Role Assignment: "Class Rep (400L)"',
    admin: "Raphael F. (Gen Sec)",
    date: "Oct 24, 10:30 AM",
    status: "Pending Review",
    action: "Review",
    statusColor: "bg-[#FFEDD5] text-[#EA580C]",
    actionColor: "text-[#16A34A]",
  },
  {
    id: 2,
    activity: "New Student Verification Batch",
    admin: "Admin User",
    date: "Oct 24, 09:15 AM",
    status: "Completed",
    action: "Details",
    statusColor: "bg-[#DCFCE7] text-[#16A34A]",
    actionColor: "text-[#94A3B8]",
  },
  {
    id: 3,
    activity: "Bulk CSV Import Failed",
    admin: "Michael O. (PRO)",
    date: "Oct 23, 04:45 PM",
    status: "Pending Review",
    action: "Approve",
    statusColor: "bg-[#FFEDD5] text-[#EA580C]",
    actionColor: "text-[#16A34A]",
  },
  {
    id: 4,
    activity: "Student Info Update Request",
    admin: "System (Auto-log)",
    date: "Oct 23, 02:20 PM",
    status: "New",
    action: "Profile",
    statusColor: "bg-[#DBEAFE] text-[#2563EB]",
    actionColor: "text-[#94A3B8]",
  },
];

// const UserManagement = () => {
// State for Users and Pagination
const [users, setUsers] = useState(initialUsers);
const [currentPage, setCurrentPage] = useState(1);
const itemsPerPage = 3;

// --- PAGINATION LOGIC ---
const indexOfLastItem = currentPage * itemsPerPage;
const indexOfFirstItem = indexOfLastItem - itemsPerPage;
const currentUsers = users.slice(indexOfFirstItem, indexOfLastItem);
const totalPages = Math.ceil(users.length / itemsPerPage);

const paginate = (pageNumber) => {
  if (pageNumber > 0 && pageNumber <= totalPages) {
    setCurrentPage(pageNumber);
  }
};

// --- CHECKBOX LOGIC ---
// Select a single user
const toggleSelectUser = (id) => {
  setUsers(
    users.map((user) =>
      user.id === id ? { ...user, selected: !user.selected } : user
    )
  );
};

// Select All (Applied to current page only)
const toggleSelectAll = () => {
  const isAllSelected = currentUsers.every((user) => user.selected);
  // If all are selected, deselect them. If not, select them.
  const updatedUsers = users.map((user) => {
    // Check if this user is currently visible on this page
    const isVisible = currentUsers.some(
      (visibleUser) => visibleUser.id === user.id
    );
    if (isVisible) {
      return { ...user, selected: !isAllSelected };
    }
    return user;
  });
  setUsers(updatedUsers);
};

// --- SEARCH LOGIC ---
const handleSearch = (e) => {
  const query = e.target.value;
  const result = initialUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(query.toLowerCase()) ||
      user.matric.toLowerCase().includes(query.toLowerCase())
  );
  setUsers(result);
  setCurrentPage(1); // Reset to page 1 on search
};

// Check if the "Select All" checkbox should be checked
const isHeaderCheckboxChecked =
  currentUsers.length > 0 && currentUsers.every((user) => user.selected);
const selectedCount = users.filter((u) => u.selected).length;

// Bulk Approver function
const bulkApprover = () => {
  setUsers(
    users.map((user) =>
      user.selected ? { ...user, status: "Active" } : user
    )
  );
};
// approver user function
const approveUser = (id) => {
  setUsers(
    users.map((user) =>
      user.id === id ? { ...user, status: "Active" } : user
    )
  );
};
// reject user function
const rejectUser = (id) => {
  setUsers(
    users.map((user) =>
      user.id === id ? { ...user, status: "Rejected" } : user
    )
  );
};

return (
  <Layout>
    <div className="">
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-[20px] md:text-[30px] font-bold text-[#0F172A]">
            User Management
          </h1>
          <p className="text-[#64748B] text-[14px] md:text-[16px]">
            Manage student profiles, verify accounts and assign reps
          </p>
        </div>
        <span className="hidden md:block text-[#64748B] text-xs">
          Last Login <br /> Today 09:41 AM
        </span>
      </div>
      {/* User Management Content */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col min-[900px]:flex-row gap-4 w-full">
          {/* card 1 */}
          <div className="bg-white border-[#F1F5F9] flex-1 px-6 py-4 rounded-3xl flex flex-col justify-between shadow-sm">
            <div className="flex justify-between items-center">
              <div className="bg-[#E8F3E6] w-12 h-12 rounded-xl flex items-center justify-center">
                <img src={People} alt="Icon of group of peope" />
              </div>
              <div className="bg-[#F0FDF4] flex justify-center px-2 py-1 text-xs text-[#16A34A] font-bold rounded-full">
                <img src={Trade} alt="Icon of trading arrow" />
                <span>+12%</span>
              </div>
            </div>
            <p className="font-medium text-[#64748B] text-[14px] my-2">
              Total Registration
            </p>
            <h2 className="font-bold text-[24px] mb-2">2,450</h2>
            <span className="text-[#10B981] text-xs font-medium flex items-center gap-1">
              <img src={UpArrow} alt="Icon of Arrow Up" />
              +12% vs last sem
            </span>
          </div>
          {/* card 2  */}
          <div className="bg-white border-[#F1F5F9] flex-1 px-6 py-4 rounded-3xl flex flex-col justify-between shadow-sm">
            <div className="flex justify-between items-center">
              <div className="bg-[#E8F3E6] w-12 h-12 rounded-xl flex items-center justify-center">
                <img src={Wallet} alt="Icon of group of wallet" />
              </div>
              <div className="bg-[#F1F5F9] flex justify-center px-2 py-1.5 text-xs text-[#64748B] font-bold rounded-lg">
                <span>This Session</span>
              </div>
            </div>
            <p className="font-medium text-[#64748B] text-[14px] my-2">
              Class Representatives
            </p>
            <h2 className="font-bold text-[24px] mb-2">12</h2>
            <span className="text-[#94A3B8] text-xs font-medium flex items-center gap-1">
              Across all levels
            </span>
          </div>
          {/* card 3  */}
          <div className="bg-white border-[#F1F5F9] flex-1 px-6 py-4 rounded-3xl flex flex-col justify-between shadow-sm">
            <div className="flex justify-between items-center">
              <div className="bg-[#FFF7ED] w-12 h-12 rounded-xl flex items-center justify-center">
                <img src={Date} alt="Icon of group of peope" />
              </div>
              <div className="bg-[#F0FDF4] flex justify-center px-2 py-1 text-xs text-[#16A34A] font-bold rounded-full">
                <img src={Trade} alt="Icon of trading arrow" />
                <span>+12%</span>
              </div>
            </div>
            <p className="font-medium text-[#64748B] text-[14px] my-2">
              Pending Approvals
            </p>
            <h2 className="font-bold text-[24px] mb-2">14</h2>
            <div className="flex justify-between text-xs font-medium text-[#64748B]">
              <span>Resources: 8</span>
              <span>SIWES: 6</span>
            </div>
          </div>
        </div>

        {/* --- TABLE SECTION --- */}
        <div className="bg-white rounded-3xl shadow border border-[#E5E7EB]">
          {/* Control Bar */}
          <div className="p-4 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-[#E5E7EB]">
            <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto text-[#64748B]">
              <div className="relative w-full md:w-auto">
                <input
                  type="search"
                  onChange={handleSearch}
                  placeholder="Search by name or matric no"
                  className="pl-10 pr-4 py-2 border border-[#E5E7EB] rounded-md font-medium text-sm focus:outline-none focus:ring-2 focus:ring-green-500 w-full md:w-70"
                />
              </div>
              <button className="flex justify-center items-center gap-2 px-4 py-2 border border-[#E5E7EB] rounded-md text-sm font-medium w-full md:w-auto">
                <img
                  src={Filter}
                  alt="svg image of filter"
                  className="w-3.5 h-3.5"
                />{" "}
                Filter by Level
              </button>
            </div>
            <div className="flex items-center justify-between w-full md:w-auto gap-4">
              <span className="text-sm text-[#374151]">
                {selectedCount} selected
              </span>
              <button
                className={`bg-[#F3F4F6] text-[#374151] px-4 py-2 rounded-md text-sm font-medium transition ${selectedCount === 0
                  ? " opacity-50 cursor-not-allowed"
                  : " hover:bg-gray-200 cursor-pointer"
                  }`}
                onClick={bulkApprover}
                disabled={selectedCount === 0}
              >
                Bulk Approve
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left  min-w-200">
              <thead>
                <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB] text-xs text-[#6B7280] font-semibold">
                  <th className="p-4 w-10">
                    {/* SELECT ALL CHECKBOX */}
                    <input
                      type="checkbox"
                      checked={isHeaderCheckboxChecked}
                      onChange={toggleSelectAll}
                      className="rounded border-[#E5E7EB] text-green-600 focus:ring-green-500 cursor-pointer w-4 h-4"
                    />
                  </th>
                  <th className="p-4">Student Details</th>
                  <th className="p-4">Matric No.</th>
                  <th className="p-4">Level</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm text-gray-700">
                {currentUsers.map((user) => (
                  <tr
                    key={user.id}
                    className={`border-b border-gray-50 hover:bg-gray-50 transition ${user.selected ? "bg-green-50" : ""
                      }`}
                  >
                    <td className="p-4">
                      {/* INDIVIDUAL ROW CHECKBOX */}
                      <input
                        type="checkbox"
                        checked={user.selected}
                        onChange={() => toggleSelectUser(user.id)}
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer w-4 h-4"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${user.avatarColor}`}
                        >
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </div>
                        <div>
                          <p className="font-medium text-[14px] text-black">
                            {user.name}
                          </p>
                          <p className="text-[#64748B] text-[14px] font-medium">
                            {user.email}
                          </p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-[#64748B] text-[14px]">
                      {user.matric}
                    </td>
                    <td className="p-4 text-[#64748B] text-[14px]">
                      {user.level}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[12px] font-semibold ${user.role === "Class Rep"
                          ? "bg-[#F3E8FF] text-[#6B21A8]"
                          : "bg-[#F3F4F6] text-[#4B5563]"
                          }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${user.status === "Active"
                          ? "bg-[#DCFCE7] text-[#166534]"
                          : user.status === "Rejected"
                            ? "bg-red-200 text-red-600"
                            : "bg-[#FEF9C3] text-[#854D0E]"
                          }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3 text-gray-400">
                        {user.status === "Pending" ? (
                          <>
                            <button
                              title="Approve"
                              onClick={() => approveUser(user.id)}
                              className="cursor-pointer"
                            >
                              <img
                                src={MarkDone}
                                alt="Svg image"
                                className="w-4 h-4"
                              />
                            </button>
                            <button
                              title="Reject"
                              onClick={() => rejectUser(user.id)}
                              className="cursor-pointer"
                            >
                              <img
                                src={Reject}
                                alt="Svg image"
                                className="w-4 h-4"
                              />
                            </button>
                          </>
                        ) : (
                          <>
                            <button title="View">
                              <img
                                src={View}
                                alt="Svg image"
                                className="w-4 h-4"
                              />
                            </button>
                            <button title="Edit">
                              <img
                                src={Edit}
                                alt="Svg image"
                                className="w-4 h-4"
                              />
                            </button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          <div className="p-4 flex flex-col md:flex-row justify-between items-center border-t border-[#E5E7EB] text-sm text-[#6B7280]">
            <p className="font-medium text-[13px]">
              Showing {indexOfFirstItem + 1} to{" "}
              {Math.min(indexOfLastItem, users.length)} of {users.length}{" "}
              students
            </p>
            <div className="flex items-center gap-1 mt-2 md:mt-0">
              {/* Previous Button */}
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`w-8 h-8 flex items-center justify-center border border-[#E5E7EB] rounded ${currentPage === 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-50 cursor-pointer"
                  }`}
              >
                &lt;
              </button>

              {/* Page Numbers */}
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => paginate(i + 1)}
                  className={`w-8 h-8 flex items-center justify-center rounded font-medium transition ${currentPage === i + 1
                    ? "bg-[#138601] text-white"
                    : "border border-[#E5E7EB] hover:bg-gray-50"
                    }`}
                >
                  {i + 1}
                </button>
              ))}

              {/* Next Button */}
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`w-8 h-8 flex items-center justify-center border border-gray-200 rounded ${currentPage === totalPages
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-50 cursor-pointer"
                  }`}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>

        {/* --- RECENT USER MANAGEMENT LOGS SECTION -- */}
        <div className="bg-white rounded-3xl shadow border border-[#E5E7EB] mb-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 px-6 pt-6 gap-4">
            <h2 className="text-[18px] font-bold text-[#0F172A] flex items-center gap-2">
              <img src={Recent} alt="svg image" className="w-5 h-5" />
              Recent User Management Logs
            </h2>
            <div className="flex gap-3 w-full sm:w-auto">
              <button className="bg-brand-secondary border border-[#E2E8F0] text-[#64748B] px-4 py-2 rounded-lg text-sm font-medium flex-1 sm:flex-none text-center">
                Export Log
              </button>
              <button className="bg-[#138601] text-white px-4 py-2 rounded-lg text-sm font-medium flex-1 sm:flex-none text-center">
                View All
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-200">
              <thead className="bg-brand-secondary">
                <tr className="text-xs font-medium text-[#64748B] border-b border-[#F1F5F9]">
                  <th className="py-3 pl-6">ACTIVITY</th>
                  <th className="py-3 px-4">ADMIN USER</th>
                  <th className="py-3 px-4">DATE/TIME</th>
                  <th className="py-3 px-4">STATUS</th>
                  <th className="py-3 pr-6 text-right">ACTION</th>
                </tr>
              </thead>
              <tbody className="text-[14px]">
                {recentLogs.map((log) => (
                  <tr
                    key={log.id}
                    className="border-b border-[#F1F5F9] last:border-0 hover:bg-gray-50 transition"
                  >
                    <td className="py-4 pl-6 font-medium text-[#0F172A]">
                      {log.activity}
                    </td>
                    <td className="py-4 px-4 text-[#64748B]">{log.admin}</td>
                    <td className="py-4 px-4 text-[#64748B]">{log.date}</td>
                    <td className="py-4 px-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${log.statusColor}`}
                      >
                        {log.status}
                      </span>
                    </td>
                    <td
                      className={`py-4 pr-6 text-right font-medium cursor-pointer ${log.actionColor}`}
                    >
                      {log.action}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </Layout>
);
};

// export default UserManagement;

