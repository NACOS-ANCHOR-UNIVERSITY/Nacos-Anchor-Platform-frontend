import { GavelIcon, IDCardIcon } from "@/assets/icons";
import { FileText, Laptop, QrCode } from "lucide-react";
import Spinner from "@/components/ui/Spinner";
import Skeleton from "@/components/ui/Skeleton";

const ModerationQueue = ({ queue = [], loading }) => {
  // Map type to icon (expand as needed)
  const typeToAvatarIcon = {
    Logbook: Laptop,
    Placement: QrCode,
  };
  const typeToDocIcon = {
    Logbook: FileText,
    Placement: IDCardIcon,
  };
  return (
    <div className="w-full rounded-3xl drop-shadow-sm border border-[#F1F5F9] bg-white overflow-hidden">
      {/* Header */}
      <div className="bg-[#FFF7ED]/50 border-b border-[#F1F5F9] px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GavelIcon className="text-[#F97316] size-6" />
          <p className="text-[#0F172A] font-bold text-lg">Moderation Queue</p>
        </div>

        <span className="text-[#EA580C] bg-[#FFEDD5] rounded-full py-1 px-2 font-bold text-[10px]">
          {queue?.length || 0} Pending
        </span>
      </div>

      {/* Items List */}
      <div className="flex flex-col divide-y divide-[#F1F5F9] bg-white">
        {loading ? (
          Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="p-5">
              <div className="flex justify-between items-start mb-2">
                <div className="flex gap-3">
                  <div className="size-8 rounded-full bg-gray-200 animate-pulse" />
                  <div>
                    <Skeleton className="h-4 w-24 mb-1" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                </div>
                <Skeleton className="h-3 w-10" />
              </div>
              <div className="bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl p-2 ml-11 mb-3">
                <div className="flex gap-1.5 items-center">
                  <Skeleton className="h-3 w-3 rounded-full" />
                  <Skeleton className="h-3 w-16" />
                </div>
                <Skeleton className="h-3 w-32 mt-1" />
              </div>
              <div className="grid grid-cols-2 gap-3 ml-11">
                <Skeleton className="h-7 rounded-lg" />
                <Skeleton className="h-7 rounded-lg" />
              </div>
            </div>
          ))
        ) : queue.length === 0 ? (
          <div className="text-center py-8">No moderation requests.</div>
        ) : (
          queue.map((item) => {
            // fallback icons
            const AvatarIcon = typeToAvatarIcon[item.type] || Laptop;
            const DocIcon = typeToDocIcon[item.type] || FileText;
            return (
              <div key={item.id} className="p-5">
                {/* User Row */}
                <div className="flex justify-between items-start mb-2">
                  <div className="flex gap-3">
                    {/* Avatar Circle */}
                    <div
                      className={`size-8 rounded-full bg-[#FDBA74] flex items-center justify-center text-white shrink-0`}
                    >
                      <AvatarIcon size={18} />
                    </div>
                    <div>
                      <h4 className="text-[#0F172A] font-bold text-sm">
                        {item.student_name}
                      </h4>
                      <p className="text-[#64748B] text-xs font-medium mt-0.5">
                        {item.student_dept}
                      </p>
                    </div>
                  </div>
                  <span className="text-[#94A3B8] text-xs font-medium">
                    {item.time_ago}
                  </span>
                </div>
                {/* Document Box */}
                <div className="bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl p-2 ml-11 mb-3">
                  <div className=" flex gap-1.5 items-center">
                    <div className="text-[#6366F1]">
                      <DocIcon className="text-[#3B82F6] size-3" />
                    </div>
                    <div>
                      <p className="text-[#1E293B] font-bold text-sm">
                        {item.title}
                      </p>
                    </div>
                  </div>
                  <p className="text-[#475569] text-xs mt-1">
                    {item.description}
                  </p>
                </div>
                {/* Actions */}
                <div className="grid grid-cols-2 gap-3 ml-11">
                  <button
                    type="button"
                    className={`bg-[#138601] text-white font-medium text-xs py-2 rounded-lg hover:opacity-90 transition-opacity cursor-pointer`}
                  >
                    Approve
                  </button>
                  <button
                    type="button"
                    className="bg-white border border-[#E2E8F0] text-[#475569] font-medium text-xs py-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    Reject
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* footer */}
      <div className="p-3 border-t border-[#F1F5F9] bg-white rounded-b-3xl flex justify-center">
        <button
          type="button"
          className="text-[#138601] text-xs font-medium hover:text-[#138601]/80 hover:underline transition-all duration-150 cursor-pointer"
        >
          View All Requests
        </button>
      </div>
    </div>
  );
};

export default ModerationQueue;

