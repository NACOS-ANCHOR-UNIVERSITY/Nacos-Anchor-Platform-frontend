import React, { useState, useRef, useEffect } from "react";
import { X, Upload, Save, Loader2, Search } from "lucide-react";
import { toast } from "sonner";
import client from "../../../../config/axios-client";

// Reusable autocomplete component
function AutocompleteInput({ label, placeholder, value, displayValue, onSearch, onSelect, options, loading, renderOption, required }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState(displayValue || "");
  const wrapperRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Sync display value from parent (e.g. on reset)
  useEffect(() => {
    setQuery(displayValue || "");
  }, [displayValue]);

  const handleInputChange = (e) => {
    const val = e.target.value;
    setQuery(val);
    setOpen(true);
    onSearch(val);
  };

  const handleSelect = (option) => {
    onSelect(option);
    setQuery(option._displayLabel);
    setOpen(false);
  };

  return (
    <div className="flex flex-col gap-1.5" ref={wrapperRef}>
      <label className="text-xs font-bold text-slate-500 uppercase">{label}</label>
      <div className="relative">
        <input
          value={query}
          onChange={handleInputChange}
          onFocus={() => query && setOpen(true)}
          placeholder={placeholder}
          required={required}
          className="w-full px-3 py-2.5 pr-9 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500/20 outline-none text-sm"
        />
        <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />

        {open && (
          <div className="absolute z-50 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-lg max-h-48 overflow-y-auto">
            {loading ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="w-4 h-4 animate-spin text-green-600" />
              </div>
            ) : options.length === 0 ? (
              <p className="text-xs text-slate-400 text-center py-4">No results found</p>
            ) : (
              options.map((opt, i) => (
                <button
                  key={i}
                  type="button"
                  onMouseDown={() => handleSelect(opt)}
                  className="w-full text-left px-4 py-2.5 text-sm hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0"
                >
                  {renderOption(opt)}
                </button>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function RecordPaymentModal({ isOpen, onClose }) {
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [uploadingReceipt, setUploadingReceipt] = useState(false);

  // Student search state
  const [studentQuery, setStudentQuery] = useState("");
  const [studentOptions, setStudentOptions] = useState([]);
  const [studentSearchLoading, setStudentSearchLoading] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  // Payment type search state
  const [paymentQuery, setPaymentQuery] = useState("");
  const [paymentOptions, setPaymentOptions] = useState([]);
  const [paymentSearchLoading, setPaymentSearchLoading] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);

  const [formData, setFormData] = useState({
    user_id: "",
    description: "",
    amount: "",
    status: "Successful",
    datePaid: new Date().toISOString().split("T")[0],
    receipt: null,
  });

  const token = JSON.parse(localStorage.getItem("nacos-auth-storage"))?.state?.token;

  // Search students
  useEffect(() => {
    if (!studentQuery || studentQuery.length < 2) {
      setStudentOptions([]);
      return;
    }
    const timeout = setTimeout(async () => {
      setStudentSearchLoading(true);
      try {
        const authStorage = JSON.parse(localStorage.getItem("nacos-auth-storage"));
        const token = authStorage?.state?.token;

        const res = await fetch(
          `https://nacos.nextgenerationones.org/api/admin/users/list?search=${encodeURIComponent(studentQuery)}&limit=10`,
          { headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" } }
        );
        const data = await res.json();
        const students = data?.data || [];
        console.log(data.data)
        const filtered = students.filter((s) => {
          const q = studentQuery.toLowerCase();
          return (
            s.name?.toLowerCase().includes(q) ||
            s.matric_no?.toLowerCase().includes(q) ||
            s.email?.toLowerCase().includes(q)
          );
        });
        setStudentOptions(
          filtered.map((s) => ({
            ...s,
            _displayLabel: `${s.name} — ${s.matric_no || s.email}`,
          }))
        );
      } catch {
        setStudentOptions([]);
      } finally {
        setStudentSearchLoading(false);
      }
    }, 300);
    return () => clearTimeout(timeout);
  }, [studentQuery]);

  // Fees - static only, no API call 
  useEffect(() => {
    const staticFees = [
      { title: "Departmental Dues", amount: "" },
      { title: "T-Shirt Fee", amount: "" },
      { title: "Dinner Fee", amount: "" },
      { title: "Other", amount: "" },
    ];
    const filtered = staticFees.filter((f) =>
      f.title.toLowerCase().includes(paymentQuery.toLowerCase())
    );
    setPaymentOptions(filtered.map((f) => ({ ...f, _displayLabel: f.title })));
  }, [paymentQuery]);

  // Load payment options on mount
  useEffect(() => {
    if (isOpen) setPaymentQuery("");
  }, [isOpen]);

  const handleSelectStudent = (student) => {
    setSelectedStudent(student);
    setFormData((prev) => ({ ...prev, user_id: student.id || student.user_id }));
  };

  const handleSelectPayment = (payment) => {
    setSelectedPayment(payment);
    setFormData((prev) => ({
      ...prev,
      description: payment._displayLabel,
      // Pre-fill amount if the fee has a known amount
      amount: payment.amount || prev.amount,
    }));
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

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
    } finally {
      setUploadingReceipt(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.user_id) { toast.error("Please select a student"); return; }
    if (!formData.description) { toast.error("Please select a payment type"); return; }

    setLoading(true);
    try {
      const data = new FormData();
      data.append("user_id", formData.user_id);
      data.append("description", formData.description);
      data.append("amount", formData.amount);
      data.append("status", formData.status);
      data.append("date_paid", formData.datePaid);
      if (formData.receipt) data.append("receipt", formData.receipt);

      const response = await fetch(
        "https://nacos.nextgenerationones.org/api/admin/finance/record-payment",
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
          body: data,
        }
      );

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to record payment.");
      }

      toast.success("Payment recorded successfully!");
      onClose();
      window.location.reload();
    } catch (error) {
      toast.error(error.message || "Failed to record payment.");
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

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

            {/* Student autocomplete */}
            <AutocompleteInput
              label="Student Name"
              placeholder="Search by name or matric no..."
              displayValue={selectedStudent?._displayLabel || ""}
              onSearch={setStudentQuery}
              onSelect={handleSelectStudent}
              options={studentOptions}
              loading={studentSearchLoading}
              required
              renderOption={(s) => (
                <div className="flex flex-col">
                  <span className="font-semibold text-slate-800">
                    {s.first_name} {s.last_name}
                  </span>
                  <span className="text-xs text-slate-400">{s.matric_no + " " + s.name}</span>
                </div>
              )}
            />

            {/* Payment type autocomplete */}
            <AutocompleteInput
              label="Payment For"
              placeholder="Search payment type..."
              displayValue={selectedPayment?._displayLabel || ""}
              onSearch={setPaymentQuery}
              onSelect={handleSelectPayment}
              options={paymentOptions}
              loading={paymentSearchLoading}
              required
              renderOption={(f) => (
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-800">{f._displayLabel}</span>
                  {f.amount ? (
                    <span className="text-xs text-green-600 font-bold">₦{Number(f.amount).toLocaleString()}</span>
                  ) : null}
                </div>
              )}
            />

            {/* Amount */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase">Amount (₦)</label>
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

            {/* Status */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500/20 outline-none text-sm bg-white"
              >
                <option>Successful</option>
                <option>Pending</option>
                <option>Failed</option>
              </select>
            </div>

            {/* Date Paid */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase">Date Paid</label>
              <input
                type="date"
                name="datePaid"
                value={formData.datePaid}
                onChange={handleChange}
                className="w-full px-3 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500/20 outline-none text-sm"
                required
              />
            </div>

            {/* Receipt Upload */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase">Upload Receipt Proof</label>
              <div
                onClick={() => fileInputRef.current?.click()}
                className="border border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-center bg-slate-50/50 hover:bg-slate-100 transition-colors cursor-pointer group"
              >
                <input type="file" ref={fileInputRef} className="hidden" onChange={handleFileChange} accept="image/*,.pdf" />
                <div className="bg-white p-2.5 rounded-full shadow-sm mb-3 group-hover:scale-110 transition-transform">
                  <Upload className="size-5 text-green-600" />
                </div>
                <p className="text-sm font-semibold text-slate-700">
                  {formData.receipt ? formData.receipt.name : "Click to upload receipt"}
                </p>
                <p className="text-xs text-slate-400 mt-1">JPG, PNG or PDF (Max 5MB)</p>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-100 flex justify-end gap-3 bg-white">
          <button type="button" onClick={onClose} className="px-5 py-2.5 text-slate-500 font-bold text-sm hover:bg-slate-100 rounded-xl transition-colors" disabled={loading}>
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={loading || uploadingReceipt}
            className="px-6 py-2.5 bg-[#138601] text-white rounded-xl font-bold text-sm hover:bg-[#0e6001] flex items-center gap-2 shadow-lg shadow-green-100 transition-all active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? <><Loader2 className="size-4 animate-spin" /> Saving...</> : <><Save className="size-4" /> Record Payment</>}
          </button>
        </div>
      </div>
    </div>
  );
}