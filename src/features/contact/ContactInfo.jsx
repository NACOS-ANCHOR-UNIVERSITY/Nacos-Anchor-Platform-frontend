// src/features/contact/ContactInfo.jsx
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

const ContactInfo = () => {
  return (
    <div className="relative bg-nacos-green text-white p-8 rounded-2xl overflow-hidden h-full">
      {/* Decorative Circles */}
      <div className="absolute -bottom-16 -right-16 w-44 h-44 bg-white rounded-full opacity-20"></div>
      <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-green-100 rounded-full opacity-40"></div>

      <div className="relative z-10">
        <h2 className="text-2xl font-semibold mb-3">Contact Information</h2>
        <p className="text-green-100 text-base mb-6">
          Say something to start a live chat!
        </p>

        <div className="space-y-4 text-sm">
          <div className="flex items-center gap-3">
            <FaPhoneAlt className="text-base flex-shrink-0" />
            <span>+234 123 4567 890</span>
          </div>
          <div className="flex items-center gap-3">
            <FaEnvelope className="text-base flex-shrink-0" />
            <span>info@nacosanchor.edu.ng</span>
          </div>
          <div className="flex items-start gap-3">
            <FaMapMarkerAlt className="text-base flex-shrink-0 mt-0.5" />
            <span>
              Anchor University, Lagos.<br />
              Ayobo Road, Ipaja.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactInfo;