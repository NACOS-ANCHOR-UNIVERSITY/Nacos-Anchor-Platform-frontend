export default function SkillsSection({ skills, onRemove }) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <h3 className="mb-3 font-semibold text-slate-900">Skills</h3>

      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <span
            key={skill}
            className="inline-flex items-center gap-2 rounded-full
              border border-[color-mix(in_srgb,var(--color-brand-primary)_25%,white)]
              bg-[color-mix(in_srgb,var(--color-brand-primary)_10%,white)]
              px-3 py-1 text-xs font-medium
              text-[var(--color-brand-primary)]"
          >
            {skill}

            <button
              onClick={() => onRemove(skill)}
              className="rounded-full px-1 text-xs
                hover:bg-[color-mix(in_srgb,var(--color-brand-primary)_15%,white)]"
              aria-label={`Remove ${skill}`}
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
