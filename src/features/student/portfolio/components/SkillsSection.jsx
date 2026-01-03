export default function SkillsSection({ skills, onRemove }) {
  return (
    <div className="rounded-xl border bg-white p-5">
      <h3 className="font-semibold mb-3">Skills</h3>
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="rounded-full bg-emerald-100 px-3 py-1 text-xs text-emerald-700"
          >
            {skill}
            <button
              onClick={() => onRemove(skill)}
              className="ml-2 text-xs"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
