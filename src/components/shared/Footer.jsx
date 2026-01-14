import React from 'react';
import { MapPin, Mail, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-12 mt-16">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* NACOS Anchor Section */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full flex items-center justify-center">
                <img src="/footer.svg"/>
              </div>
              <h3 className="text-lg font-bold text-gray-900">NACOS Anchor</h3>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              The official student body for the Department of Computer Science at Anchor University, Lagos.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">
              Quick Links
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="/about" className="text-sm text-gray-600 hover:text-[#128401] transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/executives" className="text-sm text-gray-600 hover:text-[#128401] transition-colors">
                  Executive Team
                </a>
              </li>
              <li>
                <a href="/constitution" className="text-sm text-gray-600 hover:text-[#128401] transition-colors">
                  Constitution
                </a>
              </li>
              <li>
                <a href="/events" className="text-sm text-gray-600 hover:text-[#128401] transition-colors">
                  Events Calendar
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">
              Resources
            </h4>
            <ul className="space-y-3">
              <li>
                <a href="/portal" className="text-sm text-gray-600 hover:text-[#128401] transition-colors">
                  Student Portal
                </a>
              </li>
              <li>
                <a href="/dues" className="text-sm text-gray-600 hover:text-[#128401] transition-colors">
                  Pay Dues
                </a>
              </li>
              <li>
                <a href="/library" className="text-sm text-gray-600 hover:text-[#128401] transition-colors">
                  Academic Library
                </a>
              </li>
              <li>
                <a href="/questions" className="text-sm text-gray-600 hover:text-[#128401] transition-colors">
                  Past Questions
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wide">
              Contact
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#128401] mt-0.5 flex-shrink-0" />
                <span className="text-sm text-gray-600">
                  Anchor University, Lagos. Ayobo Road, Ipaja.
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-[#128401] mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:info@nacosanchor.edu.ng"
                  className="text-sm text-gray-600 hover:text-[#128401] transition-colors"
                >
                  info@nacosanchor.edu.ng
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-600">
            © 2026 NACOS Anchor University. All rights reserved.
          </p>

          {/* Social Media Icons */}
          <div className="flex items-center gap-3">
            <a
              href="https://twitter.com/nacosanchor"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#128401] hover:text-white transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-4 h-4" />
            </a>
            <a
              href="https://instagram.com/nacosanchor"
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 hover:bg-[#128401] hover:text-white transition-colors"
              aria-label="Instagram"
            >
              <Instagram className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

