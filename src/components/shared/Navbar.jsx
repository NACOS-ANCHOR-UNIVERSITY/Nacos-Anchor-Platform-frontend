import { Link } from "react-router-dom";
import logo from "../../assets/download.png";

export default function Navbar() {
  return (
    <header className="w-full bg-green-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        
        {/* LOGO */}
        <Link to="/" className="flex items-center">
          <img
            src={logo}
            alt="NACOS Anchor University Logo"
            className="h-8 sm:h-10 w-auto"
          />
        </Link>

        {/* NAV LINKS (Desktop only) */}
        <nav className="hidden md:flex items-center gap-8 text-gray-700 font-medium">
          <Link to="/" className="hover:text-green-700">
            Home
          </Link>
          <Link to="/about" className="hover:text-green-700">
            About Us
          </Link>
          <Link to="/executives" className="hover:text-green-700">
            Executives
          </Link>
          <Link to="/events" className="hover:text-green-700">
            Events
          </Link>
          <Link
            to="/contact"
            className="text-green-700 font-semibold"
          >
            Contact
          </Link>
        </nav>

        {/* SEARCH + LOGIN */}
        <div className="flex items-center gap-3 sm:gap-4">
          
          {/* Search (hidden on small screens) */}
          <div className="hidden md:flex items-center bg-green-100 px-4 py-2 rounded-full">
            <span className="mr-2 text-green-700">🔍</span>
            <input
              type="text"
              placeholder="Search..."
              className="bg-transparent outline-none text-sm w-32 placeholder-gray-500"
            />
          </div>

          {/* Login Button */}
          <button className="bg-green-700 text-white px-4 sm:px-5 py-2 rounded-lg text-sm sm:text-base hover:bg-green-800 transition">
            Login
          </button>
        </div>

      </div>
    </header>
  );
}
