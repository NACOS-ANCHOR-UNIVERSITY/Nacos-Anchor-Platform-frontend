// src/components/shared/Footer.jsx
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 pt-16 pb-8 px-4 sm:px-6 md:px-12 lg:px-80">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo & About */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <img 
                src="/logo-footer.png" 
                alt="NACOS Anchor" 
                className="h-8"
              />
              <h3 className="font-bold text-gray-800">NACOS Anchor</h3>
            </div>
            <p className="text-sm text-gray-600">
              The official student body for the Department of Computer Science at Anchor University, Lagos.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">QUICK LINKS</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/about" className="hover:text-nacos-green transition-colors">About Us</Link></li>
              <li><Link to="/executives" className="hover:text-nacos-green transition-colors">Executive Team</Link></li>
              <li><Link to="/constitution" className="hover:text-nacos-green transition-colors">Constitution</Link></li>
              <li><Link to="/events" className="hover:text-nacos-green transition-colors">Events Calendar</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">RESOURCES</h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li><Link to="/student-portal" className="hover:text-nacos-green transition-colors">Student Portal</Link></li>
              <li><Link to="/pay-dues" className="hover:text-nacos-green transition-colors">Pay Dues</Link></li>
              <li><Link to="/library" className="hover:text-nacos-green transition-colors">Academic Library</Link></li>
              <li><Link to="/past-questions" className="hover:text-nacos-green transition-colors">Past Questions</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">CONTACT</h4>
            <div className="space-y-3 text-sm text-gray-600">
              {/* Location */}
              <div className="flex items-start space-x-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-nacos-green mt-0.5 flex-shrink-0"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.995 1.995 0 01-2.828 0l-4.244-4.244a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>Anchor University, Lagos.<br />Ayobo Road, Ipaja.</span>
              </div>

              {/* EMAIL — USING YOUR CUSTOM IMAGE */}
              <div className="flex items-center space-x-2">
                {/* 👇 REPLACE THIS WITH YOUR EMAIL LOGO PATH */}
                <img 
                  src="/email-icon.png" 
                  alt="Email" 
                  className="h-5 w-5"
                />
                <span>info@nacosanchor.edu.ng</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;