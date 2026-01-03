export default function ProfileCard({ profile, isPublic, onToggle }) {
  return (
    <div className="rounded-xl border bg-white p-5 text-center">
      <div className="mx-auto h-20 w-20 rounded-full bg-slate-200" />
      <h3 className="mt-3 font-bold">{profile.fullName}</h3>
      <p className="text-sm text-emerald-700">
        {profile.department} | {profile.level}
      </p>
      <p className="text-xs text-slate-500 mt-1">
        Matric No: {profile.matricNo}
      </p>

      <div className="mt-4 flex items-center justify-between rounded-lg bg-slate-50 p-3">
        <span className="text-sm">Public Visibility</span>
        <input
          type="checkbox"
          checked={isPublic}
          onChange={onToggle}
          className="accent-emerald-600"
        />
      </div>
    </div>
  );
}
