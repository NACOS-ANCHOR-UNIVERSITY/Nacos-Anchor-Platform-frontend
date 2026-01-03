export default function ResumeCard() {
  return (
    <div className="rounded-xl border bg-white p-5">
      <h3 className="font-semibold mb-2">Resume / CV</h3>
      <input type="file" accept="application/pdf" />
      <p className="text-xs text-slate-500 mt-1">
        PDF only (max 5MB)
      </p>
    </div>
  );
}
