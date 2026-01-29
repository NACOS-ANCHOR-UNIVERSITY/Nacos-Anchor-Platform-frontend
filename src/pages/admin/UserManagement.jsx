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
import { toast } from "sonner";

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
    const token = localStorage.getItem("ACCESS_TOKEN");

    if (!token) {
      window.location.href = "/login";
      return;
    }

    const headers = {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    try {
      const statsRes = await fetch("/api/proxy/admin/users/dashboard", {
        headers,
      });

      if (statsRes.status === 401) {
        localStorage.clear();
        toast.error("Session expired. Please login again.");
        window.location.href = "/login";
        return;
      }

      const statsData = await statsRes.json();
      if (statsData.status === "success") setStats(statsData.data);

      const usersRes = await fetch(
        `/api/proxy/admin/users/list?page=${currentPage}&limit=${itemsPerPage}`,
        { headers },
      );
      const usersData = await usersRes.json();

      if (usersData.status === "success") {
        const mappedUsers = usersData.data.map((user) => ({
          id: user.id,
          name: user.name,
          email: user.email,
          matric: user.matric_no || "N/A",
          level: user.level || "N/A",
          role: user.role || "Student",
          status: user.status || "Pending",
          avatarColor: getAvatarColor(user.name),
          selected: false,
        }));
        setUsers(mappedUsers);
        setTotalPages(usersData.total_pages || 1);
      }

      const logsRes = await fetch(`/api/proxy/admin/users/logs?limit=10`, {
        headers,
      });
      const logsData = await logsRes.json();
      if (logsData.status === "success") setLogs(logsData.data);
    } catch (error) {
      console.error("Fetch Error:", error);
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
    setUsers(
      users.map((user) =>
        user.id === id ? { ...user, selected: !user.selected } : user,
      ),
    );
  };

  const toggleSelectAll = () => {
    const isAllSelected = users.every((user) => user.selected);
    setUsers(users.map((user) => ({ ...user, selected: !isAllSelected })));
  };

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.matric.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const selectedCount = users.filter((u) => u.selected).length;
  const isHeaderCheckboxChecked =
    users.length > 0 && users.every((user) => user.selected);

  const bulkApprover = () => {
    setUsers(
      users.map((user) =>
        user.selected ? { ...user, status: "Active" } : user,
      ),
    );
  };

  if (loading && users.length === 0) {
    return (
      <div className="p-10 text-center animate-pulse">
        Loading Dashboard Data...
      </div>
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
        <div className="flex flex-col min-[900px]:flex-row gap-4 w-full">
          <div className="bg-white border-[#F1F5F9] flex-1 px-6 py-4 rounded-3xl shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <div className="bg-[#E8F3E6] w-12 h-12 rounded-xl flex items-center justify-center">
                <img src={People} />
              </div>
              <span className="bg-green-100 text-green-700 px-2 py-1 text-xs font-bold rounded-full">
                Live
              </span>
            </div>
            <p className="text-gray-500 text-sm">Total Registration</p>
            <h2 className="font-bold text-2xl">{stats.total_registration}</h2>
          </div>

          <div className="bg-white border-[#F1F5F9] flex-1 px-6 py-4 rounded-3xl shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <div className="bg-[#E8F3E6] w-12 h-12 rounded-xl flex items-center justify-center">
                <img src={Wallet} />
              </div>
              <span className="bg-gray-100 text-gray-600 px-2 py-1 text-xs font-bold rounded-lg">
                Active
              </span>
            </div>
            <p className="text-gray-500 text-sm">Class Representatives</p>
            <h2 className="font-bold text-2xl">
              {stats.class_representatives}
            </h2>
          </div>

          <div className="bg-white border-[#F1F5F9] flex-1 px-6 py-4 rounded-3xl shadow-sm">
            <div className="flex justify-between items-center mb-2">
              <div className="bg-[#FFF7ED] w-12 h-12 rounded-xl flex items-center justify-center">
                <img src={Date} />
              </div>
              <span className="bg-orange-100 text-orange-700 px-2 py-1 text-xs font-bold rounded-full">
                Action Needed
              </span>
            </div>
            <p className="text-gray-500 text-sm">Pending Approvals</p>
            <h2 className="font-bold text-2xl">{stats.pending_approvals}</h2>
          </div>
        </div>

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
                <img src={Filter} alt="filter" className="w-3.5 h-3.5" /> Filter
                by Level
              </button>
            </div>
            <div className="flex items-center justify-between w-full md:w-auto gap-4">
              <span className="text-sm text-[#374151]">
                {selectedCount} selected
              </span>
              <button
                className={`bg-[#F3F4F6] text-[#374151] px-4 py-2 rounded-md text-sm font-medium transition ${selectedCount === 0 ? " opacity-50 cursor-not-allowed" : " hover:bg-gray-200 cursor-pointer"}`}
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
                      <td className="p-4 flex items-center gap-3">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${user.avatarColor}`}
                        >
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">
                            {user.name}
                          </p>
                          <p className="text-gray-500 text-xs">{user.email}</p>
                        </div>
                      </td>
                      <td className="p-4 text-gray-500">{user.matric}</td>
                      <td className="p-4 text-gray-500">{user.level}</td>
                      <td className="p-4">
                        <span className="bg-gray-100 px-2 py-1 rounded text-xs">
                          {user.role}
                        </span>
                      </td>
                      <td className="p-4">
                        <span
                          className={`px-2 py-1 rounded text-xs font-bold ${user.status === "Active" ? "bg-green-100 text-green-700" : "bg-yellow-100 text-yellow-700"}`}
                        >
                          {user.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="p-8 text-center text-gray-500">
                      No students found.
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
      </div>
    </div>
  );
};

export default UserManagement;
