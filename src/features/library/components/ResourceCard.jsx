import React from "react";
import {FileText, Video, File, Download, Eye} from "lucide-react";

const ResourceCard = ({title, code, author, size, type, description}) => {
  // Helper to pick the color & icon based on file type
  const getIcon = () => {
    switch (type) {
      case "PDF":
        return <FileText className="text-red-500" />;
      case "Video":
        return <Video className="text-orange-500" />;
      default:
        return <File className="text-blue-500" />;
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md transition-shadow flex flex-col h-full">
      {/* 1. Header: Icon & Course Code */}
      <div className="flex justify-between items-start mb-3">
        <div className="p-2 bg-gray-50 rounded-lg">{getIcon()}</div>
        <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-1 rounded uppercase">
          {code}
        </span>
      </div>

      {/* 2. Content */}
      <h3 className="font-bold text-gray-900 mb-1 line-clamp-1">{title}</h3>
      <p className="text-xs text-gray-500 mb-4 line-clamp-2 flex-1">
        {description}
      </p>

      {/* 3. Footer */}
      <div className="flex items-center justify-between pt-4 border-t border-gray-100 mt-auto">
        <div className="text-xs text-gray-400">
          <p className="font-medium text-gray-600">{author}</p>
          <p>{size}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <button className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded transition-colors">
            <Eye className="w-4 h-4" />
          </button>
          <button className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded transition-colors">
            <Download className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;
