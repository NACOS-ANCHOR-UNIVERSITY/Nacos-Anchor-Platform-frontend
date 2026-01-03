export default function StatCards({ stats = [] }) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((s) => {
        const isUp = s.deltaTone === "up";
        return (
          <div
            key={s.label}
            className="rounded-xl border border-slate-200 bg-white p-5"
          >
            <div className="flex items-start justify-between">
              <div className="text-xs font-medium text-slate-500">{s.label}</div>
              <div className="h-6 w-6 rounded-md bg-slate-100" />
            </div>

            <div className="mt-3 text-xl font-bold text-slate-900">{s.value}</div>

            <div className="mt-2 flex items-center gap-2 text-xs">
              <span
                className={
                  "font-semibold " + (isUp ? "text-emerald-600" : "text-red-600")
                }
              >
                {s.delta}
              </span>
              <span className="text-slate-500">{s.deltaLabel}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
