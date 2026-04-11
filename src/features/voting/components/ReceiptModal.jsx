import { X, Printer, ShieldCheck } from "lucide-react";
import { CANDIDATES, ELECTION_ROLES, ELECTION_SESSION } from "../mockData";
import useUserStore from "@/store/useUserStore";

// Generate a deterministic receipt ID from selections
function generateReceiptId(selections) {
  const keys = Object.values(selections).join("-");
  const hash = Array.from(keys).reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  return `NACOS-${new Date().getFullYear()}-${hash.toString(16).toUpperCase().slice(0, 6)}`;
}

const ReceiptModal = ({ isOpen, onClose, selections }) => {
  const { user } = useUserStore();

  if (!isOpen) return null;

  const receiptId = generateReceiptId(selections);
  const timestamp = new Date().toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const getVotedCandidate = (roleId) => {
    const candidateId = selections[roleId];
    if (!candidateId) return null;
    return CANDIDATES[roleId]?.find((c) => c.id === candidateId) || null;
  };

  const handlePrint = () => window.print();

  return (
    <div
      className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-0 sm:p-4"
      onClick={onClose}
    >
      <div
        className="w-full h-full sm:h-auto sm:max-w-md sm:max-h-[90vh] bg-white sm:rounded-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100 bg-[#F8FAFC] shrink-0">
          <div className="flex items-center gap-2.5">
            <ShieldCheck size={18} className="text-[#138601]" />
            <div>
              <p className="text-sm font-bold text-[#0F172A]">Voting Receipt</p>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider">Official Ballot Record</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors"
            >
              <Printer size={13} />
              Print
            </button>
            <button
              type="button"
              onClick={onClose}
              className="w-7 h-7 rounded-full flex items-center justify-center hover:bg-slate-200 transition-colors text-slate-500"
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4">
          {/* Receipt meta */}
          <div className="rounded-xl bg-[#F0FDF4] border border-green-200 p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Receipt ID</p>
              <span className="font-mono text-xs font-bold text-[#138601]">{receiptId}</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Election</p>
              <span className="text-xs font-semibold text-slate-700">{ELECTION_SESSION}</span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Voter</p>
              <span className="text-xs font-semibold text-slate-700">
                {user?.first_name} {user?.last_name}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Matric No.</p>
              <span className="text-xs font-semibold text-slate-700">
                {user?.matric_no || user?.matricNo || "—"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Timestamp</p>
              <span className="text-xs font-semibold text-slate-700">{timestamp}</span>
            </div>
          </div>

          {/* Divider */}
          <div className="flex items-center gap-2">
            <div className="flex-1 h-px bg-slate-100" />
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Ballot Summary</p>
            <div className="flex-1 h-px bg-slate-100" />
          </div>

          {/* Voted candidates */}
          <div className="flex flex-col gap-2">
            {ELECTION_ROLES.map((role) => {
              const candidate = getVotedCandidate(role.id);
              return (
                <div
                  key={role.id}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl bg-white border border-[#E2E8F0]"
                >
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wide w-24 shrink-0">
                    {role.shortName.replace(".", "")}
                  </p>
                  {candidate ? (
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <img
                        src={candidate.photo}
                        alt={candidate.name}
                        className="w-7 h-7 rounded-lg object-cover bg-slate-100 shrink-0"
                        onError={(e) => { e.target.src = "/src/assets/images/avatar.svg"; }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-xs font-semibold text-[#0F172A] truncate">{candidate.name}</p>
                        <p className="text-[10px] text-slate-400 truncate">{candidate.level} · {candidate.department}</p>
                      </div>
                      <span className="text-[9px] font-bold text-[#138601] uppercase shrink-0">✓ Voted</span>
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400 italic">Not voted</p>
                  )}
                </div>
              );
            })}
          </div>

          {/* Security note */}
          <div className="flex items-start gap-2 px-3 py-3 rounded-xl bg-slate-50 border border-slate-100">
            <ShieldCheck size={14} className="text-[#138601] mt-0.5 shrink-0" />
            <p className="text-[10px] text-slate-500 leading-relaxed">
              Your vote has been encrypted using the Anchor-Trust Engine and permanently recorded in the election ledger. This receipt serves as your proof of participation.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiptModal;
