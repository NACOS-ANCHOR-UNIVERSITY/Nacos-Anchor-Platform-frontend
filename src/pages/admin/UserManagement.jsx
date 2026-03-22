import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import {
  Users,
  ArrowUp,
  TrendingUp,
  Wallet,
  Calendar,
  CheckCircle,
  XCircle,
  Eye,
  Pencil,
  Clock,
  Filter,
} from "lucide-react";

const BASE_URL = "https://nacos.nextgenerationones.org/api";

const getAvatarColor = (name) => {
  const colors = [
    "bg-blue-100 text-blue-600",
    "bg-pink-100 text-pink-600",
    "bg-yellow-100 text-yellow-600",
    "bg-green-100 text-green-600",
  ];
  return colors[name.length % colors.length];
};

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [logs, setLogs] = useState([]);
  const [stats, setStats] = useState({
    total_registration: 0,
    class_representatives: 0,
    pending_approvals: 0,
  });

  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [itemsPerPage] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchAllData = async () => {
    setLoading(true);

    // 1. Get Token & User Info
    const authStorage = JSON.parse(localStorage.getItem("nacos-auth-storage"));
    const token = authStorage?.state?.token;
    const user = authStorage?.state?.user;

    // 2. Guard: no token → redirect to login
    if (!token) {
      window.location.href = "/login";
      return;
    }

    // 3. Client-Side Role Check
    if (user?.role !== "admin") {
      toast.error("Access Denied: You need Admin privileges.");
      setLoading(false);
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    try {
      // --- Stats ---
      const statsRes = await fetch(`${BASE_URL}/admin/users/dashboard`, { headers });

      if (statsRes.status === 401) {
        localStorage.clear();
        window.location.href = "/login";
        return;
      }

      if (statsRes.status === 403) {
        toast.error("You are not authorized to view this data.");
        setLoading(false);
        return;
      }

      const statsData = await statsRes.json();
      if (statsData.status === "success") setStats(statsData.data);

      // --- Users List ---
      const usersRes = await fetch(
        `${BASE_URL}/admin/users/list?page=${currentPage}&limit=${itemsPerPage}`,
        { headers }
      );

      if (!usersRes.ok) throw new Error(`Users list failed: ${usersRes.status}`);

      const usersData = await usersRes.json();

      if (usersData.status === "success") {
        const mappedUsers = usersData.data.map((u) => ({
          id: u.id,
          name: u.name,
          email: u.email,
          matric: u.matric_no || "N/A",
          level: u.level || "N/A",
          role: u.role || "Student",
          status: u.status || "Pending",
          avatarColor: getAvatarColor(u.name),
          selected: false,
        }));
        setUsers(mappedUsers);
        setTotalPages(usersData.total_pages || 1);
      }

      // --- Logs ---
      const logsRes = await fetch(`${BASE_URL}/admin/users/logs?limit=10`, { headers });

      if (!logsRes.ok) throw new Error(`Logs fetch failed: ${logsRes.status}`);

      const logsData = await logsRes.json();
      if (logsData.status === "success") setLogs(logsData.data);

    } catch (error) {
      console.error("Fetch Error:", error);
      toast.error("Failed to load data. Check your connection.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, [currentPage]);

  const paginate = (pageNumber) => {
    if (pageNumber > 0 && pageNumber <= totalPages) setCurrentPage(pageNumber);
  };

  const toggleSelectUser = (id) => {
    setUsers(users.map((u) => (u.id === id ? { ...u, selected: !u.selected } : u)));
  };

  const toggleSelectAll = () => {
    const isAllSelected = users.every((u) => u.selected);
    setUsers(users.map((u) => ({ ...u, selected: !isAllSelected })));
  };

  const filteredUsers = users.filter(
    (u) =>
      u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      u.matric.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedCount = users.filter((u) => u.selected).length;
  const isHeaderCheckboxChecked = users.length > 0 && users.every((u) => u.selected);

  const recentLogs = logs.map((log) => ({
    ...log,
    statusColor:
      log.status === "Success"
        ? "bg-green-100 text-green-700"
        : "bg-amber-100 text-amber-700",
    actionColor: "text-[#138601]",
    action: "View Details",
  }));

  const bulkApprover = () => {
    setUsers(users.map((u) => (u.selected ? { ...u, status: "Active" } : u)));
  };

  const approveUser = async (id) => {
    const authStorage = JSON.parse(localStorage.getItem("nacos-auth-storage"));
    const token = authStorage?.state?.token;

    try {
      // Optimistic update
      setUsers(users.map((u) => (u.id === id ? { ...u, status: "Active" } : u)));
      toast.success("User approved");

      // Uncomment when the approve endpoint is known:
      // await fetch(`${BASE_URL}/admin/users/${id}/approve`, {
      //   method: "POST",
      //   headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      // });
    } catch (error) {
      toast.error("Failed to approve user");
      fetchAllData(); // revert on failure
    }
  };

  const rejectUser = async (id) => {
    const authStorage = JSON.parse(localStorage.getItem("nacos-auth-storage"));
    const token = authStorage?.state?.token;

    try {
      // Optimistic update
      setUsers(users.map((u) => (u.id === id ? { ...u, status: "Rejected" } : u)));
      toast.success("User rejected");

      // Uncomment when the reject endpoint is known:
      // await fetch(`${BASE_URL}/admin/users/${id}/reject`, {
      //   method: "POST",
      //   headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
      // });
    } catch (error) {
      toast.error("Failed to reject user");
      fetchAllData(); // revert on failure
    }
  };

  if (loading && users.length === 0) {
    return (
      <div className="p-10 text-center animate-pulse">Loading Dashboard Data...</div>
    );
  }

  return (
    <div>
      <div className="flex items-end justify-between mb-8">
        <div>
          <h1 className="text-[20px] md:text-[30px] font-bold text-[#0F172A]">
            User Management
          </h1>
          <p className="text-[#64748B] text-[14px] md:text-[16px]">
            Manage student profiles, verify accounts
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {/* STATS CARDS */}
        <div className="flex flex-col min-[900px]:flex-row gap-4 w-full">
          <div className="bg-white border-[#F1F5F9] flex-1 px-6 py-4 rounded-3xl shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <div className="bg-[#E8F3E6] w-12 h-12 rounded-xl flex items-center justify-center">
                <Users className="w-6 h-6 text-[#138601]" />
              </div>
              <div className="bg-[#F0FDF4] flex justify-center px-2 py-1 text-xs text-[#16A34A] font-bold rounded-full">
                <TrendingUp className="w-3 h-3" />
                <span>+12%</span>
              </div>
              <span className="bg-green-100 text-green-700 px-2 py-1 text-xs font-bold rounded-full">
                Live
              </span>
            </div>
            <p className="font-medium text-[#64748B] text-[14px] my-2">Total Registration</p>
            <h2 className="font-bold text-[24px] mb-2">{stats.total_registration || 0}</h2>
            <span className="text-[#10B981] text-xs font-medium flex items-center gap-1">
              <ArrowUp className="w-3 h-3" />
              +12% vs last sem
            </span>
          </div>

          <div className="bg-white border-[#F1F5F9] flex-1 px-6 py-4 rounded-3xl shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <div className="bg-[#E8F3E6] w-12 h-12 rounded-xl flex items-center justify-center">
                <Wallet className="w-6 h-6 text-[#138601]" />
              </div>
              <div className="bg-[#F1F5F9] flex justify-center px-2 py-1.5 text-xs text-[#64748B] font-bold rounded-lg">
                <span>This Session</span>
              </div>
              <span className="bg-gray-100 text-gray-600 px-2 py-1 text-xs font-bold rounded-lg">
                Active
              </span>
            </div>
            <p className="text-gray-500 text-sm">Class Representatives</p>
            <h2 className="font-bold text-2xl">{stats.class_representatives || 0}</h2>
          </div>

          <div className="bg-white border-[#F1F5F9] flex-1 px-6 py-4 rounded-3xl shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <div className="bg-[#FFF7ED] w-12 h-12 rounded-xl flex items-center justify-center">
                <Calendar className="w-6 h-6 text-[#EA580C]" />
              </div>
              <div className="bg-[#F0FDF4] flex justify-center px-2 py-1 text-xs text-[#16A34A] font-bold rounded-full">
                <TrendingUp className="w-3 h-3" />
                <span>+12%</span>
              </div>
              <span className="bg-orange-100 text-orange-700 px-2 py-1 text-xs font-bold rounded-full">
                Action Needed
              </span>
            </div>
            <p className="text-gray-500 text-sm">Pending Approvals</p>
            <h2 className="font-bold text-2xl">{stats.pending_approvals || 0}</h2>
          </div>
        </div>

        {/* TABLE SECTION */}
        <div className="bg-white rounded-3xl shadow border border-[#E5E7EB]">
          <div className="p-4 flex flex-col md:flex-row justify-between items-center gap-4 border-b border-[#E5E7EB]">
            <div className="flex flex-col md:flex-row items-center gap-3 w-full md:w-auto text-[#64748B]">
              <input
                type="search"
                placeholder="Search students..."
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-4 pr-4 py-2 border rounded-md text-sm w-full md:w-64"
              />
              <button className="flex justify-center items-center gap-2 px-4 py-2 border border-[#E5E7EB] rounded-md text-sm font-medium w-full md:w-auto">
                <Filter className="w-3.5 h-3.5" /> Filter by Level
              </button>
            </div>
            <div className="flex items-center justify-between w-full md:w-auto gap-4">
              <span className="text-sm text-[#374151]">{selectedCount} selected</span>
              <button
                className={`bg-[#F3F4F6] text-[#374151] px-4 py-2 rounded-md text-sm font-medium transition ${
                  selectedCount === 0
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-gray-200 cursor-pointer"
                }`}
                onClick={bulkApprover}
                disabled={selectedCount === 0}
              >
                Bulk Approve
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left min-w-200">
              <thead>
                <tr className="border-b bg-gray-50 text-xs text-gray-500 font-semibold">
                  <th className="p-4 w-10">
                    <input
                      type="checkbox"
                      checked={isHeaderCheckboxChecked}
                      onChange={toggleSelectAll}
                      className="w-4 h-4"
                    />
                  </th>
                  <th className="p-4">Name</th>
                  <th className="p-4">Matric No</th>
                  <th className="p-4">Level</th>
                  <th className="p-4">Role</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">
                        <input
                          type="checkbox"
                          checked={user.selected}
                          onChange={() => toggleSelectUser(user.id)}
                          className="w-4 h-4"
                        />
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${user.avatarColor}`}
                          >
                            {user.name.charAt(0)}
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{user.name}</p>
                            <p className="text-gray-500 text-xs">{user.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4 text-[#64748B] text-[14px]">{user.matric}</td>
                      <td className="p-4 text-[#64748B] text-[14px]">{user.level}</td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-[12px] font-semibold ${
                            user.role === "Class Rep"
                              ? "bg-[#F3E8FF] text-[#6B21A8]"
                              : "bg-[#F3F4F6] text-[#4B5563]"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            user.status === "Active"
                              ? "bg-green-100 text-green-700"
                              : user.status === "Rejected"
                              ? "bg-red-100 text-red-700"
                              : "bg-amber-100 text-amber-700"
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
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              </button>
                              <button
                                title="Reject"
                                onClick={() => rejectUser(user.id)}
                                className="cursor-pointer"
                              >
                                <XCircle className="w-4 h-4 text-red-500" />
                              </button>
                            </>
                          ) : (
                            <>
                              <button title="View">
                                <Eye className="w-4 h-4" />
                              </button>
                              <button title="Edit">
                                <Pencil className="w-4 h-4" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="p-8 text-center text-gray-500">
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="p-4 flex justify-between items-center border-t text-sm">
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Prev
              </button>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-3 py-1 border rounded disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </div>

        {/* RECENT USER MANAGEMENT LOGS */}
        <div className="bg-white rounded-3xl shadow border border-[#E5E7EB] mb-10">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 px-6 pt-6 gap-4">
            <h2 className="text-[18px] font-bold text-[#0F172A] flex items-center gap-2">
              <Clock className="w-5 h-5" />
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
                {recentLogs.length > 0 ? (
                  recentLogs.map((log) => (
                    <tr
                      key={log.id}
                      className="border-b border-[#F1F5F9] last:border-0 hover:bg-gray-50 transition"
                    >
                      <td className="py-4 pl-6 font-medium text-[#0F172A]">{log.activity}</td>
                      <td className="py-4 px-4 text-[#64748B]">{log.admin}</td>
                      <td className="py-4 px-4 text-[#64748B]">{log.date}</td>
                      <td className="py-4 px-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${log.statusColor}`}>
                          {log.status}
                        </span>
                      </td>
                      <td className={`py-4 pr-6 text-right font-medium cursor-pointer ${log.actionColor}`}>
                        {log.action}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="p-8 text-center text-gray-500">
                      No logs available
                    </td>
                  </tr>
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