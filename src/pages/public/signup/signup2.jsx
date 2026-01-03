import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";

export default function AcademicDetails() {
  const inputRef = useRef(null);
  const [department, setDepartment] = useState("");
  const [level, setLevel] = useState("");
  const [matricNumber, setMatricNumber] = useState("");
  const [file, setFile] = useState(null);

  const fileLabel = useMemo(() => {
    if (!file) return "Upload a picture (jpeg, png)";
    return file.name;
  }, [file]);

  const onPickFile = () => inputRef.current?.click();

  const onSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto grid max-w-6xl grid-cols-12 items-center gap-4 px-4 py-4">
          <div className="col-span-12 flex items-center justify-between md:col-span-3 md:justify-start">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded bg-[color:var(--color-brand-primary)]/10" />
              <div className="leading-tight">
                <p className="text-[11px] font-semibold tracking-wide text-[color:var(--color-brand-primary)]">NACOS NATIONAL</p>
              </div>
            </div>
          </div>

          <nav className="col-span-12 hidden justify-center gap-7 text-sm text-gray-700 md:col-span-6 md:flex">
            <a className="hover:text-gray-900" href="#">Home</a>
            <a className="hover:text-gray-900" href="#">About Us</a>
            <a className="hover:text-gray-900" href="#">Executives</a>
            <a className="hover:text-gray-900" href="#">Events</a>
            <a className="hover:text-gray-900" href="#">Contact</a>
          </nav>

          <div className="col-span-12 flex items-center justify-end gap-3 md:col-span-3">
            <div className="hidden items-center gap-2 rounded-md bg-[color:var(--color-brand-primary)]/5 px-3 py-2 ring-1 ring-[color:var(--color-brand-primary)]/10 md:flex">
              <div className="h-4 w-4 rounded bg-[color:var(--color-brand-primary)]/20" />
              <input
                className="w-44 bg-transparent text-sm text-gray-700 outline-none placeholder:text-[color:var(--color-brand-primary)]/60"
                placeholder="Search executives..."
              />
            </div>
            <button className="rounded-md bg-[color:var(--color-brand-primary)] px-4 py-2 text-sm font-medium text-white shadow-sm hover:opacity-95">
              Login
            </button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-12">
        <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-gray-200">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="bg-[color:var(--color-brand-secondary)] p-8 lg:p-10">
              <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm font-medium text-gray-700 ring-1 ring-gray-200">
                <span className="h-2 w-2 rounded-full bg-[color:var(--color-brand-primary)]" />
                Student Portal
              </div>

              <h1 className="mt-6 max-w-sm text-3xl font-semibold tracking-tight text-gray-900">
                Unlock your academic potential
              </h1>
              <p className="mt-4 max-w-md text-sm leading-6 text-gray-600">
                Join the digital ecosystem for Anchor University computer science students. Access exclusive resources, track your dues, and network with industry leaders.
              </p>

              <div className="mt-8 space-y-3">
                <div className="flex items-start gap-3 rounded-xl bg-white/70 p-4 ring-1 ring-gray-200">
                  <div className="mt-0.5 h-8 w-8 rounded-lg bg-[color:var(--color-brand-primary)]/10" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Course Materials</p>
                    <p className="text-xs text-gray-600">Past questions & lecture notes</p>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl bg-white/70 p-4 ring-1 ring-gray-200">
                  <div className="mt-0.5 h-8 w-8 rounded-lg bg-[color:var(--color-brand-primary)]/10" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900">Community Hub</p>
                    <p className="text-xs text-gray-600">Connect with alumni & peers</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-3">
                <div className="flex -space-x-2">
                  <div className="h-8 w-8 rounded-full bg-gray-300 ring-2 ring-white" />
                  <div className="h-8 w-8 rounded-full bg-gray-400 ring-2 ring-white" />
                  <div className="h-8 w-8 rounded-full bg-gray-500 ring-2 ring-white" />
                </div>
                <p className="text-xs text-gray-600">
                  <span className="font-semibold text-gray-900">Joined</span> by 500+ students
                </p>
              </div>
            </div>

            <div className="p-8 lg:p-10">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold text-[color:var(--color-brand-primary)]">Step 2 of 2</p>
                  <h2 className="mt-1 text-xl font-semibold text-gray-900">Academic Details</h2>
                </div>
                <p className="text-xs text-gray-400">Previous: Personal Information</p>
              </div>

              <div className="mt-5 h-1.5 w-full rounded-full bg-gray-100">
                <div className="h-1.5 w-1/2 rounded-full bg-[color:var(--color-brand-primary)]" />
              </div>

              <form onSubmit={onSubmit} className="mt-6 space-y-5">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <label className="block">
                    <span className="text-xs font-medium text-gray-700">Department</span>
                    <input
                      value={department}
                      onChange={(e) => setDepartment(e.target.value)}
                      placeholder="e.g. Computing"
                      className="mt-1 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-[color:var(--color-brand-primary)] focus:ring-2 focus:ring-[color:var(--color-brand-primary)]/20"
                    />
                  </label>

                  <label className="block">
                    <span className="text-xs font-medium text-gray-700">Level</span>
                    <input
                      value={level}
                      onChange={(e) => setLevel(e.target.value)}
                      placeholder="e.g. 300 level"
                      className="mt-1 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-[color:var(--color-brand-primary)] focus:ring-2 focus:ring-[color:var(--color-brand-primary)]/20"
                    />
                  </label>
                </div>

                <label className="block">
                  <span className="text-xs font-medium text-gray-700">Matric number</span>
                  <input
                    value={matricNumber}
                    onChange={(e) => setMatricNumber(e.target.value)}
                    placeholder="e.g. AUL/CMP/22/003"
                    className="mt-1 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-[color:var(--color-brand-primary)] focus:ring-2 focus:ring-[color:var(--color-brand-primary)]/20"
                  />
                </label>

                <div>
                  <p className="text-xs font-medium text-gray-700">Upload profile picture</p>
                  <p className="mt-1 text-[11px] text-gray-500">
                    Please upload or take a clear picture. It will be used on your ID card.
                  </p>

                  <input
                    ref={inputRef}
                    type="file"
                    accept="image/png,image/jpeg"
                    className="hidden"
                    onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                  />

                  <button
                    type="button"
                    onClick={onPickFile}
                    className="mt-3 flex w-full items-center justify-between gap-3 rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <span className="truncate text-gray-500">{fileLabel}</span>
                    <span className="shrink-0 rounded-md bg-white px-3 py-1 text-xs font-medium text-gray-700 ring-1 ring-gray-200">
                      Browse
                    </span>
                  </button>
                </div>

                <div className="flex items-center justify-between gap-3 pt-2">
                  <Link
                    to="/signup"
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                  >
                    <span aria-hidden="true">←</span>
                    Back
                  </Link>

                  <button
                    type="submit"
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-[color:var(--color-brand-primary)] px-6 py-2.5 text-sm font-medium text-white hover:opacity-95"
                  >
                    Submit
                    <span aria-hidden="true">→</span>
                  </button>
                </div>

                <p className="pt-3 text-center text-xs text-gray-600">
                  Already have an account? <a className="font-semibold text-[color:var(--color-brand-primary)]" href="#">Log in</a>
                </p>
              </form>
            </div>
          </div>
        </div>

        <p className="mt-10 text-center text-xs text-gray-400">
          © 2024 NACOS Anchor University Chapter. All rights reserved.
        </p>
      </main>
    </div>
  );
}
