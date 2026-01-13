export default function AboutSection({ about, onChange }) {
  return (
    <div className="rounded-xl border bg-white p-5">
      <h3 className="font-semibold mb-2">About Me</h3>
      <textarea
        value={about}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border p-3 text-sm"
        rows={4}
      />
    </div>
  );
}
