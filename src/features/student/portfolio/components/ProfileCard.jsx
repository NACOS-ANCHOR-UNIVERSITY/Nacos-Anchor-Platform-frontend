export default function ProfileCard({ profile, isPublic, onToggle }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 text-center">
      <div className="mx-auto h-20 w-20 rounded-full bg-slate-200" />

      <h3 className="mt-3 font-bold text-slate-900">
        {profile.fullName}
      </h3>

      <p className="text-sm font-semibold text-[var(--color-brand-primary)]">
        {profile.department} | {profile.level}
      </p>

      <p className="mt-1 text-xs text-slate-500">
        Matric No: {profile.matricNo}
      </p>

      {/* Public visibility */}
      <div className="mt-4 flex items-center justify-between rounded-lg bg-slate-50 p-3">
        <span className="text-sm text-slate-700">Public Visibility</span>

        {/* checkbox styled via accent-color */}
        <input
          type="checkbox"
          checked={isPublic}
          onChange={onToggle}
          className="h-4 w-4 accent-[var(--color-brand-primary)]"
        />
      </div>
    </div>
  );
}
