import {
  FaMapMarkerAlt,
  FaEnvelope,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">

          {/* BRAND */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-green-700 font-bold text-lg">
                NACOS Anchor
              </span>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed">
              The official student body for the Department of Computer
              Science at Anchor University, Lagos.
            </p>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">
              QUICK LINKS
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="hover:text-green-700 cursor-pointer">About Us</li>
              <li className="hover:text-green-700 cursor-pointer">Executive Team</li>
              <li className="hover:text-green-700 cursor-pointer">Constitution</li>
              <li className="hover:text-green-700 cursor-pointer">Events Calendar</li>
            </ul>
          </div>

          {/* RESOURCES */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">
              RESOURCES
            </h4>
            <ul className="space-y-2 text-sm text-gray-600">
              <li className="hover:text-green-700 cursor-pointer">Student Portal</li>
              <li className="hover:text-green-700 cursor-pointer">Pay Dues</li>
              <li className="hover:text-green-700 cursor-pointer">Academic Library</li>
              <li className="hover:text-green-700 cursor-pointer">FAQs</li>
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-4">
              CONTACT
            </h4>

            <div className="space-y-4 text-sm text-gray-600">
              <div className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-green-700 mt-1" />
                <span>
                  Anchor University, Lagos. <br />
                  Ayobo Road, Ipaja.
                </span>
              </div>

              <div className="flex items-center gap-3">
                <FaEnvelope className="text-green-700" />
                <span className="break-all">
                  info@nacosanchor.edu.ng
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t mt-10 pt-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} NACOS Anchor University. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
