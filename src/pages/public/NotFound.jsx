import React from "react";
import { Link, useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 text-center">
      {/* Visual Icon/Illustration */}
      <div className="mb-8">
        <svg
          className="w-40 h-40 text-brand-primary mx-auto"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1.5"
            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </div>

      {/* Text Content */}
      <h1 className="text-9xl font-extrabold text-brand-primary tracking-widest">
        404
      </h1>
      <div className="bg-blue-100 px-2 text-sm rounded rotate-12 absolute">
        Page Not Found
      </div>

      <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mt-4 mb-2">
        Oops! We can't find that page.
      </h2>
      <p className="text-gray-600 text-lg mb-8 max-w-md mx-auto">
        The page you are looking for might have been removed, had its name
        changed, or is temporarily unavailable.
      </p>

      {/* Action Buttons */}
      <div className="flex flex-col md:flex-row gap-4">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 cursor-pointer"
        >
          Go Back
        </button>

        <Link
          to="/"
          className="px-6 py-3 rounded-lg bg-brand-primary text-white font-medium hover:bg-brand-primary/80 transition duration-300 focus:outline-none focus:ring-2 focus:ring-brand-primary shadow-lg shadow-brand-primary/30"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFound;

