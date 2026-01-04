import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function SignupStep1() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const onBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }
    navigate("/signup", { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex min-h-screen flex-col">
        <header className="border-b border-gray-200 bg-white">
          <div className="mx-auto grid max-w-6xl grid-cols-12 items-center gap-4 px-4 py-4">
            <div className="col-span-12 flex items-center justify-between md:col-span-3 md:justify-start">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded bg-[color:var(--color-brand-primary)]/10" />
                <div className="leading-tight">
                  <p className="text-[11px] font-semibold tracking-wide text-[color:var(--color-brand-primary)]">
                    NACOS NATIONAL
                  </p>
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

        <main className="flex-1">
          <div className="mx-auto max-w-6xl px-4 py-14">
            <div className="mx-auto overflow-hidden rounded-2xl bg-white shadow-md ring-1 ring-gray-200">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="bg-[color:var(--color-brand-primary)]/5 p-8 lg:p-10">
                  <div className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm font-semibold text-[color:var(--color-brand-primary)] ring-1 ring-[color:var(--color-brand-primary)]/15">
                    <span className="grid h-5 w-5 place-items-center rounded-full bg-[color:var(--color-brand-primary)]/10">
                      <span className="h-2 w-2 rounded-full bg-[color:var(--color-brand-primary)]" />
                    </span>
                    Student Portal
                  </div>

                  <h1 className="mt-6 max-w-sm text-3xl font-semibold tracking-tight text-gray-900">
                    Unlock your academic potential
                  </h1>
                  <p className="mt-4 max-w-md text-sm leading-6 text-gray-600">
                    Join the digital ecosystem for Anchor University computer science students. Access exclusive resources, track your dues, and network with industry leaders.
                  </p>

                  <div className="mt-8 space-y-3">
                    <div className="flex items-start gap-3 rounded-xl bg-white p-4 ring-1 ring-[color:var(--color-brand-primary)]/10">
                      <div className="mt-0.5 grid h-8 w-8 place-items-center rounded-lg bg-[color:var(--color-brand-primary)]/10">
                        <div className="h-4 w-4 rounded bg-[color:var(--color-brand-primary)]/25" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900">Course Materials</p>
                        <p className="text-xs text-gray-600">Past questions & lecture notes</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3 rounded-xl bg-white p-4 ring-1 ring-[color:var(--color-brand-primary)]/10">
                      <div className="mt-0.5 grid h-8 w-8 place-items-center rounded-lg bg-[color:var(--color-brand-primary)]/10">
                        <div className="h-4 w-4 rounded bg-[color:var(--color-brand-primary)]/25" />
                      </div>
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
                      <p className="text-xs font-semibold text-[color:var(--color-brand-primary)]">Step 1 of 2</p>
                      <h2 className="mt-1 text-xl font-semibold text-gray-900">Personal Information</h2>
                    </div>
                    <p className="text-xs text-gray-400">Next: Academic Details</p>
                  </div>

                  <div className="mt-4 h-1.5 w-full rounded-full bg-gray-100">
                    <div className="h-1.5 w-1/2 rounded-full bg-[color:var(--color-brand-primary)]" />
                  </div>

                  <form className="mt-6 space-y-5">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                      <label className="block">
                        <span className="text-xs font-medium text-gray-700">First Name</span>
                        <div className="mt-1 flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 focus-within:border-[color:var(--color-brand-primary)] focus-within:ring-2 focus-within:ring-[color:var(--color-brand-primary)]/20">
                          <input
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            placeholder="e.g. Ade"
                            className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
                          />
                          <div className="h-4 w-4 rounded bg-gray-200" />
                        </div>
                      </label>

                      <label className="block">
                        <span className="text-xs font-medium text-gray-700">Last Name</span>
                        <div className="mt-1 flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 focus-within:border-[color:var(--color-brand-primary)] focus-within:ring-2 focus-within:ring-[color:var(--color-brand-primary)]/20">
                          <input
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="e.g. Oluwaseun"
                            className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
                          />
                          <div className="h-4 w-4 rounded bg-gray-200" />
                        </div>
                      </label>
                    </div>

                    <label className="block">
                      <span className="text-xs font-medium text-gray-700">University Email Address</span>
                      <input
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="student@anchoru.edu.ng"
                        className="mt-1 w-full rounded-md border border-gray-200 bg-gray-50 px-3 py-2 text-sm outline-none focus:border-[color:var(--color-brand-primary)] focus:ring-2 focus:ring-[color:var(--color-brand-primary)]/20"
                      />
                      <p className="mt-2 text-[11px] text-gray-500">
                        Please use your official university email for verification.
                      </p>
                    </label>

                    <label className="block">
                      <span className="text-xs font-medium text-gray-700">Phone Number</span>
                      <div className="mt-1 flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2 focus-within:border-[color:var(--color-brand-primary)] focus-within:ring-2 focus-within:ring-[color:var(--color-brand-primary)]/20">
                        <div className="h-4 w-4 rounded bg-gray-200" />
                        <input
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+234 800 000 0000"
                          className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
                        />
                      </div>
                    </label>

                    <div className="flex items-center justify-between gap-3 pt-2">
                      <button
                        type="button"
                        onClick={onBack}
                        className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                      >
                        <span aria-hidden="true">←</span>
                        Back
                      </button>

                      <Link
                        to="/signup/academic-details"
                        className="inline-flex items-center justify-center gap-2 rounded-md bg-[color:var(--color-brand-primary)] px-8 py-2.5 text-sm font-semibold text-white shadow-sm hover:opacity-95"
                      >
                        Next Step
                        <span aria-hidden="true">→</span>
                      </Link>
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
