import { useState, useEffect } from "react";
import { BarChart2, RefreshCw, TrendingUp } from "lucide-react";
import { ELECTION_ROLES, CANDIDATES, MOCK_VOTES } from "../mockData";

// Apply a small random drift to simulate live updates
function applyDrift(base) {
  const drift = {};
  for (const [id, count] of Object.entries(base)) {
    drift[id] = count + Math.floor(Math.random() * 4);
  }
  return drift;
}

function buildLiveVotes() {
  const result = {};
  for (const role of ELECTION_ROLES) {
    result[role.id] = applyDrift(MOCK_VOTES[role.id] || {});
  }
  return result;
}

const LiveStatsView = () => {
  const [votes, setVotes] = useState(buildLiveVotes);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);

  // Auto-refresh every 15 s
  useEffect(() => {
    const id = setInterval(() => {
      setVotes(buildLiveVotes());
      setLastUpdated(new Date());
    }, 15000);
    return () => clearInterval(id);
  }, []);

  const handleManualRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setVotes(buildLiveVotes());
      setLastUpdated(new Date());
      setRefreshing(false);
    }, 600);
  };

  const fmt = (d) =>
    d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });

  return (
    <div className="min-h-full bg-[#F8FAFC] pb-10">
      {/* Page header */}
      <div className="px-4 pt-5 pb-4 bg-white border-b border-[#E2E8F0]">
        <div className="flex items-start justify-between flex-wrap gap-3">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <BarChart2 size={16} className="text-[#138601]" />
              <h2 className="text-base font-bold text-[#0F172A]">Live Election Statistics</h2>
              <span className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#DCFCE7] text-[#16A34A] text-[10px] font-bold">
                <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-pulse" />
                LIVE
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Results update automatically · Last updated: {fmt(lastUpdated)}
            </p>
          </div>
          <button
            type="button"
            onClick={handleManualRefresh}
            disabled={refreshing}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#E2E8F0] text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50"
          >
            <RefreshCw size={13} className={refreshing ? "animate-spin" : ""} />
            Refresh
          </button>
        </div>
      </div>

      {/* Role cards */}
      <div className="px-4 mt-5 flex flex-col gap-5">
        {ELECTION_ROLES.map((role) => {
          const roleCandidates = CANDIDATES[role.id] || [];
          const roleVotes = votes[role.id] || {};
          const totalVotes = Object.values(roleVotes).reduce((a, b) => a + b, 0);

          // Sort candidates by vote count descending
          const sorted = [...roleCandidates].sort(
            (a, b) => (roleVotes[b.id] || 0) - (roleVotes[a.id] || 0)
          );
          const leaderId = sorted[0]?.id;

          return (
            <div key={role.id} className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
              {/* Role header */}
              <div className="px-5 py-3 border-b border-[#E2E8F0] flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                    Position
                  </p>
                  <p className="text-sm font-bold text-[#0F172A]">{role.title}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 uppercase tracking-wide">Total Votes</p>
                  <p className="text-sm font-bold text-[#0F172A]">{totalVotes}</p>
                </div>
              </div>

              {/* Candidate rows */}
              <div className="px-5 py-4 flex flex-col gap-4">
                {sorted.map((candidate, idx) => {
                  const count = roleVotes[candidate.id] || 0;
                  const pct = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
                  const isLeader = candidate.id === leaderId;

                  return (
                    <div key={candidate.id}>
                      <div className="flex items-center gap-3 mb-1.5">
                        {/* Rank */}
                        <span
                          className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${
                            isLeader
                              ? "bg-[#138601] text-white"
                              : "bg-slate-100 text-slate-500"
                          }`}
                        >
                          {idx + 1}
                        </span>

                        {/* Photo */}
                        <img
                          src={candidate.photo}
                          alt={candidate.name}
                          className="w-8 h-8 rounded-lg object-cover bg-slate-100 shrink-0"
                          onError={(e) => {
                            e.target.src = "/src/assets/images/avatar.svg";
                          }}
                        />

                        {/* Name + dept */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <p className="text-xs font-semibold text-[#0F172A] truncate">
                              {candidate.name}
                            </p>
                            {isLeader && (
                              <span className="flex items-center gap-0.5 text-[9px] font-bold text-[#138601]">
                                <TrendingUp size={9} />
                                Leading
                              </span>
                            )}
                          </div>
                          <p className="text-[10px] text-slate-400 truncate">
                            {candidate.level} · {candidate.department}
                          </p>
                        </div>

                        {/* Count + pct */}
                        <div className="text-right shrink-0">
                          <p className="text-xs font-bold text-[#0F172A]">{count}</p>
                          <p className="text-[10px] text-slate-400">{pct}%</p>
                        </div>
                      </div>

                      {/* Progress bar */}
                      <div className="ml-8 h-2 rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${
                            isLeader ? "bg-[#138601]" : "bg-slate-300"
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer note */}
      <p className="text-center text-[10px] text-slate-400 mt-8 px-4">
        Results shown are preliminary and subject to verification. Official results will be announced after polls close.
      </p>
    </div>
  );
};

export default LiveStatsView;
