import React from "react";
import {
  FileText,
  Video,
  File,
  Download,
  Eye,
  FileSpreadsheet,
} from "lucide-react";

const ResourceCard = ({title, code, author, size, type, desc}) => {
  // Helper to pick the color & icon based on file type
  const getIconTheme = () => {
    switch (type) {
      case "PDF":
        return {
          icon: <FileText className="w-5 h-5" />,
          bg: "bg-red-50",
          text: "text-red-500",
        };
      case "Video":
        return {
          icon: <Video className="w-5 h-5" />,
          bg: "bg-orange-50",
          text: "text-orange-500",
        };
      case "Dataset":
        return {
          icon: <FileSpreadsheet className="w-5 h-5" />,
          bg: "bg-green-50",
          text: "text-green-500",
        };
      default:
        return {
          icon: <File className="w-5 h-5" />,
          bg: "bg-blue-50",
          text: "text-blue-500",
        };
    }
  };

  const theme = getIconTheme();

  return (
    <div className="bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md hover:border-green-200 transition-all flex flex-col h-full group">
      {/* 1. TOP ROW: Icon (Left) & Actions (Right) */}
      <div className="flex justify-between items-start mb-4">
        {/* File Icon Box */}
        <div
          className={`w-10 h-10 rounded-lg flex items-center justify-center ${theme.bg} ${theme.text}`}
        >
          {theme.icon}
        </div>

        {/* Action Buttons (Visible on Hover mostly, but kept subtle) */}
        <div className="flex gap-1">
          <button
            className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
            title="Preview"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
            title="Download"
          >
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* 2. BODY: Code, Title, Desc */}
      <div className="flex-1 mb-4">
        {/* Course Code Badge */}
        <span className="inline-block bg-gray-50 text-gray-600 text-[10px] font-bold px-2 py-1 rounded mb-2 uppercase tracking-wide">
          {code}
        </span>

        <h3
          className="font-bold text-gray-900 text-base mb-2 line-clamp-1"
          title={title}
        >
          {title}
        </h3>

        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">
          {desc}
        </p>
      </div>

      {/* 3. FOOTER: Author & Size */}
      <div className="pt-4 border-t border-gray-200 flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded-full bg-gray-100 flex items-center justify-center text-[8px] font-bold text-gray-500">
            {/* Initial of Author */}
            {author.charAt(0)}
          </div>
          <span className="font-medium text-gray-500 truncate max-w-[100px]">
            {author}
          </span>
        </div>
        <span className="font-bold text-gray-400">{size}</span>
      </div>
    </div>
  );
};

export default ResourceCard;
