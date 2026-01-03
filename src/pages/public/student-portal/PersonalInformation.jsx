import { Link } from "react-router-dom";

export default function PersonalInformation() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 py-10">
        <div className="rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-[color:var(--color-brand-primary)]">Step 1 of 2</p>
              <h1 className="mt-1 text-2xl font-semibold text-gray-900">Personal Information</h1>
              <p className="mt-2 text-sm text-gray-600">
                This step is a placeholder so the Back button on Step 2 works.
              </p>
            </div>
            <Link
              to="/student-portal/academic-details"
              className="inline-flex items-center justify-center rounded-md bg-[color:var(--color-brand-primary)] px-5 py-2.5 text-sm font-medium text-white hover:opacity-95"
            >
              Continue
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
