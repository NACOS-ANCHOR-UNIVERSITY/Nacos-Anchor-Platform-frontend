import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaTwitter,
  FaInstagram,
  FaDiscord,
} from "react-icons/fa";

import InquiryOptions from "../components/shared/InquiryOptions";

export default function Contact() {
  return (
    <section className="bg-[#f7f9f4] py-16">
      {/* Title */}
      <div className="text-center mb-14">
        <h1 className="text-4xl font-bold">Contact Us</h1>
        <p className="text-gray-500 mt-2">
          Any question or remarks? Just write us a message!
        </p>
      </div>

      {/* Card */}
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg grid md:grid-cols-2 overflow-hidden">
        
        {/* LEFT GREEN SECTION */}
        <div className="bg-green-700 text-white p-10 relative">
          <h2 className="text-2xl font-semibold">Contact Information</h2>
          <p className="text-green-100 mt-2">
            Say something to start a live chat!
          </p>

          <div className="mt-10 space-y-6 text-sm">
            <div className="flex items-center gap-4">
              <FaPhoneAlt />
              <span>+234 123 4567 890</span>
            </div>

            <div className="flex items-center gap-4">
              <FaEnvelope />
              <span>info@nacosanchor.edu.ng</span>
            </div>

            <div className="flex items-center gap-4">
              <FaMapMarkerAlt />
              <span>
                Anchor University, Lagos. <br />
                Ayobo Road, Ipaja.
              </span>
            </div>
          </div>

          {/* Social Icons */}
          <div className="flex gap-4 mt-12">
            <span className="bg-black text-white p-2 rounded-full">
              <FaTwitter />
            </span>
            <span className="bg-white text-black p-2 rounded-full">
              <FaInstagram />
            </span>
            <span className="bg-black text-white p-2 rounded-full">
              <FaDiscord />
            </span>
          </div>

          {/* Decorative Circles */}
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
          <div className="absolute bottom-10 right-10 w-24 h-24 bg-green-100 rounded-full"></div>
        </div>

        {/* RIGHT FORM SECTION */}
        <div className="p-10">
          <form className="space-y-6">
            
            {/* Names */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-gray-600">First Name</label>
                <input
                  type="text"
                  placeholder="John"
                  className="w-full border-b border-gray-300 focus:border-green-700 outline-none py-2"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Last Name</label>
                <input
                  type="text"
                  placeholder="Doe"
                  className="w-full border-b border-gray-300 focus:border-green-700 outline-none py-2"
                />
              </div>
            </div>

            {/* Email + Phone */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-gray-600">Email</label>
                <input
                  type="email"
                  placeholder="johndoe@example.com"
                  className="w-full border-b border-gray-300 focus:border-green-700 outline-none py-2"
                />
              </div>

              <div>
                <label className="text-sm text-gray-600">Phone Number</label>
                <input
                  type="text"
                  placeholder="+234 814 625 1103"
                  className="w-full border-b border-gray-300 focus:border-green-700 outline-none py-2"
                />
              </div>
            </div>

            {/* SUBJECT (Reusable Component) */}
            <InquiryOptions />

            {/* Message */}
            <div>
              <label className="text-sm text-gray-600">Message</label>
              <textarea
                rows="3"
                placeholder="Write your message..."
                className="w-full border-b border-gray-300 focus:border-green-700 outline-none py-2 resize-none"
              ></textarea>
            </div>

            {/* Button */}
            <div className="text-right">
              <button
                type="submit"
                className="bg-green-700 text-white px-8 py-3 rounded-md hover:bg-green-800 transition"
              >
                Send Message
              </button>
            </div>

          </form>
        </div>
      </div>
    </section>
  );
}
