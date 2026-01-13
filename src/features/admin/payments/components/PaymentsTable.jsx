import { useMemo, useState } from "react";
import { CheckCircle2} from "lucide-react";
import TableToolbar from "./TableToolbar";
import checkMark from "../assets/table/Checkmark.png";
import eyeIcon from "../assets/table/eye.png";


function StatusPill({ status }) {
  const styles = useMemo(() => {
    switch (status) {
     case "Approved":
        return "bg-[color-mix(in_srgb,var(--color-brand-primary)_10%,white)] text-[var(--color-brand-primary)]";

      case "Rejected":
        return "bg-red-50 text-red-700";
      default:
        return "bg-amber-50 text-amber-700";
    }
  }, [status]);

  return (
    <span className={`rounded-md px-2 py-1 text-[11px] font-semibold ${styles}`}>
      {status}
    </span>
  );
}

function Avatar({ src, initials, tone }) {
  if (src) {
    return (
      <img
        src={src}
        alt=""
        className="h-7 w-7 rounded-full object-cover"
      />
    );
  }

  const toneStyles = {
    blue: "bg-blue-50 text-blue-600",
    red: "bg-rose-50 text-rose-600",
    neutral: "bg-slate-100 text-slate-600",
  };

  return (
    <div
      className={[
        "grid h-7 w-7 place-items-center rounded-full text-xs font-bold",
        toneStyles[tone] || toneStyles.neutral,
      ].join(" ")}
    >
      {initials}
    </div>
  );
}



export default function PaymentsTable({ rows = [] }) {
  const [selected, setSelected] = useState(() => new Set());

  function toggleOne(id) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function toggleAll() {
    setSelected((prev) => {
      if (prev.size === rows.length) return new Set();
      return new Set(rows.map((r) => r.id));
    });
  }

  const selectedCount = selected.size;

  return (
    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <TableToolbar selectedCount={selectedCount} />

      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-white">
            <tr className="border-b border-slate-200 text-[11px] font-semibold uppercase tracking-wide text-slate-500">
              <th className="px-5 py-3 w-10">
                <input
                  type="checkbox"
                  checked={rows.length > 0 && selectedCount === rows.length}
                  onChange={toggleAll}
                />
              </th>
              <th className="px-5 py-3">Student Details</th>
              <th className="px-5 py-3">Transaction</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3">Amount</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b border-slate-100">
                <td className="px-5 py-4">
                  <input
                    type="checkbox"
                    checked={selected.has(r.id)}
                    onChange={() => toggleOne(r.id)}
                  />
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <Avatar
                      src={r.avatar}
                      initials={r.initials}
                      tone={r.avatarTone}
                    />
                    
                    <div>
                      <div className="text-sm font-semibold text-slate-900">
                        {r.name}
                      </div>
                      <div className="text-xs text-slate-500">
                        Matric: {r.matric}
                      </div>
                    </div>
                  </div>
                </td>

                <td className="px-5 py-4">
                  <div className="text-sm font-semibold text-slate-900">
                    {r.transaction}
                  </div>
                  <div className="text-xs text-slate-500">Ref: {r.ref}</div>
                </td>

                <td className="px-5 py-4 text-sm text-slate-700">{r.date}</td>
                <td className="px-5 py-4 text-sm font-semibold text-slate-900">
                  {r.amount}
                </td>

                <td className="px-5 py-4">
                  <StatusPill status={r.status} />
                </td>

                <td className="px-5 py-4">
                  <div className="flex items-center justify-end gap-3">
                    <button className="text-slate-500 hover:text-slate-700" title="View">
                      <img src={eyeIcon} className="h-4 w-4" alt="" />
                      <img src={checkMark} className="h-4 w-4" alt="" />
                    </button>
                    <button className="text-[var(--color-brand-primary)] hover:opacity-90" title="Approve">
                      <CheckCircle2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-5 py-4 text-xs text-slate-500">
        <div>Showing 1 to 5 of 845 results</div>

        <div className="flex items-center gap-2">
          <button className="rounded-md px-2 py-1 hover:bg-slate-100">‹</button>
          <button className="rounded-md bg-[var(--color-brand-primary)] px-3 py-1 text-white">1</button>
          <button className="rounded-md px-3 py-1 hover:bg-slate-100">2</button>
          <button className="rounded-md px-3 py-1 hover:bg-slate-100">3</button>
          <span className="px-2">…</span>
          <button className="rounded-md px-3 py-1 hover:bg-slate-100">10</button>
          <button className="rounded-md px-2 py-1 hover:bg-slate-100">›</button>
        </div>
      </div>
    </div>
  );
}
