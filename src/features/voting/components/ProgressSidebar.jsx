import { Check, User, FileEdit, Receipt, Trophy, Info } from "lucide-react";

// Role-specific icons matching the Figma design
const ROLE_ICONS = {
  president: User,
  "vice-president": User,
  "general-secretary": FileEdit,
  "financial-secretary": Receipt,
  "sports-director": Trophy,
};

const ProgressSidebar = ({ roles, currentStep, selections, onStepClick }) => {
  const completedCount = Object.keys(selections).length;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="px-5 pt-5 pb-4">
        <p className="text-base font-bold text-[#0F172A]">Voting Progress</p>
        <div className="mt-3 flex items-center justify-between text-xs mb-1.5">
          <span className="text-slate-400 font-semibold uppercase tracking-widest text-[10px]">
            Completed
          </span>
          <span className="font-bold text-[#138601]">
            {completedCount} / {roles.length} Roles
          </span>
        </div>
        <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full rounded-full bg-[#138601] transition-all duration-500"
            style={{ width: `${(completedCount / roles.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Role list */}
      <nav className="flex-1 px-3 pb-3 flex flex-col gap-2 overflow-y-auto">
        {roles.map((role, index) => {
          const hasSelection = selections[role.id] !== undefined;
          const isCompleted = hasSelection && index < currentStep;
          const isActive = index === currentStep;
          const isPending = !isCompleted && !isActive;
          const isClickable = isCompleted;

          const RoleIcon = ROLE_ICONS[role.id] || User;

          return (
            <button
              key={role.id}
              type="button"
              onClick={() => isClickable && onStepClick(index)}
              disabled={isPending}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-left transition-all ${
                isCompleted
                  ? "bg-green-50 hover:bg-green-100 cursor-pointer"
                  : isActive
                  ? "bg-green-50"
                  : "bg-slate-50 cursor-default"
              }`}
            >
              {/* Icon bubble */}
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  isCompleted || isActive ? "bg-[#138601]" : "bg-slate-200"
                }`}
              >
                <RoleIcon
                  size={15}
                  className={isCompleted || isActive ? "text-white" : "text-slate-400"}
                />
              </div>

              {/* Label */}
              <span
                className={`flex-1 text-sm font-semibold truncate ${
                  isCompleted || isActive ? "text-[#138601]" : "text-slate-400"
                }`}
              >
                {role.title}
              </span>

              {/* Right indicator */}
              {isCompleted && (
                <div className="w-6 h-6 rounded-full border-2 border-[#138601] flex items-center justify-center shrink-0">
                  <Check size={11} className="text-[#138601]" strokeWidth={3} />
                </div>
              )}
              {isActive && (
                <span className="px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[9px] font-bold uppercase tracking-wide shrink-0">
                  Voting
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* NOTE box */}
      <div className="mx-3 mb-4 p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
        <div className="flex items-center gap-1.5 mb-1.5">
          <Info size={13} className="text-amber-600 shrink-0" />
          <p className="text-[10px] font-bold text-amber-700 uppercase tracking-widest">Note</p>
        </div>
        <p className="text-[11px] text-amber-700 leading-relaxed">
          You can only vote once per category. Choices are final once you click "Submit Ballot" at the end.
        </p>
      </div>
    </div>
  );
};

export default ProgressSidebar;
