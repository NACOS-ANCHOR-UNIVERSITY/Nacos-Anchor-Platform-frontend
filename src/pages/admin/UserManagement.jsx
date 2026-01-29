import React, { useState, useEffect } from "react";
import People from "../../assets/icons/people.svg";
import UpArrow from "../../assets/icons/ArrowUp.svg";
import Trade from "../../assets/icons/tradingArrow.svg";
import Wallet from "../../assets/icons/Wallet.svg";
import Date from "../../assets/icons/date.svg";
import MarkDone from "../../assets/icons/mark_done.svg";
import Reject from "../../assets/icons/cancel.svg";
import View from "../../assets/icons/Eye.svg";
import Edit from "../../assets/icons/edit.svg";
import Recent from "../../assets/icons/recent.svg";
import Filter from "../../assets/icons/filter.svg";
import { toast } from "sonner"; // Assuming you use sonner

// Helper to generate consistent colors for avatars
const getAvatarColor = (name) => {
  const colors = [
    "bg-blue-100 text-blue-600",
    "bg-pink-100 text-pink-600",
    "bg-yellow-100 text-yellow-600",
    "bg-green-100 text-green-600",
    "bg-purple-100 text-purple-600",
    "bg-red-100 text-red-600",
  ];
  const index = name.length % colors.length;
  return colors[index];
};

const UserManagement = () => {
  // --- STATE ---
  const [users, setUsers] = useState([]);
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState({
    total_registration: 0,
    class_representatives: 0,
    pending_approvals: 0
  });

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(10); // API limit based on screenshot
  const [searchQuery, setSearchQuery] = useState("");

  // --- API FETCHING ---
  const fetchAllData = async () => {
    setLoading(true);
    const token = localStorage.getItem("ACCESS_TOKEN");

    // 1. Check if token even exists
    if (!token) {
      toast.error("Authentication missing. Please login.");
      window.location.href = "/login";
      return;
    }

    const headers = {
      "Authorization": `Bearer ${token}`,
      "Content-Type": "application/json"
    };

    try {
      const statsRes = await fetch("https://nacos.nextgenerationones.org/api/admin/users/dashboard", { headers });


      if (statsRes.status === 401) {
        localStorage.removeItem("ACCESS_TOKEN");
        localStorage.removeItem("user");
        toast.error("Session expired. Please login again.");
        window.location.href = "/login";
        return;
      }

      const statsData = await statsRes.json();
      if (statsData.status === "success") {
        setStats(statsData.data);
      }

      // ... (rest of your fetch logic for users and logs) ...

    } catch (error) {
      console.error("Failed to fetch user data:", error);
      toast.error("Network Error: Could not connect to server.");
    } finally {
      setLoading(false);
    }
  };

  // Initial Load & Page Change
  useEffect(() => {
    fetchAllData();
  }, [currentPage]);

  // --- HANDLERS ---
  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setCurrentPage(pageNumber);
    }
  };

  const toggleSelectUser = (id) => {
    setUsers(users.map((user) =>
      user.id === id ? { ...user, selected: !user.selected } : user
    )
    );
  };

  const toggleSelectAll = () => {
    const isAllSelected = users.every((user) => user.selected);
    setUsers(users.map((user) => ({ ...user, selected: !isAllSelected })));
  };

  // Client-side search (since API search endpoint wasn't provided in screenshot)
  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.matric.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedCount = users.filter((u) => u.selected).length;
  const isHeaderCheckboxChecked = users.length > 0 && users.every((user) => user.selected);

  // Placeholder actions (You need endpoints for these!)
  const handleAction = (action, id) => {
    toast.info(`${action} functionality coming soon!`);
    // update local state to fake it for now
    if (action === 'Approve') {
      setUsers(users.map(u => u.id === id ? { ...u, status: 'Active' } : u));
    } else if (action === 'Reject') {
      setUsers(users.map(u => u.id === id ? { ...u, status: 'Rejected' } : u));
    }
  };

  if (loading && users.length === 0) {
    return <div className="p-10 text-center">Loading User Management...</div>;
  }

  return (
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
          Last Synced <br /> Just now
        </span>
      </div>

      {/* --- DASHBOARD STATS CARDS --- */}
      <div className="flex flex-col gap-6">
        <div className="flex flex-col min-[900px]:flex-row gap-4 w-full">
          {/* Card 1: Total Registration */}
          <div className="bg-white border-[#F1F5F9] flex-1 px-6 py-4 rounded-3xl flex flex-col justify-between shadow-sm">
            <div className="flex justify-between items-center">
              <div className="bg-[#E8F3E6] w-12 h-12 rounded-xl flex items-center justify-center">
                <img src={People} alt="Icon" />
              </div>
              <div className="bg-[#F0FDF4] flex justify-center px-2 py-1 text-xs text-[#16A34A] font-bold rounded-full">
                <img src={Trade} alt="Icon" />
                <span>Live</span>
              </div>
            </div>
            <p className="font-medium text-[#64748B] text-[14px] my-2">Total Registration</p>
            <h2 className="font-bold text-[24px] mb-2">{stats.total_registration || 0}</h2>
            <span className="text-[#10B981] text-xs font-medium flex items-center gap-1">
              Students registered
            </span>
          </div>

          {/* Card 2: Class Reps */}
          <div className="bg-white border-[#F1F5F9] flex-1 px-6 py-4 rounded-3xl flex flex-col justify-between shadow-sm">
            <div className="flex justify-between items-center">
              <div className="bg-[#E8F3E6] w-12 h-12 rounded-xl flex items-center justify-center">
                <img src={Wallet} alt="Icon" />
              </div>
              <div className="bg-[#F1F5F9] flex justify-center px-2 py-1.5 text-xs text-[#64748B] font-bold rounded-lg">
                <span>Active</span>
              </div>
            </div>
            <p className="font-medium text-[#64748B] text-[14px] my-2">Class Representatives</p>
            <h2 className="font-bold text-[24px] mb-2">{stats.class_representatives || 0}</h2>
            <span className="text-[#94A3B8] text-xs font-medium flex items-center gap-1">
              Across all levels
            </span>
          </div>

          {/* Card 3: Pending Approvals */}
          <div className="bg-white border-[#F1F5F9] flex-1 px-6 py-4 rounded-3xl flex flex-col justify-between shadow-sm">
            <div className="flex justify-between items-center">
              <div className="bg-[#FFF7ED] w-12 h-12 rounded-xl flex items-center justify-center">
                <img src={Date} alt="Icon" />
              </div>
              <div className="bg-[#F0FDF4] flex justify-center px-2 py-1 text-xs text-[#16A34A] font-bold rounded-full">
                <span>Action Needed</span>
              </div>
            </div>
            <p className="font-medium text-[#64748B] text-[14px] my-2">Pending Approvals</p>
            <h2 className="font-bold text-[24px] mb-2">{stats.pending_approvals || 0}</h2>
            <div className="flex justify-between text-xs font-medium text-[#64748B]">
              <span>Review requests</span>
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
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name or matric no"
                  className="pl-10 pr-4 py-2 border border-[#E5E7EB] rounded-md font-medium text-sm focus:outline-none focus:ring-2 focus:ring-green-500 w-full md:w-70"
                />
              </div>
              <button className="flex justify-center items-center gap-2 px-4 py-2 border border-[#E5E7EB] rounded-md text-sm font-medium w-full md:w-auto">
                <img src={Filter} alt="filter" className="w-3.5 h-3.5" /> Filter
              </button>
            </div>
            <div className="flex items-center justify-between w-full md:w-auto gap-4">
              <span className="text-sm text-[#374151]">{selectedCount} selected</span>
              <button
                className={`bg-[#F3F4F6] text-[#374151] px-4 py-2 rounded-md text-sm font-medium transition ${selectedCount === 0 ? " opacity-50 cursor-not-allowed" : " hover:bg-gray-200 cursor-pointer"}`}
                disabled={selectedCount === 0}
              >
                Bulk Approve
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-200">
              <thead>
                <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB] text-xs text-[#6B7280] font-semibold">
                  <th className="p-4 w-10">
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
                {filteredUsers.length > 0 ? filteredUsers.map((user) => (
                  <tr key={user.id} className={`border-b border-gray-50 hover:bg-gray-50 transition ${user.selected ? "bg-green-50" : ""}`}>
                    <td className="p-4">
                      <input
                        type="checkbox"
                        checked={user.selected}
                        onChange={() => toggleSelectUser(user.id)}
                        className="rounded border-gray-300 text-green-600 focus:ring-green-500 cursor-pointer w-4 h-4"
                      />
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${user.avatarColor}`}>
                          {user.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                        </div>
                        <div>
                          <p className="font-medium text-[14px] text-black">{user.name}</p>
                          <p className="text-[#64748B] text-[14px] font-medium">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4 text-[#64748B] text-[14px]">{user.matric}</td>
                    <td className="p-4 text-[#64748B] text-[14px]">{user.level}</td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-[12px] font-semibold ${user.role === "Admin" ? "bg-purple-100 text-purple-800" : "bg-gray-100 text-gray-600"}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className="p-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${user.status === "Active" ? "bg-[#DCFCE7] text-[#166534]" : "bg-yellow-100 text-yellow-800"}`}>
                        {user.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3 text-gray-400">
                        {user.status === "Pending" ? (
                          <>
                            <button title="Approve" onClick={() => handleAction('Approve', user.id)} className="hover:scale-110 transition">
                              <img src={MarkDone} alt="Approve" className="w-4 h-4" />
                            </button>
                            <button title="Reject" onClick={() => handleAction('Reject', user.id)} className="hover:scale-110 transition">
                              <img src={Reject} alt="Reject" className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <button title="View" className="hover:text-green-600">
                            <img src={View} alt="View" className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="7" className="p-8 text-center text-gray-500">
                      No students found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* PAGINATION */}
          <div className="p-4 flex flex-col md:flex-row justify-between items-center border-t border-[#E5E7EB] text-sm text-[#6B7280]">
            <p className="font-medium text-[13px]">
              Page {currentPage} of {totalPages}
            </p>
            <div className="flex items-center gap-2 mt-2 md:mt-0">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-3 py-1 border rounded ${currentPage === 1 ? "opacity-50" : "hover:bg-gray-100"}`}
              >
                Previous
              </button>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages} // Assuming infinite scroll if pages unknown
                className="px-3 py-1 border rounded hover:bg-gray-100"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* --- RECENT LOGS SECTION (If API returns empty, this handles it) -- */}
        <div className="bg-white rounded-3xl shadow border border-[#E5E7EB] mb-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 px-6 pt-6 gap-4">
            <h2 className="text-[18px] font-bold text-[#0F172A] flex items-center gap-2">
              <img src={Recent} alt="icon" className="w-5 h-5" />
              Recent User Management Logs
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-200">
              <thead className="bg-brand-secondary">
                <tr className="text-xs font-medium text-[#64748B] border-b border-[#F1F5F9]">
                  <th className="py-3 pl-6">ACTIVITY</th>
                  <th className="py-3 px-4">DATE/TIME</th>
                  <th className="py-3 px-4">STATUS</th>
                </tr>
              </thead>
              <tbody className="text-[14px]">
                {logs.length > 0 ? logs.map((log) => (
                  <tr key={log.id} className="border-b border-[#F1F5F9]">
                    <td className="py-4 pl-6 font-medium text-[#0F172A]">{log.activity || "System Action"}</td>
                    <td className="py-4 px-4 text-[#64748B]">{log.created_at || "N/A"}</td>
                    <td className="py-4 px-4"><span className="bg-gray-100 px-2 py-1 rounded-full text-xs">Logged</span></td>
                  </tr>
                )) : (
                  <tr><td colSpan="3" className="p-6 text-center text-gray-500">No recent logs found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagement;