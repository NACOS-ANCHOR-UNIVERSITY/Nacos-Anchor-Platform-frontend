import React from "react";
import { useNavigate } from "react-router-dom";
import { Construction, ArrowLeft, Clock } from "lucide-react";

const ComingSoon = ({ title = "Feature Coming Soon", message }) => {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col items-center justify-center min-h-[60vh] p-6 text-center animate-in fade-in duration-500">

      {/* Icon Container */}
      <div className="relative mb-8 group cursor-default">
        <div className="absolute inset-0 bg-green-100 rounded-full scale-110 blur-xl opacity-50 group-hover:scale-125 transition-transform duration-700"></div>
        <div className="relative bg-white p-6 rounded-full shadow-sm border border-green-50">
          <Construction className="w-16 h-16 text-[#138601]" />
        </div>

        {/* Floating Badge */}
        <div className="absolute -right-2 -top-2 bg-orange-100 text-orange-700 text-xs font-bold px-3 py-1 rounded-full border border-orange-200 flex items-center gap-1 shadow-sm">
          <Clock className="w-3 h-3" />
          <span>In Progress</span>
        </div>
      </div>

      {/* Text Content */}
      <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 tracking-tight">
        {title}
      </h1>
      <p className="text-gray-500 text-lg max-w-md mb-10 leading-relaxed">
        {message || "We are currently building this module to serve you better. Check back soon for updates!"}
      </p>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-white border border-gray-200 text-gray-700 rounded-xl font-medium hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Go Back
        </button>

        <button
          onClick={() => navigate('/')}
          className="flex items-center justify-center gap-2 px-6 py-3 bg-[#138601] text-white rounded-xl font-medium hover:bg-[#0e6001] transition-all shadow-md hover:shadow-lg shadow-green-900/10"
        >
          Return Home
        </button>
      </div>

    </div>
  );
};

export default ComingSoon;