import { X, Shield, GraduationCap, Check } from "lucide-react";
import { ELECTION_ROLES } from "../mockData";

function getRoleCandidateLabel(candidateRoleTag, roles) {
  return candidateRoleTag === "EX-EXCO"
    ? "EX-EXCO CANDIDATE"
    : "NACOS CANDIDATE";
}

const ManifestoModal = ({
  candidate,
  isOpen,
  onClose,
  onSelect,
  isSelected,
  roleTitle,
}) => {
  if (!isOpen || !candidate) return null;

  const roleBadgeLabel = roleTitle
    ? `${roleTitle.toUpperCase()} CANDIDATE`
    : getRoleCandidateLabel(candidate.roleTag);

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        className="w-full h-full sm:h-auto sm:max-w-4xl sm:max-h-[90vh] bg-white sm:rounded-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 bg-[#F8FAFC] shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center">
              <span className="text-sm">📋</span>
            </div>
            <div>
              <p className="text-sm font-bold text-[#0F172A]">
                Candidate Manifesto
              </p>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider">
                Election 2024/2025 Session
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {candidate.aiTextPercent > 0 && (
              <span className="px-2.5 py-1 rounded-full bg-red-100 text-red-600 text-[10px] font-bold tracking-wide">
                {candidate.aiTextPercent}% AI TEXT
              </span>
            )}
            <button
              type="button"
              onClick={onClose}
              className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-slate-200 transition-colors text-slate-500"
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Body — Mobile: single scroll on outer div. Desktop: each column scrolls independently. */}
        <div className="flex flex-col sm:flex-row flex-1 gap-8 p-4 lg:p-8 divide-slate-100 divide-y-2 sm:divide-y-0 min-h-0 overflow-y-auto sm:overflow-hidden">
          {/* ── Left column ─────────────────────────────────────── */}
          <div className="sm:w-66.5 pb-8 sm:pb-0 shrink-0 bg-white flex flex-col items-center gap-4 p-5 sm:overflow-y-auto">
            {/* Photo with role badge overlay */}
            <div className="relative w-full">
              <img
                src={candidate.photo}
                alt={candidate.name}
                className="w-full aspect-square object-cover rounded-3xl bg-[#F5EFE6]"
                onError={(e) => {
                  e.target.src = "/src/assets/images/avatar.svg";
                }}
                width={192}
                height={192}
              />
              {/* Role badge pinned to bottom of photo */}
              <div className="absolute -bottom-6 inset-x-0 flex justify-center pb-2.5">
                <span className="px-3 py-1 rounded-full bg-[#138601] border-2 border-white text-white text-[10px] font-bold uppercase tracking-wider shadow-sm">
                  {roleBadgeLabel}
                </span>
              </div>
            </div>

            {/* Name + level */}
            <div className="text-center w-full mt-4">
              <p className="font-bold text-lg md:text-xl lg:text-2xl text-[#0F172A] leading-snug">
                {candidate.name}
              </p>
              <p className="text-xs text-slate-500 mt-0.5">
                {candidate.level}, {candidate.department}
              </p>
            </div>

            {/* Hashtags */}
            <div className="flex flex-wrap justify-center gap-1.5 w-full">
              {candidate.hashtags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Eligibility + Academic Standing */}
            <div className="w-full flex flex-col gap-3">
              <div className="flex items-start gap-2">
                <Shield size={13} className="text-[#138601] mt-0.5 shrink-0" />
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                    Eligibility Status
                  </p>
                  <p className="text-xs font-semibold text-slate-700">
                    {candidate.eligibility}
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <GraduationCap
                  size={13}
                  className="text-[#138601] mt-0.5 shrink-0"
                />
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">
                    Academic Standing
                  </p>
                  <p className="text-xs font-semibold text-slate-700">
                    {candidate.academicStanding}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Right column ────────────────────────────────────── */}
          <div className="flex-1 flex flex-col sm:min-h-0 bg-[#F8FAFC] p-5 sm:py-6 border border-[#F1F5F9] rounded-3xl">
            {/* Green vision header */}
            <div className="py-5">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-base">📣</span>
                <h3 className="font-bold text-sm text-[#0F172A]">
                  Vision for NACOS Anchor
                </h3>
              </div>
              <p className="text-sm font-bold text-[#0F172A] leading-relaxed mb-2">
                "{candidate.manifesto.split(".")[0]}."
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                {candidate.manifesto.split(".").slice(1).join(".").trim()}
              </p>
            </div>

            {/* White bullet points — scrollable only on desktop */}
            <div className="sm:flex-1 sm:overflow-y-auto px-6 py-5">
              {candidate.manifestoPoints && (
                <ul className="flex flex-col gap-4">
                  {candidate.manifestoPoints.map((point, i) => (
                    <li key={i} className="flex gap-3">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#138601] mt-1 shrink-0" />
                      <div>
                        <p className="text-xs font-bold text-[#0F172A] uppercase tracking-wide">
                          {point.title}
                        </p>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                          {point.body}
                        </p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}

              <p className="mt-6 text-sm font-bold text-[#138601] italic">
                Vote {candidate.name} – A Future Anchored in Action.
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 px-5 py-3.5 border-t border-slate-100 flex items-center justify-between gap-3 bg-white">
          <div className="flex items-center gap-1.5 text-amber-600">
            <span className="text-sm shrink-0">ⓘ</span>
            <p className="text-[10px]">
              Review carefully. Your vote is final once submitted.
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-slate-600 border border-slate-200 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                if (!isSelected) {
                  onSelect(candidate.id);
                  onClose();
                }
              }}
              disabled={isSelected}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                isSelected
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed"
                  : "bg-[#138601] text-white hover:bg-[#0e6001]"
              }`}
            >
              <Check size={12} strokeWidth={3} />
              {isSelected ? "Candidate Selected" : "Select Candidate"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManifestoModal;

