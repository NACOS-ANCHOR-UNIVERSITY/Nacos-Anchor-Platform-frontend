import { FaGlobe, FaEnvelope } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">

      {/* Text */}
        <div className="text-center">
          <p className="text-sm font-semibold text-gray-800 tracking-wide">
            NACOS ANCHOR UNIVERSITY
          </p>
          <p className="text-xs text-gray-500 mt-1">
            © 2026 NATIONAL ASSOCIATION OF COMPUTER SCIENCE STUDENTS. ALL RIGHTS RESERVED
          </p>
        </div>

        {/* Icons */}
        <div className="flex items-center gap-6 text-xl text-gray-600">
          <a
            href="https://nacosanchor.edu.ng"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-black transition"
            aria-label="Website"
          >
            <FaGlobe />
          </a>

          <a
            href="mailto:info@nacosanchor.edu.ng"
            className="hover:text-black transition"
            aria-label="Email"
          >
            <FaEnvelope />
          </a>
        </div>
      </div>
    </footer>
  );
}
