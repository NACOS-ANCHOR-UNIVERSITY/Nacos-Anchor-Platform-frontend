import React, { useState, useRef } from "react";
import { X, DollarSign, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import client from "../../../../config/axios-client";


export default function CreatePaymentModal({ isOpen, onClose }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    amount: "",
    type: "Compulsory",
    buttonText: "Pay Levy",
    statusBadge: "PENDING"
  });
  const token = JSON.parse(localStorage.getItem("nacos-auth-storage")).state.token
  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        amount: formData.amount,
        type: formData.type,
        button_text: formData.buttonText,
        status_badge: formData.statusBadge
      };

      await client.post("/admin/fees", payload, {
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },

      });

      toast.success("Payment created successfully! Students can now pay.");

      // Reset form
      setFormData({
        title: "",
        description: "",
        amount: "",
        type: "Compulsory",
      });

      onClose();
      // Trigger a refresh if needed (e.g. reload or query invalidation)
      window.location.reload();
    } catch (error) {
      console.error(error);
      const msg = error.response?.data?.message || "Failed to create payment.";
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
            Create Payment Fee
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
            {/* Payment Title */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase">
                Payment Title
              </label>
              <input
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="e.g. Departmental Dues 2024"
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500/20 outline-none text-sm"
                required
              />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase">
                Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="e.g. Annual departmental levy for the 2023/2024 academic session."
                rows={3}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500/20 outline-none text-sm resize-none"
                required
              />
            </div>

            {/* Amount and Type */}
            <div className="grid grid-cols-2 gap-4">
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
                  step="0.01"
                  min="0"
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500/20 outline-none text-sm"
                  required
                />
              </div>

              {/* Payment Type */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">
                  Fee Type
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500/20 outline-none text-sm bg-white"
                  required
                >
                  <option value="Compulsory">Compulsory</option>
                  <option value="Optional">Optional</option>
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">
                  Button Text
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500/20 outline-none text-sm bg-white"
                  required
                >
                  <option value="Compulsory">Compulsory</option>
                  <option value="Optional">Optional</option>
                </select>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                    <DollarSign className="w-4 h-4 text-blue-600" />
                  </div>
                </div>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-blue-900 mb-1">
                    Payment Link
                  </p>
                  <p className="text-xs text-blue-700 leading-relaxed">
                    This payment will appear in the "Pending Fees" section for all students.
                    They can view details and make payments directly.
                  </p>
                </div>
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
                    Creating...
                  </>
                ) : (
                  <>
                    <Save className="size-4" />
                    Create Payment
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