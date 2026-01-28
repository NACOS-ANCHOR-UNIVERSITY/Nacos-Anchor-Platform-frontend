import { useState } from "react";
import { toast } from "sonner";
import { ChevronDown, PlusCircle, SendHorizonalIcon } from "lucide-react";
import { MapPinIcon } from "../../../assets/icons";
import { postSiwesOpportunity } from "@/features/admin/siwes/api";

const initialState = {
  company_name: "",
  role_title: "",
  location: "",
  duration: "3 months",
  requirements: "",
};

const PostNewOpportunity = ({ onSuccess }) => {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const validate = (values = form) => {
    const errors = {};
    if (!values.company_name.trim())
      errors.company_name = "Company name is required.";
    if (!values.role_title.trim())
      errors.role_title = "Role/Position is required.";
    if (!values.location.trim()) errors.location = "Location is required.";
    if (!values.duration.trim()) errors.duration = "Duration is required.";
    if (!values.requirements.trim())
      errors.requirements = "Requirements are required.";
    return errors;
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setForm((prev) => {
      const updated = { ...prev, [id]: value };
      setFieldErrors(validate(updated));
      return updated;
    });
  };

  const handleClear = () => {
    setForm(initialState);
    setError("");
    setSuccess("");
    setFieldErrors({});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;
    setLoading(true);
    try {
      await postSiwesOpportunity(form);
      setSuccess("Opportunity posted successfully!");
      toast.success("Opportunity posted successfully!");
      setForm(initialState);
      setFieldErrors({});
      if (typeof onSuccess === "function") onSuccess();
    } catch (err) {
      const msg = err?.response?.data?.message || "Failed to post opportunity.";
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const isInvalid = Object.keys(validate()).length > 0;

  return (
    <div className="rounded-3xl drop-shadow-sm border border-[#F1F5F9]">
      <div className="bg-[#F8FAFC80] border-b border-[#F1F5F9] p-6 rounded-t-3xl">
        <p className="flex items-center gap-2 text-[#0F172A] font-bold text-lg">
          <PlusCircle className="text-[#138601] size-5.5" />
          Post New Opportunity
        </p>
      </div>
      <div className="p-6 pb-10 bg-white rounded-b-3xl">
        <form
          className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm"
          onSubmit={handleSubmit}
        >
          {/* company name */}
          <div className="flex flex-col gap-1">
            <label
              htmlFor="company_name"
              className="font-medium text-[#334155]"
            >
              Company Name
            </label>

            <input
              type="text"
              id="company_name"
              value={form.company_name}
              onChange={handleChange}
              placeholder="e.g. Google Nigeria"
              className={`w-full px-3 py-2.5 border ${fieldErrors.company_name ? "border-red-400" : "border-[#E2E8F0]"} rounded-xl focus:ring-2 focus:ring-[#138601] focus:border-transparent outline-none transition-all placeholder:text-[#6B7280] text-[#0F172A]`}
              autoComplete="off"
            />
            {fieldErrors.company_name && (
              <span className="text-xs text-red-500 mt-1">
                {fieldErrors.company_name}
              </span>
            )}
          </div>

          {/* role/position */}
          <div className="flex flex-col gap-1">
            <label htmlFor="role" className="font-medium text-[#334155]">
              Role / Position
            </label>

            <input
              type="text"
              id="role_title"
              value={form.role_title}
              onChange={handleChange}
              placeholder="e.g. Frontend Intern"
              className={`w-full px-3 py-2.5 border ${fieldErrors.role_title ? "border-red-400" : "border-[#E2E8F0]"} rounded-xl focus:ring-2 focus:ring-[#138601] focus:border-transparent outline-none transition-all placeholder:text-[#6B7280] text-[#0F172A]`}
              autoComplete="off"
            />
            {fieldErrors.role_title && (
              <span className="text-xs text-red-500 mt-1">
                {fieldErrors.role_title}
              </span>
            )}
          </div>

          {/* location */}
          <div className="flex flex-col gap-1">
            <label htmlFor="location" className="font-medium text-[#334155]">
              Location
            </label>
            <div className="relative">
              <MapPinIcon className="absolute left-3.5 top-3.5 size-4 text-[#94A3B8]" />
              <input
                type="text"
                id="location"
                value={form.location}
                onChange={handleChange}
                placeholder="Lagos, Remote, etc."
                className={`w-full pl-10 pr-3 py-2.5 border ${fieldErrors.location ? "border-red-400" : "border-[#E2E8F0]"} rounded-xl focus:ring-2 focus:ring-[#138601] focus:border-transparent outline-none transition-all placeholder:text-[#6B7280] text-[#0F172A]`}
                autoComplete="off"
              />
              {fieldErrors.location && (
                <span className="text-xs text-red-500 mt-1">
                  {fieldErrors.location}
                </span>
              )}
            </div>
          </div>

          {/* duration */}
          <div className="flex flex-col gap-1">
            <label htmlFor="duration" className="font-medium text-[#334155]">
              Duration
            </label>
            <div className="relative">
              <ChevronDown className="absolute right-3.5 top-3.5 size-4 text-[#6B7280] pointer-events-none" />
              <select
                id="duration"
                value={form.duration}
                onChange={handleChange}
                className={`w-full pr-10 px-3 py-2.5 border ${fieldErrors.duration ? "border-red-400" : "border-[#E2E8F0]"} rounded-xl focus:ring-2 focus:ring-[#138601] focus:border-transparent outline-none transition-all placeholder:text-[#6B7280] text-[#0F172A] appearance-none`}
              >
                <option value="3 months">3 Months</option>
                <option value="6 months">6 Months</option>
                <option value="9 months">9 Months</option>
                <option value="12 months">12 Months</option>
              </select>
              {fieldErrors.duration && (
                <span className="text-xs text-red-500 mt-1">
                  {fieldErrors.duration}
                </span>
              )}
            </div>
          </div>

          {/* requirements */}
          <div className="col-span-2 flex flex-col gap-1">
            <label
              htmlFor="requirements"
              className="font-medium text-[#334155]"
            >
              Requirements & Details
            </label>
            <textarea
              id="requirements"
              rows="4"
              value={form.requirements}
              onChange={handleChange}
              placeholder="Enter key skills required and job description..."
              className={`w-full px-3 py-2 border ${fieldErrors.requirements ? "border-red-400" : "border-[#E2E8F0]"} rounded-xl focus:ring-2 focus:ring-[#138601] focus:border-transparent outline-none transition-all resize-none h-19.5`}
              maxLength="300"
              autoComplete="off"
            ></textarea>
            {fieldErrors.requirements && (
              <span className="text-xs text-red-500 mt-1">
                {fieldErrors.requirements}
              </span>
            )}
          </div>
          <div className="col-span-2 flex items-center justify-end gap-4 pt-2">
            <button
              type="button"
              className="text-sm font-bold text-[#4B5563] hover:text-gray-900 bg-transparent hover:bg-gray-100 transition-colors rounded-xl py-2.5 px-6 cursor-pointer"
              onClick={handleClear}
              disabled={loading}
            >
              Clear
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#138601] hover:bg-[#138601]/80 flex items-center gap-2 text-white text-sm font-bold rounded-xl transition-colors drop-shadow-sm cursor-pointer disabled:opacity-60"
              disabled={loading || isInvalid}
            >
              <SendHorizonalIcon className="size-4.5" />
              {loading ? "Publishing..." : "Publish Post"}
            </button>
          </div>
          {/* Toasts handle error/success messages now */}
        </form>
      </div>
    </div>
  );
};

export default PostNewOpportunity;

