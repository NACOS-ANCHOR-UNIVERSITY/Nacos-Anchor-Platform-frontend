export default function ProjectsSection({ projects }) {
  return (
    <div>
      <h3 className="font-semibold mb-3">Featured Projects</h3>

      <div className="grid gap-4 md:grid-cols-2">
        {projects.map((p) => (
          <div key={p.id} className="rounded-xl border bg-white p-4">
            <h4 className="font-semibold">{p.title}</h4>
            <p className="text-sm text-slate-600 mt-1">
              {p.description}
            </p>

            <div className="mt-2 flex gap-2 flex-wrap">
              {p.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs bg-slate-100 px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}

        <button className="rounded-xl border border-dashed p-6 text-sm text-slate-500">
          + Add New Project
        </button>
      </div>
    </div>
  );
}
