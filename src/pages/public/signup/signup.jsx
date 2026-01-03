import { useState } from "react";
import { Link } from "react-router-dom";

export default function PersonalInformation() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-md bg-[color:var(--color-brand-primary)]/10" />
            <div className="leading-tight">
              <p className="text-xs font-semibold text-gray-700">NACOS</p>
              <p className="text-xs text-gray-500">Anchor University</p>
            </div>
          </div>

          <nav className="hidden items-center gap-6 text-sm text-gray-600 md:flex">
            <a className="hover:text-gray-900" href="#">Home</a>
            <a className="hover:text-gray-900" href="#">About Us</a>
            <a className="hover:text-gray-900" href="#">Executives</a>
            <a className="hover:text-gray-900" href="#">Events</a>
            <a className="hover:text-gray-900" href="#">Contact</a>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-md bg-gray-50 px-3 py-2 ring-1 ring-gray-200 md:flex">
              <div className="h-4 w-4 rounded bg-gray-200" />
              <input
                className="w-56 bg-transparent text-sm text-gray-700 outline-none placeholder:text-gray-400"
                placeholder="Search executives..."
              />
            </div>
            <button className="rounded-md bg-[color:var(--color-brand-primary)] px-4 py-2 text-sm font-medium text-white hover:opacity-95">
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
                  <p className="text-xs font-semibold text-[color:var(--color-brand-primary)]">Step 1 of 2</p>
                  <h2 className="mt-1 text-xl font-semibold text-gray-900">Personal Information</h2>
                </div>
                <p className="text-xs text-gray-400">Next: Academic Details</p>
              </div>

              <div className="mt-5 h-1.5 w-full rounded-full bg-gray-100">
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
                    className="mt-1 w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-[color:var(--color-brand-primary)] focus:ring-2 focus:ring-[color:var(--color-brand-primary)]/20"
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
                  <Link
                    to="/"
                    className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
                  >
                    <span aria-hidden="true">←</span>
                    Back
                  </Link>

                  <Link
                    to="/student-portal/academic-details"
                    className="inline-flex items-center justify-center gap-2 rounded-md bg-[color:var(--color-brand-primary)] px-6 py-2.5 text-sm font-medium text-white hover:opacity-95"
                  >
                    Next Step
                    <span aria-hidden="true">→</span>
                  </Link>
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
