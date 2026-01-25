// import {
//   FaPhoneAlt,
//   FaEnvelope,
//   FaMapMarkerAlt,
//   FaTwitter,
//   FaInstagram,
//   FaDiscord,
// } from "react-icons/fa";

// import InquiryOptions from "../../components/shared/InquiryOptions";

// export default function Contact() {
//   return (
//     <section className="bg-[#f7f9f4] py-10 px-4 sm:px-6">
//       {/* Title */}
//       <div className="text-center mb-10">
//         <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
//           Contact Us
//         </h1>
//         <p className="text-gray-500 mt-2 text-sm sm:text-base">
//           Any question or remarks? Just write us a message!
//         </p>
//       </div>

//       {/* Card */}
//       <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden">

//         {/* LEFT SECTION */}
//         <div className="bg-[#138301] text-white p-6 sm:p-10 relative">
//           <h2 className="text-xl sm:text-2xl font-semibold">
//             Contact Information
//           </h2>
//           <p className="text-green-100 mt-2 text-sm">
//             Say something to start a live chat!
//           </p>

//           <div className="mt-8 space-y-5 text-sm">
//             <div className="flex items-start gap-3">
//               <FaPhoneAlt className="mt-1 shrink-0" />
//               <span>+234 123 4567 890</span>
//             </div>

//             <div className="flex items-start gap-3">
//               <FaEnvelope className="mt-1 shrink-0" />
//               <span className="break-all">
//                 info@nacosanchor.edu.ng
//               </span>
//             </div>

//             <div className="flex items-start gap-3">
//               <FaMapMarkerAlt className="mt-1 shrink-0" />
//               <span>
//                 Anchor University, Lagos. <br />
//                 Ayobo Road, Ipaja.
//               </span>
//             </div>
//           </div>

//           {/* Social Icons */}
//           <div className="flex gap-3 mt-10">
//             <span className="bg-black p-2 rounded-full cursor-pointer">
//               <FaTwitter />
//             </span>
//             <span className="bg-white text-black p-2 rounded-full cursor-pointer">
//               <FaInstagram />
//             </span>
//             <span className="bg-black p-2 rounded-full cursor-pointer">
//               <FaDiscord />
//             </span>
//           </div>

//           {/* Decorative Circles (hidden on small screens) */}
//           <div className="hidden md:block absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
//           <div className="hidden md:block absolute bottom-10 right-10 w-24 h-24 bg-green-100 rounded-full"></div>
//         </div>

//         {/* RIGHT FORM SECTION */}
//         <div className="p-6 sm:p-10">
//           <form className="space-y-6">

//             {/* Names */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//               <div>
//                 <label className="text-sm text-gray-600">First Name</label>
//                 <input
//                   type="text"
//                   placeholder="John"
//                   className="w-full border-b border-gray-300 focus:border-[#138301] outline-none py-2"
//                 />
//               </div>

//               <div>
//                 <label className="text-sm text-gray-600">Last Name</label>
//                 <input
//                   type="text"
//                   placeholder="Doe"
//                   className="w-full border-b border-gray-300 focus:border-[#138301] outline-none py-2"
//                 />
//               </div>
//             </div>

//             {/* Email + Phone */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//               <div>
//                 <label className="text-sm text-gray-600">Email</label>
//                 <input
//                   type="email"
//                   placeholder="johndoe@example.com"
//                   className="w-full border-b border-gray-300 focus:border-[#138301] outline-none py-2"
//                 />
//               </div>

//               <div>
//                 <label className="text-sm text-gray-600">Phone Number</label>
//                 <input
//                   type="text"
//                   placeholder="+234 814 625 1103"
//                   className="w-full border-b border-gray-300 focus:border-[#138301] outline-none py-2"
//                 />
//               </div>
//             </div>

//             {/* Subject */}
//             <InquiryOptions />

//             {/* Message */}
//             <div>
//               <label className="text-sm text-gray-600">Message</label>
//               <textarea
//                 rows="4"
//                 placeholder="Write your message..."
//                 className="w-full border-b border-gray-300 focus:border-[#138301] outline-none py-2 resize-none"
//               />
//             </div>

//             {/* Button */}
//             <div className="text-center sm:text-right">
//               <button
//                 type="submit"
//                 className="bg-[#138301] text-white px-8 py-3 rounded-md hover:opacity-90 transition w-full sm:w-auto"
//               >
//                 Send Message
//               </button>
//             </div>

//           </form>
//         </div>
//       </div>
//     </section>
//   );
// }
// Israel commented prev for understandability
import { useState } from "react";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaTwitter, FaInstagram, FaDiscord } from "react-icons/fa";

//This is just component for the inquiry side, no biggie
function InquiryOptions({ value, onChange }) {
  const subjects = ["General Inquiry", "Technical Support", "Membership", "Other"];

  return (
    <div>
      <label className="text-sm text-gray-600">Select Subject</label>
      <div className="flex flex-wrap gap-3 mt-2">
        {subjects.map((subject) => (
          <label key={subject} className="flex items-center gap-2 cursor-pointer">
            <input type="radio" name="subject" value={subject} checked={value === subject} onChange={(e) => onChange(e.target.value)} className="accent-[#138301]" />
            <span className="text-sm">{subject}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default function Contact() {
  const [form, setForm] = useState({ first_name: "", last_name: "", email: "", phone: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ type: "", message: "" });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    if (!form.email || !form.message) {
      setFeedback({ type: "error", message: "Email and Message fields are required." });
      return;
    }

    setLoading(true);
    setFeedback({ type: "", message: "" });

    try {
      const response = await fetch("https://nacos.nextgenerationones.org/api/contact/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        // credentials: "include",
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (data.status === "success") {
        setFeedback({ type: "success", message: data.message || "Message sent successfully!" });
        setForm({ first_name: "", last_name: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setFeedback({ type: "error", message: data.message || "Something went wrong. Please try again." });
      }
    } catch (error) {
      setFeedback({ type: "error", message: "Network error. Please check your connection and try again." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-[#f7f9f4] py-10 px-4 sm:px-6">
      {/* Title */}
      <div className="text-center mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Contact Us</h1>
        <p className="text-gray-500 mt-2 text-sm sm:text-base">Any question or remarks? Just write us a message!</p>
      </div>

      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg grid grid-cols-1 md:grid-cols-2 overflow-hidden">

        <div className="bg-[#138301] text-white p-6 sm:p-10 relative">
          <h2 className="text-xl sm:text-2xl font-semibold">Contact Information</h2>
          <p className="text-green-100 mt-2 text-sm">Say something to start a live chat!</p>

          <div className="mt-8 space-y-5 text-sm">
            <div className="flex items-start gap-3">
              <FaPhoneAlt className="mt-1 shrink-0" />
              <span>+234 123 4567 890</span>
            </div>

            <div className="flex items-start gap-3">
              <FaEnvelope className="mt-1 shrink-0" />
              <span className="break-all">info@nacosanchor.edu.ng</span>
            </div>

            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="mt-1 shrink-0" />
              <span>Anchor University, Lagos. <br />Ayobo Road, Ipaja.</span>
            </div>
          </div>

          <div className="flex gap-3 mt-10">
            <span className="bg-black p-2 rounded-full cursor-pointer">
              <FaTwitter />
            </span>
            <span className="bg-white text-black p-2 rounded-full cursor-pointer">
              <FaInstagram />
            </span>
            <span className="bg-black p-2 rounded-full cursor-pointer">
              <FaDiscord />
            </span>
          </div>

          <div className="hidden md:block absolute bottom-0 right-0 w-40 h-40 bg-white rounded-full translate-x-1/2 translate-y-1/2"></div>
          <div className="hidden md:block absolute bottom-10 right-10 w-24 h-24 bg-green-100 rounded-full"></div>
        </div>

        <div className="p-6 sm:p-10">
          <div className="space-y-6">

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-gray-600">First Name</label>
                <input type="text" name="first_name" value={form.first_name} onChange={handleChange} placeholder="John" className="w-full border-b border-gray-300 focus:border-[#138301] outline-none py-2" />
              </div>

              <div>
                <label className="text-sm text-gray-600">Last Name</label>
                <input type="text" name="last_name" value={form.last_name} onChange={handleChange} placeholder="Doe" className="w-full border-b border-gray-300 focus:border-[#138301] outline-none py-2" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="text-sm text-gray-600">Email *</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="johndoe@example.com" required className="w-full border-b border-gray-300 focus:border-[#138301] outline-none py-2" />
              </div>

              <div>
                <label className="text-sm text-gray-600">Phone Number</label>
                <input type="text" name="phone" value={form.phone} onChange={handleChange} placeholder="+234 814 625 1103" className="w-full border-b border-gray-300 focus:border-[#138301] outline-none py-2" />
              </div>
            </div>

            <InquiryOptions value={form.subject} onChange={value => setForm({ ...form, subject: value })} />

            <div>
              <label className="text-sm text-gray-600">Message *</label>
              <textarea name="message" value={form.message} onChange={handleChange} rows="4" placeholder="Write your message..." required className="w-full border-b border-gray-300 focus:border-[#138301] outline-none py-2 resize-none" />
            </div>

            {feedback.message && (
              <p className={`text-sm text-center ${feedback.type === "success" ? "text-green-600" : "text-red-600"}`}>
                {feedback.message}
              </p>
            )}

            <div className="text-center sm:text-right">
              <button type="button" onClick={handleSubmit} disabled={loading} className="bg-[#138301] text-white px-8 py-3 rounded-md hover:opacity-90 transition w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed">
                {loading ? "Sending..." : "Send Message"}
              </button>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}