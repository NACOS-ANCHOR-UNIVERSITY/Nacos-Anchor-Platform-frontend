import { useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import InitialsAvatar from "../../../components/shared/InitialsAvatar";

export default function SignupStep2() {
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
      <div className="flex min-h-screen flex-col">
        <header className="bg-transparent border-b border-gray-200/60">
          <div className="mx-auto grid max-w-6xl grid-cols-12 items-center gap-4 px-4 py-4">
            <div className="col-span-12 flex items-center justify-between md:col-span-3 md:justify-start">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded bg-[color:var(--color-brand-primary)]/10" />
              </div>
            </div>

            <nav className="col-span-12 hidden justify-center gap-7 text-sm font-semibold text-gray-700 md:col-span-6 md:flex">
              <a className="hover:text-gray-900" href="#">
                Home
              </a>
              <a className="hover:text-gray-900" href="#">
                About Us
              </a>
              <a className="hover:text-gray-900" href="#">
                Executives
              </a>
              <a className="hover:text-gray-900" href="#">
                Events
              </a>
              <a className="hover:text-gray-900" href="#">
                Contact
              </a>
            </nav>

            <div className="col-span-12 flex items-center justify-end gap-3 md:col-span-3">
              <div className="hidden items-center gap-2 rounded-md bg-[color:var(--color-brand-primary)]/5 px-3 py-2 ring-1 ring-[color:var(--color-brand-primary)]/10 md:flex">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0 text-[color:var(--color-brand-primary)]/60">
                  <path d="M11 19a8 8 0 1 1 0-16 8 8 0 0 1 0 16z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
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

        <main className="flex-1">
          <div className="mx-auto max-w-6xl px-4 py-14">
            <div className="mx-auto overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-gray-200">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="bg-[radial-gradient(80%_60%_at_18%_10%,rgba(16,185,129,0.22)_0%,rgba(16,185,129,0.10)_35%,rgba(16,185,129,0)_70%),radial-gradient(85%_70%_at_22%_62%,rgba(16,185,129,0.18)_0%,rgba(16,185,129,0.08)_40%,rgba(16,185,129,0)_75%),linear-gradient(to_bottom,rgba(236,253,245,1)_0%,rgba(240,253,250,1)_45%,rgba(236,253,245,0.9)_100%)] p-8 lg:p-10">
                  <div className="inline-flex items-center gap-3 text-lg font-semibold tracking-tight text-[color:var(--color-brand-primary)]">
                    <svg
                      width="28"
                      height="28"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-[color:var(--color-brand-primary)]"
                    >
                      <path
                        d="M12 2l2.3 2.3 3.2-.6.9 3.1 3.1.9-.6 3.2L22 12l-2.3 2.3.6 3.2-3.1.9-.9 3.1-3.2-.6L12 22l-2.3-2.3-3.2.6-.9-3.1-3.1-.9.6-3.2L2 12l2.3-2.3-.6-3.2 3.1-.9.9-3.1 3.2.6L12 2z"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M8.5 12l2.3 2.3L15.8 9.3"
                        stroke="currentColor"
                        strokeWidth="1.8"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    Student Portal
                  </div>

                  <h1 className="mt-6 max-w-sm text-3xl font-semibold tracking-tight text-gray-900">
                    Unlock your academic potential
                  </h1>
                  <p className="mt-4 max-w-md text-sm leading-6 text-gray-600">
                    Join the digital ecosystem for Anchor University computer science students. Access exclusive resources, track your dues, and network with industry leaders.
                  </p>

                  <div className="mt-8 space-y-3">
                    <div className="flex items-start gap-3 rounded-xl bg-white/70 p-4 shadow-md shadow-black/5 backdrop-blur-lg ring-1 ring-white/70">
                      <div className="mt-0.5 grid h-10 w-10 place-items-center rounded-full bg-[color:var(--color-brand-primary)]/12 text-[color:var(--color-brand-primary)]">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6.5 5.5h11v13h-11v-13z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
                          <path d="M9 9h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                          <path d="M9 12h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Course Materials</p>
                        <p className="text-xs text-gray-600">Past questions & lecture notes</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-xl bg-white/70 p-4 shadow-md shadow-black/5 backdrop-blur-lg ring-1 ring-white/70">
                      <div className="mt-0.5 grid h-10 w-10 place-items-center rounded-full bg-[color:var(--color-brand-primary)]/12 text-[color:var(--color-brand-primary)]">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8 11.2c1.5 0 2.7-1.2 2.7-2.7S9.5 5.8 8 5.8 5.3 7 5.3 8.5 6.5 11.2 8 11.2z" stroke="currentColor" strokeWidth="1.8" />
                          <path d="M16 11.2c1.5 0 2.7-1.2 2.7-2.7S17.5 5.8 16 5.8s-2.7 1.2-2.7 2.7 1.2 2.7 2.7 2.7z" stroke="currentColor" strokeWidth="1.8" />
                          <path d="M3.5 18.2c.9-2.3 2.9-3.8 5.3-3.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                          <path d="M20.5 18.2c-.9-2.3-2.9-3.8-5.3-3.8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                          <path d="M9.2 14.4h5.6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Community Hub</p>
                        <p className="text-xs text-gray-600">Connect with alumni & peers</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex items-center gap-3">
                    <div className="flex -space-x-2">
                      <InitialsAvatar name="John Doe" size="md" />
                      <InitialsAvatar name="Alice Brown" size="md" />
                      <InitialsAvatar name="Mike Kim" size="md" />
                    </div>
                    <p className="text-xs text-gray-600">
                      <span className="font-semibold text-gray-900">Joined</span> by 500+ students
                    </p>
                  </div>
                </div>

                <div className="p-8 lg:p-10">
                  <div>
                    <p className="text-xs font-semibold text-[color:var(--color-brand-primary)]">Step 2 of 2</p>
                    <div className="mt-1 flex items-center justify-between gap-4">
                      <h2 className="text-2xl font-bold text-gray-900">Academic Details</h2>
                      <p className="text-xs text-gray-400">Previous: Personal Information</p>
                    </div>
                  </div>

                  <div className="mt-4 h-2 w-full rounded-full bg-gray-100">
                    <div className="h-2 w-full rounded-full bg-[color:var(--color-brand-primary)]" />
                  </div>

                  <form onSubmit={onSubmit} className="mt-6 space-y-5">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <label className="block">
                        <span className="text-xs font-semibold text-gray-700">Department</span>
                        <input
                          value={department}
                          onChange={(e) => setDepartment(e.target.value)}
                          placeholder="e.g. Computing"
                          className="mt-1 h-10 w-full rounded-md border border-gray-200 bg-gray-50 px-3 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:border-[color:var(--color-brand-primary)] focus:ring-2 focus:ring-[color:var(--color-brand-primary)]/20"
                        />
                      </label>
                      <label className="block">
                        <span className="text-xs font-semibold text-gray-700">Level</span>
                        <input
                          value={level}
                          onChange={(e) => setLevel(e.target.value)}
                          placeholder="e.g. 300 level"
                          className="mt-1 h-10 w-full rounded-md border border-gray-200 bg-gray-50 px-3 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:border-[color:var(--color-brand-primary)] focus:ring-2 focus:ring-[color:var(--color-brand-primary)]/20"
                        />
                      </label>
                    </div>

                    <label className="block">
                      <span className="text-xs font-semibold text-gray-700">Matric number</span>
                      <input
                        value={matricNumber}
                        onChange={(e) => setMatricNumber(e.target.value)}
                        placeholder="e.g. AUL/CMP/22/003"
                        className="mt-1 h-10 w-full rounded-md border border-gray-200 bg-gray-50 px-3 text-sm text-gray-800 outline-none placeholder:text-gray-400 focus:border-[color:var(--color-brand-primary)] focus:ring-2 focus:ring-[color:var(--color-brand-primary)]/20"
                      />
                      <p className="mt-2 text-[11px] leading-5 text-gray-500">
                        Please upload or take a clear picture as it will be used on your ID card.
                      </p>
                    </label>

                    <div>
                      <p className="text-xs font-semibold text-gray-700">Upload profile picture</p>

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
                        className="mt-2 h-10 w-full rounded-md border border-gray-200 bg-gray-50 px-3 text-left text-sm text-gray-400"
                      >
                        {fileLabel}
                      </button>

                      <p className="mt-2 text-[11px] leading-5 text-gray-500">
                        Please upload or take a clear picture as it will be used on your ID card.
                      </p>
                    </div>

                    <div className="flex items-center justify-between gap-3 pt-2">
                      <Link
                        to="/signup"
                        className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                          <path d="M19 12H5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          <path d="M11 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        Back
                      </Link>

                      <button
                        type="submit"
                        className="inline-flex items-center justify-center gap-2 rounded-md bg-[color:var(--color-brand-primary)] px-8 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-95"
                      >
                        Submit
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="shrink-0">
                          <path d="M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                          <path d="M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </button>
                    </div>

                    <p className="pt-3 text-center text-xs text-gray-600">
                      Already have an account?{" "}
                      <a className="font-semibold text-[color:var(--color-brand-primary)]" href="#">
                        Log in
                      </a>
                    </p>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="mt-auto pb-6">
          <p className="text-center text-xs text-gray-400">
            © 2026 NACOS Anchor University Chapter. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
}
