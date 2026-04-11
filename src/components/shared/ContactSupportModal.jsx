import React, {useState} from "react";
import {X, Send, Loader2} from "lucide-react";
import {toast} from "sonner"; // Since you have sonner in App.jsx!

export default function ContactSupportModal({isOpen, onClose}) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call to your support endpoint
    setTimeout(() => {
      setIsSubmitting(false);
      toast.success("Support ticket submitted! We'll get back to you soon.");
      onClose(); // Close modal on success
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-lg rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-white">
          <h2 className="text-xl font-bold text-gray-900">Contact Support</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 md:p-8">
          <p className="text-sm text-gray-600 mb-6">
            Need help with your dashboard or experiencing an issue? Send us a
            message and the technical team will assist you.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-900">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full px-4 py-2.5 bg-[#F8FCF8] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#138601] text-sm"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-gray-900">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="student@aul.edu.ng"
                  className="w-full px-4 py-2.5 bg-[#F8FCF8] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#138601] text-sm"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-900">Subject</label>
              <input
                type="text"
                required
                placeholder="How can we help you?"
                className="w-full px-4 py-2.5 bg-[#F8FCF8] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#138601] text-sm"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-bold text-gray-900">Message</label>
              <textarea
                required
                rows="4"
                placeholder="Describe your issue in detail..."
                className="w-full px-4 py-2.5 bg-[#F8FCF8] border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#138601] text-sm resize-none"
              ></textarea>
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#138601] hover:bg-[#0f6600] text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" /> Sending...
                  </>
                ) : (
                  <>
                    Send Message <Send className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
