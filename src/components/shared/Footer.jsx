import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white text-shadow-neutral-900 py-6 mt-12">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
        <p className="text-sm text-shadow-neutral-900">
            © 2026 NACOS Anchor University. All rights reserved.
          </p>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center">
          
          <div className="flex items-center gap-4">
            <a
              href="/contact"
              className="text-sm text-green-400 hover:text-green-300 transition-colors"
            >
              Contact Support
            </a>
            <span className="text-gray-500">•</span>
            <a
              href="/report"
              className="text-sm text-green-400 hover:text-green-300 transition-colors"
            >
              Report Errors
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

