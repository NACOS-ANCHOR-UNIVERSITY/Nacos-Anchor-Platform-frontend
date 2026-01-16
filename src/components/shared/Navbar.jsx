// src/components/shared/Navbar.jsx
import { Link, useLocation } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const Navbar = () => {
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Executives', path: '/executives' },
    { name: 'Events', path: '/events' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo-header.png" alt="NACOS National" className="h-8" />
          </Link>

          {/* Nav Links – Green "Contact" when active (Matches Image 1) */}
          <div className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium ${
                  location.pathname === link.path
                    ? 'text-nacos-green' // 👈 Green when on /contact
                    : 'text-gray-700 hover:text-nacos-green'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Search + Login */}
          <div className="flex items-center space-x-4">
            <div className="relative ml-4">
              <input
                type="text"
                placeholder="Search executives..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-nacos-green"
              />
              <FaSearch className="absolute left-3 top-2.5 text-gray-500" />
            </div>
            <button className="bg-nacos-green hover:bg-[#0f6a01] text-white px-4 py-2 rounded-md text-sm font-medium">
              Login
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;