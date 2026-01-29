import React, { useState, useRef } from "react";
import { X, Upload, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import client from "../../../../config/axios-client"; // Import axios client

export default function RecordPaymentModal({ isOpen, onClose }) {
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    matricNo: "",
    name: "",
    amount: "",
    type: "Departmental Dues",
    reference: "",
    receipt: null,
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({ ...formData, receipt: e.target.files[0] });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const data = new FormData();
      data.append("matric_no", formData.matricNo);
      data.append("amount", formData.amount);
      data.append("type", formData.type);
      data.append("reference", formData.reference);

      if (formData.receipt) {
        data.append("receipt", formData.receipt);
      }

      await client.post("/admin/record-payments", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Payment recorded successfully!");
      onClose();
      // Trigger a refresh if needed (e.g. reload or query invalidation)
      window.location.reload();
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || "Failed to record payment.";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <h3 className="text-slate-900 font-bold text-lg">
            Record Manual Payment
          </h3>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-red-500 transition-colors p-1"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Student Matric */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase">
                Student Matric No
              </label>
              <input
                name="matricNo"
                value={formData.matricNo}
                onChange={handleChange}
                placeholder="e.g. 19/1234"
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500/20 outline-none text-sm"
                required
              />
            </div>

            {/* Payment Type */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">
                  Payment Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500/20 outline-none text-sm bg-white"
                >
                  <option>Departmental Dues</option>
                  <option>T-Shirt Fee</option>
                  <option>Dinner Fee</option>
                  <option>Other</option>
                </select>
              </div>

              {/* Amount */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">
                  Amount (₦)
                </label>
                <input
                  type="number"
                  name="amount"
                  value={formData.amount}
                  onChange={handleChange}
                  placeholder="0.00"
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500/20 outline-none text-sm"
                  required
                />
              </div>
            </div>

            {/* Reference */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase">
                Reference / Receipt No (Optional)
              </label>
              <input
                name="reference"
                value={formData.reference}
                onChange={handleChange}
                placeholder="e.g. REF-123456"
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500/20 outline-none text-sm"
              />
            </div>

            {/* Receipt Upload */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase">
                Upload Receipt Proof
              </label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-center bg-slate-50/50 hover:bg-slate-100 transition-colors cursor-pointer group"
              >
                <input
                  type="file"
                  ref={fileInputRef}
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*,.pdf"
                />
                <div className="bg-white p-2.5 rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform">
                  <Upload className="size-5 text-green-600" />
                </div>
                <p className="text-sm font-semibold text-slate-700">
                  {formData.receipt
                    ? formData.receipt.name
                    : "Click to upload receipt"}
                </p>
                <p className="text-xs text-slate-400 mt-1">
                  JPG, PNG or PDF (Max 5MB)
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="pt-4 flex gap-3 justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 text-slate-500 font-bold text-sm hover:bg-slate-100 rounded-xl transition-colors"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2.5 bg-[#138601] text-white rounded-xl font-bold text-sm hover:bg-[#0e6001] flex items-center gap-2 shadow-lg shadow-green-100 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <Save className="size-4" />
                    Record Payment
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
