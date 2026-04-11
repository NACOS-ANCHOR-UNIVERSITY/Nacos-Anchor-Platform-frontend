import { useState } from "react";
import { Check, Shield, BarChart2, Receipt } from "lucide-react";
import { CANDIDATES } from "../mockData";
import ReceiptModal from "./ReceiptModal";

const SuccessView = ({ roles, selections, onViewLiveStats }) => {
  const [showReceipt, setShowReceipt] = useState(false);

  const getVotedCandidate = (roleId) => {
    const candidateId = selections[roleId];
    if (!candidateId) return null;
    return CANDIDATES[roleId]?.find((c) => c.id === candidateId) || null;
  };

  return (
    <div className="min-h-full bg-[#F8FAFC] pb-10">
      {/* Success banner */}
      <div className="mx-4 mt-6 p-5 rounded-2xl bg-white border border-green-200 shadow-sm flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-[#F0FDF4] flex items-center justify-center shrink-0">
          <Check size={22} className="text-[#138601]" strokeWidth={2.5} />
        </div>
        <div className="flex-1">
          <p className="font-bold text-[#0F172A] text-base">
            All votes submitted successfully!
          </p>
          <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">
            Your voice has been heard. Your ballot has been encrypted and recorded in the secure election ledger.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0 flex-wrap">
          <button
            type="button"
            onClick={() => setShowReceipt(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            <Receipt size={13} />
            View Receipt
          </button>
          <button
            type="button"
            onClick={onViewLiveStats}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-[#138601] text-white text-xs font-semibold hover:bg-[#0e6001] transition-colors"
          >
            <BarChart2 size={13} />
            View Live Results
          </button>
        </div>
      </div>

      {/* Voted candidates grid */}
      <div className="px-4 mt-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {roles.map((role) => {
            const candidate = getVotedCandidate(role.id);
            if (!candidate) return null;
            return (
              <div
                key={role.id}
                className="bg-white rounded-2xl p-5 border border-[#E2E8F0] flex flex-col items-center text-center gap-3"
              >
                <div className="flex items-center justify-between w-full">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    {role.shortName}
                  </p>
                  <span className="px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#16A34A] text-[9px] font-bold uppercase tracking-wide">
                    Voted
                  </span>
                </div>

                <div className="relative">
                  <img
                    src={candidate.photo}
                    alt={candidate.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md bg-slate-100"
                    onError={(e) => { e.target.src = "/src/assets/images/avatar.svg"; }}
                  />
                  <div className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-[#138601] border-2 border-white flex items-center justify-center">
                    <Check size={11} className="text-white" strokeWidth={3} />
                  </div>
                </div>

                <div>
                  <p className="font-bold text-sm text-[#0F172A]">{candidate.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {candidate.level} • {candidate.department}
                  </p>
                </div>

                <p className="text-[11px] text-slate-400 italic line-clamp-2 leading-relaxed">
                  "{candidate.quote}"
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Thank you section */}
      <div className="mx-4 mt-8 p-8 rounded-2xl border border-[#E2E8F0] bg-white flex flex-col items-center text-center gap-3">
        <Shield size={36} className="text-slate-200" />
        <p className="font-bold text-slate-800 text-base">Thank you for participating!</p>
        <p className="text-xs text-slate-500 max-w-sm leading-relaxed">
          Voting is one of the most important ways you can contribute to the growth and leadership of the department. Election results will be finalized and announced after the polls close at 6:00 PM.
        </p>
        <div className="flex items-center gap-4 mt-2 text-[11px] text-slate-400">
          <span>🕐 Polls Close: 18:00</span>
          <span>•</span>
          <span>🛡 Network: SECURE-MAINNET</span>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 px-4 text-center">
        <p className="text-[10px] text-slate-400">
          © 2024 NACOS Anchor University Chapter. Secure Voting Powered by Anchor-Trust Engine.
        </p>
        <div className="flex justify-center gap-4 mt-1 text-[10px] text-slate-400">
          <button type="button" className="hover:text-slate-600">Terms of Service</button>
          <button type="button" className="hover:text-slate-600">Privacy Policy</button>
          <button type="button" className="hover:text-slate-600">Help & Support</button>
        </div>
      </div>

      {/* Receipt modal */}
      <ReceiptModal
        isOpen={showReceipt}
        onClose={() => setShowReceipt(false)}
        selections={selections}
      />
    </div>
  );
};

export default SuccessView;
