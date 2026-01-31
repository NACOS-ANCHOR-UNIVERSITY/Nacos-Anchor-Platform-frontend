import React, { useState } from "react";
import { X, DollarSign, Save, Loader2 } from "lucide-react";
import { toast } from "sonner";
import client from "../../../../config/axios-client";

export default function CreatePaymentModal({ isOpen, onClose }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "POCO F7 Purchase Levy",
    description: "Contribution towards the purchase of a POCO F7 smartphone for personal use.",
    amount: "2000",
    type: "Compulsory",
    buttonText: "Pay Levy",
    statusBadge: "PENDING",
    levels: [100, 200, 300, 400]
  });

  const token = JSON.parse(localStorage.getItem("nacos-auth-storage")).state.token
  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const token = JSON.parse(localStorage.getItem("nacos-auth-storage"))?.state.token;

    try {
      const payload = {
        title: formData.title,
        description: formData.description,
        amount: Number(formData.amount), // ensure number
        type: formData.type,
        button_text: formData.buttonText,
        status_badge: formData.statusBadge,
        levels: formData.levels
      };

      const res = await fetch("https://nacos.nextgenerationones.org/api/admin/fees", { 
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.message || "Failed to create payment.");
      }

      toast.success("Payment created successfully! Students can now pay.");

      setFormData({
        title: "",
        description: "",
        amount: "",
        type: "Compulsory",
        buttonText: "Pay Levy",
        statusBadge: "PENDING",
        levels: [100, 200, 300, 400]
      });

      onClose();
      window.location.reload();

    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleLevel = (level) => {
    setFormData(prev => ({ ...prev, levels: prev.levels.includes(level) ? prev.levels.filter(l => l !== level) : [...prev.levels, level].sort() }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[80vh]">

        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between bg-slate-50/50 shrink-0">
          <h3 className="text-slate-900 font-bold text-lg">Create Payment Fee</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-red-500 transition-colors p-1">
            <X size={20} />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1">
          <form id="payment-form" onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Payment Title */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase">Payment Title</label>
              <input name="title" value={formData.title} onChange={handleChange} placeholder="e.g. Departmental Dues 2024" className="w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500/20 outline-none text-sm" required />
            </div>

            {/* Description */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase">Description</label>
              <textarea name="description" value={formData.description} onChange={handleChange} rows={3} placeholder="e.g. Annual departmental levy for the 2023/2024 academic session." className="w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500/20 outline-none text-sm resize-none" required />
            </div>

            {/* Amount & Type */}
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Amount (₦)</label>
                <input type="number" name="amount" value={formData.amount} onChange={handleChange} min="0" step="0.01" placeholder="0.00" className="w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500/20 outline-none text-sm" required />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase">Fee Type</label>
                <select name="type" value={formData.type} onChange={handleChange} className="w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500/20 outline-none text-sm bg-white">
                  <option value="Compulsory">Compulsory</option>
                  <option value="Optional">Optional</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-slate-500 uppercase">Applicable Levels</label>
              <div className="grid grid-cols-4 gap-3">
                {[100, 200, 300, 400].map(level => (
                  <label key={level} className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer">
                    <input type="checkbox" checked={formData.levels.includes(level)} onChange={() => toggleLevel(level)} className="accent-green-600" />
                    {level}L
                  </label>
                ))}
              </div>
            </div>

            {/* Button Text */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase">Button Text</label>
              <input name="buttonText" value={formData.buttonText} onChange={handleChange} placeholder="e.g. Pay Levy" className="w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500/20 outline-none text-sm" required />
            </div>

            {/* Status Badge */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase">Status Badge</label>
              <input value={formData.statusBadge} readOnly disabled className="w-full px-3 py-2.5 border border-slate-200 rounded-xl bg-slate-100 text-slate-500 text-sm cursor-not-allowed" />
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <DollarSign className="w-4 h-4 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-blue-900 mb-1">Payment Link</p>
                  <p className="text-xs text-blue-700">This payment will appear in the "Pending Fees" section for all students.</p>
                </div>
              </div>
            </div>

          </form>
        </div>

        {/* Sticky Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-white flex gap-3 justify-end shrink-0">
          <button type="button" onClick={onClose} disabled={loading} className="px-5 py-2.5 text-slate-500 font-bold text-sm hover:bg-slate-100 rounded-xl">Cancel</button>
          <button type="submit" form="payment-form" disabled={loading} className="px-6 py-2.5 bg-[#138601] text-white rounded-xl font-bold text-sm hover:bg-[#0e6001] flex items-center gap-2 shadow-lg shadow-green-100 active:scale-95 disabled:opacity-70" >
            {loading ? <><Loader2 className="size-4 animate-spin" />Creating...</> : <><Save className="size-4" />Create Payment</>}
          </button>
        </div>

      </div>
    </div>
  );
}