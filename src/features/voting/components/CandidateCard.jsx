import { CheckCheck, Check } from "lucide-react";

const CandidateCard = ({
  candidate,
  isSelected,
  onSelect,
  onReadManifesto,
}) => {
  return (
    <div
      className={`relative bg-white rounded-3xl overflow-hidden flex flex-col cursor-pointer transition-all duration-200 ${
        isSelected
          ? "border-2 border-[#138601] drop-shadow-lg shadow-[#0000001A]"
          : "border border-[#E2E8F0] drop-shadow-sm hover:drop-shadow-md hover:border-slate-300"
      }`}
      onClick={() => onReadManifesto(candidate)}
    >
      {/* SELECTED badge — flat horizontal pill, top-right */}
      {isSelected && (
        <div className="absolute top-0 right-0 z-10 pointer-events-none">
          <span className="flex items-center gap-1 px-2.5 py-1 rounded-tr-2xl rounded-bl-2xl bg-[#138601] text-white text-[10px] font-bold tracking-wide shadow-sm">
            <CheckCheck size={9} strokeWidth={3} />
            SELECTED
          </span>
        </div>
      )}

      <div className="p-5 flex flex-col gap-4">
        {/* Top row: photo + meta */}
        <div className="flex items-start gap-4">
          {/* Photo */}
          <div className="relative shrink-0">
            <img
              src={candidate.photo}
              alt={candidate.name}
              className="w-25 h-31 rounded-2xl object-cover bg-[#F5EFE6]"
              onError={(e) => {
                e.target.src = "/src/assets/images/avatar.svg";
              }}
            />
            {isSelected && (
              <div className="absolute -bottom-1 -right-1 size-5 rounded-full bg-[#138601] border-2 border-white flex items-center justify-center">
                <Check size={10} className="text-white" strokeWidth={3} />
              </div>
            )}
          </div>

          {/* Name + level + badges */}
          <div className="flex-1 min-w-0 pt-1">
            <p className="font-bold text-[#0F172A] text-[15px] leading-snug">
              {candidate.name}
            </p>
            <p className="text-sm font-semibold text-[#138601] mt-0.5">
              {candidate.level}, {candidate.department}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-2.5">
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold">
                GPA: {candidate.gpa}
              </span>
              <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-600 text-xs font-semibold uppercase tracking-wide">
                {candidate.roleTag}
              </span>
            </div>
          </div>
        </div>

        {/* Quote — not truncated */}
        <p className="text-sm text-slate-600 leading-relaxed">
          "{candidate.quote}"
        </p>

        {/* Read manifesto link */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onReadManifesto(candidate);
          }}
          className="text-sm font-bold text-[#138601] text-left w-fit hover:underline"
        >
          Read full manifesto
        </button>

        {/* Action button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            if (!isSelected) onSelect(candidate.id);
          }}
          disabled={isSelected}
          className={`w-full py-3 rounded-full text-sm font-bold transition-all ${
            isSelected
              ? "bg-slate-100 text-slate-400 cursor-not-allowed"
              : "bg-[#138601] text-white hover:bg-[#0e6001] active:scale-[0.98]"
          }`}
        >
          {isSelected ? (
            <span className="flex items-center justify-center gap-1.5">
              <Check /> Candidate Selected
            </span>
          ) : (
            "Select Candidate"
          )}
        </button>
      </div>
    </div>
  );
};

export default CandidateCard;

