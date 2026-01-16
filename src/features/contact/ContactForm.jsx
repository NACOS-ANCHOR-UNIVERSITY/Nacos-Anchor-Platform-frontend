// src/features/contact/ContactForm.jsx
import { useState } from "react";

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "General Inquiry",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  const subjects = ["General Inquiry", "Support", "Feedback", "Other"];

  return (
    <form onSubmit={handleSubmit} className="space-y-6 h-full flex flex-col">
      {/* Name Fields */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="text-sm text-gray-600">First Name</label>
          <input
            type="text"
            name="firstName"
            placeholder="John"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full border-b border-gray-300 py-2 outline-none focus:border-nacos-green"
          />
        </div>
        <div>
          <label className="text-sm text-gray-600">Last Name</label>
          <input
            type="text"
            name="lastName"
            placeholder="Doe"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full border-b border-gray-300 py-2 outline-none focus:border-nacos-green"
          />
        </div>
      </div>

      {/* Email & Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div>
          <label className="text-sm text-gray-600">Email</label>
          <input
            type="email"
            name="email"
            placeholder="johndoe@example.com"
            value={formData.email}
            onChange={handleChange}
            className="w-full border-b border-gray-300 py-2 outline-none focus:border-nacos-green"
          />
        </div>
        <div>
          <label className="text-sm text-gray-600">Phone Number</label>
          <input
            type="tel"
            name="phone"
            placeholder="+234 814 625 1103"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border-b border-gray-300 py-2 outline-none focus:border-nacos-green"
          />
        </div>
      </div>

      {/* Subject */}
      <div>
        <p className="text-sm font-medium mb-3">Select Subject?</p>
        <div className="flex flex-wrap gap-4 text-sm">
          {subjects.map((item) => (
            <label
              key={item}
              className="flex items-center gap-2 cursor-pointer select-none"
            >
              <input
                type="radio"
                name="subject"
                value={item}
                checked={formData.subject === item}
                onChange={handleChange}
                className="hidden"
              />
              <span
                className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  formData.subject === item
                    ? "bg-black border-black"
                    : "border-gray-300"
                }`}
              >
                {formData.subject === item && (
                  <span className="text-white text-[10px] leading-none">✓</span>
                )}
              </span>
              <span className="text-gray-700">{item}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Message */}
      <div className="pt-1">
        <label className="text-sm text-gray-600">Message</label>
        <textarea
          name="message"
          placeholder="Write your message.."
          value={formData.message}
          onChange={handleChange}
          rows="4"
          className="w-full border-b border-gray-300 py-2 outline-none focus:border-nacos-green resize-none"
        />
      </div>

      {/* Button */}
      <div className="mt-auto pt-4">
        <button
          type="submit"
          className="bg-nacos-green text-white px-8 py-3 rounded-md hover:opacity-90 transition w-full sm:w-auto"
        >
          Send Message
        </button>
      </div>
    </form>
  );
};

export default ContactForm;