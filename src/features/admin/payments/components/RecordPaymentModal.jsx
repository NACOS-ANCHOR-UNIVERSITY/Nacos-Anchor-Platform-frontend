import React, { useState, useRef } from "react";
import { X, Upload, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";

export default function RecordPaymentModal({ isOpen, onClose, userId, }) {
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [uploadingReceipt, setUploadingReceipt] = useState(false);
  const [formData, setFormData] = useState({
    user_id: userId || "",
    description: "Departmental Dues",
    amount: "",
    status: "Successful",
    datePaid: new Date().toISOString().split("T")[0],
    receipt: null,
  });

  if (!isOpen) return null;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const token = JSON.parse(localStorage.getItem("nacos-auth-storage"))?.state.token;


  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png", "application/pdf"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Only JPG, PNG, or PDF files are allowed");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }

    setUploadingReceipt(true);
    try {
      setFormData((prev) => ({ ...prev, receipt: file }));
      toast.success("Receipt selected successfully");
    } catch (err) {
      console.error("Error selecting receipt:", err);
      toast.error("Failed to select receipt");
    } finally {
      setUploadingReceipt(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("user_id", formData.user_id);
      data.append("description", formData.description);
      data.append("amount", formData.amount);
      data.append("status", formData.status);
      data.append("date_paid", formData.datePaid);
      if (formData.receipt) data.append("receipt", formData.receipt);

      const response = await fetch("https://nacos.nextgenerationones.org/api/admin/finance/record-payment", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` }, // DO NOT set Content-Type for FormData
        body: data,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to record payment.");
      }

      toast.success("Payment recorded successfully!");
      onClose();
      window.location.reload();
    } catch (error) {
      console.error(error);
      toast.error(error.message || "Failed to record payment.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="text-slate-900 font-bold text-lg">Record Manual Payment</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-red-500 transition-colors p-1">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto flex-1">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* User ID */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase">Student ID</label>
              <input name="user_id" value={formData.user_id} onChange={handleChange} placeholder="User ID" className="w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500/20 outline-none text-sm" required />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase">Description</label>
              <select name="description" value={formData.description} onChange={handleChange} className="w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500/20 outline-none text-sm bg-white">
                <option>Departmental Dues</option>
                <option>T-Shirt Fee</option>
                <option>Dinner Fee</option>
                <option>Other</option>
              </select>
            </div>

            {/* Amount */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase">Amount (₦)</label>
              <input type="number" name="amount" value={formData.amount} onChange={handleChange} placeholder="0.00" className="w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500/20 outline-none text-sm" required />
            </div>

            {/* Status */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase">Status</label>
              <select name="status" value={formData.status} onChange={handleChange} className="w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500/20 outline-none text-sm bg-white">
                <option>Successful</option>
                <option>Pending</option>
                <option>Failed</option>
              </select>
            </div>

            {/* Date Paid */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase">Date Paid</label>
              <input type="date" name="datePaid" value={formData.datePaid} onChange={handleChange} className="w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500/20 outline-none text-sm" required />
            </div>

            {/* Receipt Upload */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase">Upload Receipt Proof</label>
              <div onClick={() => fileInputRef.current?.click()} className="border border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-center bg-slate-50/50 hover:bg-slate-100 transition-colors cursor-pointer group">
                <input id="receipt-input" type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} accept="image/*,.pdf" />
                <div className="bg-white p-2.5 rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform">
                  <Upload className="size-5 text-green-600" />
                </div>
                <p className="text-sm font-semibold text-slate-700">{formData.receipt ? formData.receipt.name : "Click to upload receipt"}</p>
                <p className="text-xs text-slate-400 mt-1">JPG, PNG or PDF (Max 5MB)</p>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 flex justify-end gap-3 bg-white">
          <button type="button" onClick={onClose} className="px-5 py-2.5 text-slate-500 font-bold text-sm hover:bg-slate-100 rounded-xl transition-colors" disabled={loading}>Cancel</button>
          <button type="button" onClick={handleSubmit} disabled={loading || uploadingReceipt} className="px-6 py-2.5 bg-[#138601] text-white rounded-xl font-bold text-sm hover:bg-[#0e6001] flex items-center gap-2 shadow-lg shadow-green-100 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed">
            {loading ? <><Loader2 className="size-4 animate-spin" /> Saving...</> : <><Save className="size-4" /> Record Payment</>}
          </button>
        </div>
      </div>
    </div>
  );
}