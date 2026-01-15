import { ChevronDown, PlusCircle, SendHorizonalIcon } from "lucide-react";
import { MapPinIcon } from "../../../assets/icons";

const PostNewOpportunity = () => {
  return (
    <div className="rounded-3xl drop-shadow-sm border border-[#F1F5F9]">
      <div className="bg-[#F8FAFC80] border-b border-[#F1F5F9] p-6 rounded-t-3xl">
        <p className="flex items-center gap-2 text-[#0F172A] font-bold text-lg">
          <PlusCircle className="text-[#138601] size-5.5" />
          Post New Opportunity
        </p>
      </div>
      <div className="p-6 pb-10 bg-white rounded-b-3xl">
        <form className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
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
              placeholder="e.g. Google Nigeria"
              className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#138601] focus:border-transparent outline-none transition-all placeholder:text-[#6B7280] text-[#0F172A]"
            />
          </div>

          {/* role/position */}
          <div className="flex flex-col gap-1">
            <label htmlFor="role" className="font-medium text-[#334155]">
              Role / Position
            </label>

            <input
              type="text"
              id="role"
              placeholder="e.g. Frontend Intern"
              className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#138601] focus:border-transparent outline-none transition-all placeholder:text-[#6B7280] text-[#0F172A]"
            />
          </div>

          {/* location */}
          <div className="flex flex-col gap-1">
            <label htmlFor="location" className="font-medium text-[#334155]">
              Location
            </label>
            <div className="relative">
              <MapPinIcon className="absolute left-3.5 top-3.5 size-4 text-[#94A3B8]" />
              <input
                type="tel"
                id="location"
                placeholder="Lagos, Remote, etc."
                className="w-full pl-10 pr-3 py-2.5 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#138601] focus:border-transparent outline-none transition-all placeholder:text-[#6B7280] text-[#0F172A]"
              />
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
                type="tel"
                id="duration"
                placeholder="Lagos, Remote, etc."
                className="w-full pr-10 px-3 py-2.5 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#138601] focus:border-transparent outline-none transition-all placeholder:text-[#6B7280] text-[#0F172A] appearance-none"
              >
                <option value="3 months">3 Months</option>
                <option value="6 months">6 Months</option>
                <option value="9 months">9 Months</option>
                <option value="12 months">12 Months</option>
              </select>
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
              placeholder="Enter key skills required and job description..."
              className="w-full px-3 py-2 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#138601] focus:border-transparent outline-none transition-all resize-none h-19.5"
              maxLength="300"
            ></textarea>
          </div>
          <div className="col-span-2 flex items-center justify-end gap-4 pt-2">
            <button
              type="button"
              className="text-sm font-bold text-[#4B5563] hover:text-gray-900 bg-transparent hover:bg-gray-100 transition-colors rounded-xl py-2.5 px-6 cursor-pointer"
            >
              Clear
            </button>
            <button
              type="button"
              className="px-6 py-2.5 bg-[#138601] hover:bg-[#138601]/80 flex items-center gap-2 text-white text-sm font-bold rounded-xl transition-colors drop-shadow-sm cursor-pointer"
            >
              <SendHorizonalIcon className="size-4.5" />
              Publish Post
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostNewOpportunity;

