import { ClipboardCheck, Check, BarChart2 } from "lucide-react";
import { CANDIDATES } from "../mockData";

const BallotSidebar = ({
  roles,
  selections,
  onSubmit,
  submitted,
  onViewLiveStats,
  currentRoleId,
}) => {
  const totalVoted = Object.keys(selections).length;
  const allVoted = totalVoted === roles.length;

  const getVotedCandidate = (roleId) => {
    const candidateId = selections[roleId];
    if (!candidateId) return null;
    return CANDIDATES[roleId]?.find((c) => c.id === candidateId) || null;
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-[#E2E8F0]">
        <div className="flex items-center gap-2">
          <ClipboardCheck size={16} className="text-[#138601]" />
          <p className="text-base font-bold text-[#0F172A]">Your Ballot</p>
          {submitted && (
            <span className="ml-auto px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#16A34A] text-[9px] font-bold uppercase tracking-wide">
              Submitted
            </span>
          )}
        </div>
        <p className="text-[10px] text-slate-400 mt-0.5 uppercase tracking-widest font-semibold">
          {submitted ? "Final Ballot Record" : "Review Before Submission"}
        </p>
      </div>

      {/* Ballot entries */}
      <div className="flex-1 px-4 py-4 flex flex-col gap-3 overflow-y-auto">
        {roles.map((role) => {
          const voted = getVotedCandidate(role.id);
          const isCurrentRole = role.id === currentRoleId && !submitted;

          return (
            <div
              key={role.id}
              className={`rounded-xl p-3 border transition-all ${
                isCurrentRole
                  ? "border-dashed border-status-success bg-green-50/60"
                  : voted
                  ? "border-green-100 bg-green-50/30"
                  : "border-[#E2E8F0] bg-white"
              }`}
            >
              {/* Role label row */}
              <div className="flex items-center justify-between mb-2">
                <p
                  className={`text-[9px] font-bold uppercase tracking-widest ${
                    isCurrentRole || voted ? "text-[#138601]" : "text-slate-400"
                  }`}
                >
                  {role.shortName}
                </p>
                {voted && !isCurrentRole && (
                  <span className="text-[9px] font-bold text-[#138601] uppercase">
                    VOTED
                  </span>
                )}
                {isCurrentRole && (
                  <span className="w-2 h-2 rounded-full bg-[#138601]" />
                )}
              </div>

              {/* Content */}
              {voted ? (
                <div className="flex items-center gap-2.5">
                  <div className="relative shrink-0">
                    <img
                      src={voted.photo}
                      alt={voted.name}
                      className="w-9 h-9 rounded-lg object-cover bg-slate-100"
                      onError={(e) => {
                        e.target.src = "/src/assets/images/avatar.svg";
                      }}
                    />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full bg-[#138601] border border-white flex items-center justify-center">
                      <Check size={8} className="text-white" strokeWidth={3} />
                    </div>
                  </div>
                  <p className="text-xs font-bold text-[#0F172A] truncate">
                    {voted.name}
                  </p>
                </div>
              ) : (
                <p className="text-xs text-slate-400 italic">
                  Waiting selection...
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Action area */}
      <div className="p-4 border-t border-[#E2E8F0]">
        {submitted ? (
          <button
            type="button"
            onClick={onViewLiveStats}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold bg-[#138601] text-white hover:bg-[#0e6001] shadow-md shadow-green-200 active:scale-[0.98] transition-all"
          >
            <BarChart2 size={15} />
            View Live Stats
          </button>
        ) : (
          <>
            <button
              type="button"
              onClick={onSubmit}
              disabled={!allVoted}
              className={`w-full py-3 rounded-xl text-sm font-bold transition-all ${
                allVoted
                  ? "bg-[#138601] text-white hover:bg-[#0e6001] shadow-md shadow-green-200 active:scale-[0.98]"
                  : "bg-slate-100 text-slate-400 cursor-not-allowed"
              }`}
            >
              Submit Final Ballot
            </button>
            {!allVoted && (
              <p className="text-center text-[10px] text-slate-400 mt-2">
                Complete all categories to submit
              </p>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default BallotSidebar;
