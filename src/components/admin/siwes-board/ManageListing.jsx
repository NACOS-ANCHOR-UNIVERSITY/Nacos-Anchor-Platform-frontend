import React, { useState } from "react";
import { toast } from "sonner";
import { PencilIcon, TrashIcon } from "@/assets/icons";
import { X, AlertTriangle } from "lucide-react";
import Spinner from "@/components/ui/Spinner";
import Skeleton from "@/components/ui/Skeleton";
import {
  deleteSiwesOpportunity,
  updateSiwesOpportunity,
} from "@/services/adminSiwesService";

const ManageListings = ({ listings = [], loading, onSuccess }) => {
  const [activeTab, setActiveTab] = useState("active");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null); // 'edit' or 'delete'
  const [selectedItem, setSelectedItem] = useState(null);
  const [actionLoading, setActionLoading] = useState(false);

  const [editForm, setEditForm] = useState({
    company_name: "",
    role_title: "",
    location: "",
    duration: "",
    requirements: "",
  });

  const handleActionClick = (type, item) => {
    setModalType(type);
    setSelectedItem(item);
    if (type === "edit") {
      setEditForm({
        id: item.id,
        company_name: item.company_name,
        role_title: item.role_title,
        location: item.location,
        duration: item.duration,
        requirements: item.requirements || "",
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
    setModalType(null);
  };

  const handleDelete = async () => {
    if (!selectedItem) return;
    setActionLoading(true);
    try {
      await deleteSiwesOpportunity(selectedItem.id);
      toast.success("Opportunity deleted successfully!");
      if (onSuccess) onSuccess();
      closeModal();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to delete opportunity.",
      );
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setActionLoading(true);
    try {
      await updateSiwesOpportunity(editForm);
      toast.success("Opportunity updated successfully!");
      if (onSuccess) onSuccess();
      closeModal();
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Failed to update opportunity.",
      );
    } finally {
      setActionLoading(false);
    }
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.id]: e.target.value });
  };

  return (
    <>
      <div className="rounded-3xl drop-shadow-sm border border-[#F1F5F9] bg-white">
        {/* Header */}
        <div className="bg-white border-b border-[#F1F5F9] px-6 py-5 rounded-t-3xl flex items-center justify-between">
          <p className="text-[#0F172A] font-bold text-lg">Manage Listings</p>

          <div className="flex items-center gap-4 text-sm font-medium">
            <button
              onClick={() => setActiveTab("active")}
              className={`pb-1 transition-all duration-200 ${
                activeTab === "active"
                  ? "border-b-2 border-[#138601] text-[#138601]"
                  : "border-b-2 border-transparent text-[#64748B] hover:text-[#0F172A]"
              }`}
            >
              Active (12)
            </button>
            <button
              onClick={() => setActiveTab("archived")}
              className={`pb-1 transition-all duration-200 ${
                activeTab === "archived"
                  ? "border-b-2 border-[#138601] text-[#138601]"
                  : "border-b-2 border-transparent text-[#64748B] hover:text-[#0F172A]"
              }`}
            >
              Archived
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-[#F8FAFC] text-[#64748B] text-xs font-medium uppercase tracking-wide border-b border-[#F1F5F9]">
                <th className="px-6 py-4 font-semibold">Role / Company</th>
                <th className="px-6 py-4 font-semibold">Posted</th>
                <th className="px-6 py-4 font-semibold">Location</th>
                <th className="px-6 py-4 font-semibold text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {loading ? (
                Array.from({ length: 3 }).map((_, i) => (
                  <tr key={i}>
                    <td className="px-6 py-4">
                      <Skeleton className="h-5 w-32 mb-2" />
                      <Skeleton className="h-4 w-20" />
                    </td>
                    <td className="px-6 py-4">
                      <Skeleton className="h-4 w-20" />
                    </td>
                    <td className="px-6 py-4">
                      <Skeleton className="h-4 w-20" />
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Spinner size={20} />
                    </td>
                  </tr>
                ))
              ) : listings.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-8">
                    No listings found.
                  </td>
                </tr>
              ) : (
                listings.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50/50 transition-colors duration-150"
                  >
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-[#0F172A] font-bold text-sm">
                          {item.role_title}
                        </span>
                        <span className="text-[#64748B] text-xs">
                          {item.company_name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-[#475569] text-sm">
                      {item.formatted_date || item.posted_at}
                    </td>
                    <td className="px-6 py-4 text-[#475569] text-sm">
                      {item.location}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleActionClick("edit", item)}
                          className="size-7.5 flex items-center justify-center rounded-md bg-[#F1F5F9] text-[#94A3B8] hover:text-[#138601] hover:bg-[#e6f5e3] transition-colors cursor-pointer"
                        >
                          <PencilIcon className="size-4.5" />
                        </button>
                        <button
                          onClick={() => handleActionClick("delete", item)}
                          className="size-7.5 flex items-center justify-center rounded-md bg-[#F1F5F9] text-[#94A3B8] hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                        >
                          <TrashIcon className="size-4.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-[#F1F5F9] bg-white rounded-b-3xl flex justify-center">
          <button
            type="button"
            className="text-[#64748B] uppercase text-xs font-medium tracking-wider hover:text-[#0F172A] transition-colors duration-150 cursor-pointer"
          >
            View All Listings
          </button>
        </div>
      </div>

      {/* modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 transition-all">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {/* Modal Header */}
            <div className="px-6 py-4 border-b border-[#F1F5F9] flex items-center justify-between bg-[#F8FAFC]">
              <h3 className="text-[#0F172A] font-bold text-lg">
                {modalType === "edit"
                  ? "Edit Opportunity"
                  : "Delete Opportunity"}
              </h3>
              <button
                onClick={closeModal}
                className="text-[#64748B] hover:text-red-500 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6">
              {modalType === "delete" ? (
                <div className="flex flex-col items-center text-center gap-4">
                  <div className="size-14 bg-red-50 rounded-full flex items-center justify-center text-red-500">
                    <AlertTriangle size={28} />
                  </div>
                  <div>
                    <p className="text-[#0F172A] font-bold text-lg">
                      Are you sure?
                    </p>
                    <p className="text-[#64748B] text-sm mt-1">
                      This will permanently remove the{" "}
                      <span className="font-bold text-black">
                        {selectedItem?.role_title}
                      </span>{" "}
                      listing. This action cannot be undone.
                    </p>
                  </div>
                  <div className="flex gap-3 w-full mt-2">
                    <button
                      onClick={closeModal}
                      className="flex-1 py-2.5 border border-[#E2E8F0] rounded-xl text-[#64748B] font-bold text-sm hover:bg-gray-50"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleDelete}
                      disabled={actionLoading}
                      className="flex-1 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl font-bold text-sm shadow-md shadow-red-200 flex justify-center items-center gap-2"
                    >
                      {actionLoading ? (
                        <Spinner className="size-4 text-white" />
                      ) : (
                        "Delete Opportunity"
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                /* Edit Form */
                <form onSubmit={handleUpdate} className="flex flex-col gap-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-[#64748B] uppercase">
                        Company
                      </label>
                      <input
                        id="company_name"
                        value={editForm.company_name}
                        onChange={handleEditChange}
                        className="w-full px-3 py-2 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#138601] outline-none text-sm"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-[#64748B] uppercase">
                        Role
                      </label>
                      <input
                        id="role_title"
                        value={editForm.role_title}
                        onChange={handleEditChange}
                        className="w-full px-3 py-2 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#138601] outline-none text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-[#64748B] uppercase">
                        Location
                      </label>
                      <input
                        id="location"
                        value={editForm.location}
                        onChange={handleEditChange}
                        className="w-full px-3 py-2 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#138601] outline-none text-sm"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="text-xs font-bold text-[#64748B] uppercase">
                        Duration
                      </label>
                      <select
                        id="duration"
                        value={editForm.duration}
                        onChange={handleEditChange}
                        className="w-full px-3 py-2 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#138601] outline-none text-sm bg-white"
                      >
                        <option value="3 months">3 months</option>
                        <option value="6 months">6 months</option>
                        <option value="1 Year">1 Year</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="text-xs font-bold text-[#64748B] uppercase">
                      Requirements
                    </label>
                    <textarea
                      id="requirements"
                      rows="3"
                      value={editForm.requirements}
                      onChange={handleEditChange}
                      className="w-full px-3 py-2 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#138601] outline-none text-sm resize-none"
                    ></textarea>
                  </div>

                  <div className="pt-2 flex gap-3 justify-end">
                    <button
                      type="button"
                      onClick={closeModal}
                      className="px-4 py-2 text-[#64748B] font-bold text-sm hover:text-black"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={actionLoading}
                      className="px-6 py-2 bg-[#138601] text-white rounded-xl font-bold text-sm hover:bg-[#138601]/90 flex items-center gap-2"
                    >
                      {actionLoading ? (
                        <Spinner className="size-4 text-white" />
                      ) : (
                        "Save Changes"
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ManageListings;

