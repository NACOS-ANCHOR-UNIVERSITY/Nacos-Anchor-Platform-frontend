import { TrendingUp, TrendingDown } from "lucide-react";

export default function StatCards({ stats = [] }) {
  const colorMap = {
    green: "bg-green-100 text-green-700",
    amber: "bg-amber-100 text-amber-700",
    blue: "bg-blue-100 text-blue-700",
    purple: "bg-purple-100 text-purple-700",
  };

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((s) => {
        const isUp = s.deltaTone === "up";
        const colorClass = colorMap[s.color] || "bg-slate-100 text-slate-700";

        return (
          <div
            key={s.label}
            className="rounded-xl border border-slate-200 bg-white p-5"
          >
            <div className="flex items-start justify-between">
              <div className="text-xs font-medium text-slate-500">
                {s.label}
              </div>
              <div
                className={`h-8 w-8 rounded-lg flex items-center justify-center ${colorClass}`}
              >
                {/* Icon placeholder if needed, or just color box */}
              </div>
            </div>

            <div className="mt-3 text-xl font-bold text-slate-900">
              {s.value}
            </div>

            <div className="mt-2 flex items-center gap-2 text-xs">
              <div className="flex items-center gap-1 font-semibold">
                {isUp ? (
                  <TrendingUp className="h-3 w-3 text-brand-primary" />
                ) : (
                  <TrendingDown className="h-3 w-3 text-red-600" />
                )}
                <span className={isUp ? "text-brand-primary" : "text-red-600"}>
                  {s.delta}
                </span>
              </div>

              <span className="text-slate-500">{s.deltaLabel}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
