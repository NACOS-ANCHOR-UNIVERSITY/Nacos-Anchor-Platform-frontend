import { GavelIcon, IDCardIcon } from "@/assets/icons";
import { FileText, Laptop, QrCode } from "lucide-react";

const ModerationQueue = () => {
  const queueItems = [
    {
      id: 1,
      name: "Emmanuel T.",
      details: "400L • Computer Science",
      time: "2h ago",
      docTitle: "Week 4 Logbook",
      docDesc: "Uploaded weekly report for review.",
      primaryAction: "Approve",
      secondaryAction: "Reject",
      iconBg: "bg-[#FDBA74]",
      AvatarIcon: Laptop,
      DocIcon: FileText,
      primaryColor: "bg-[#138601]",
    },
    {
      id: 2,
      name: "Sarah J.",
      details: "300L • Software Eng.",
      time: "5h ago",
      docTitle: "Placement Letter",
      docDesc: "Requested official letter for IBM.",
      primaryAction: "Sign & Send",
      secondaryAction: "Decline",
      iconBg: "bg-[#1E293B]",
      AvatarIcon: QrCode,
      DocIcon: IDCardIcon,
      primaryColor: "bg-[#138601]",
    },
  ];

  return (
    <div className="w-full rounded-3xl drop-shadow-sm border border-[#F1F5F9] bg-white overflow-hidden">
      {/* Header */}
      <div className="bg-[#FFF7ED]/50 border-b border-[#F1F5F9] px-5 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <GavelIcon className="text-[#F97316] size-6" />
          <p className="text-[#0F172A] font-bold text-lg">Moderation Queue</p>
        </div>

        <span className="text-[#EA580C] bg-[#FFEDD5] rounded-full py-1 px-2 font-bold text-[10px]">
          8 Pending
        </span>
      </div>

      {/* Items List */}
      <div className="flex flex-col divide-y divide-[#F1F5F9] bg-white">
        {queueItems.map((item) => (
          <div key={item.id} className="p-5">
            {/* User Row */}
            <div className="flex justify-between items-start mb-2">
              <div className="flex gap-3">
                {/* Avatar Circle */}
                <div
                  className={`size-8 rounded-full ${item.iconBg} flex items-center justify-center text-white shrink-0`}
                >
                  <item.AvatarIcon size={18} />
                </div>
                <div>
                  <h4 className="text-[#0F172A] font-bold text-sm">
                    {item.name}
                  </h4>
                  <p className="text-[#64748B] text-xs font-medium mt-0.5">
                    {item.details}
                  </p>
                </div>
              </div>
              <span className="text-[#94A3B8] text-xs font-medium">
                {item.time}
              </span>
            </div>

            {/* Document Box */}
            <div className="bg-[#F1F5F9] border border-[#E2E8F0] rounded-xl p-2 ml-11 mb-3">
              <div className=" flex gap-1.5 items-center">
                <div className="text-[#6366F1]">
                  <item.DocIcon
                    className={
                      item.id === 2
                        ? "text-[#A855F7] size-3"
                        : "text-[#3B82F6] size-3"
                    }
                  />
                </div>
                <div>
                  <p className="text-[#1E293B] font-bold text-sm">
                    {item.docTitle}
                  </p>
                </div>
              </div>
              <p className="text-[#475569] text-xs mt-1">{item.docDesc}</p>
            </div>

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3 ml-11">
              <button
                type="button"
                className={`${item.primaryColor} text-white font-medium text-xs py-2 rounded-lg hover:opacity-90 transition-opacity cursor-pointer`}
              >
                {item.primaryAction}
              </button>
              <button
                type="button"
                className="bg-white border border-[#E2E8F0] text-[#475569] font-medium text-xs py-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
              >
                {item.secondaryAction}
              </button>
            </div>
          </div>
        ))}
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

