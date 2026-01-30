import React, { useState } from "react";
import {
  FileText,
  Video,
  File,
  Download,
  Eye,
  FileSpreadsheet,
  X,
  ExternalLink,
} from "lucide-react";

const ResourceCard = ({ title, code, author, size, type, desc, file_url, downloads = 0, id }) => {
  const [showPreview, setShowPreview] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  // Helper to pick the color & icon based on file type
  const getIconTheme = () => {
    const fileType = type?.toUpperCase() || "FILE";
    
    switch (fileType) {
      case "PDF":
        return {
          icon: <FileText className="w-5 h-5" />,
          bg: "bg-red-50",
          text: "text-red-500",
        };
      case "VIDEO":
      case "MP4":
      case "AVI":
      case "MOV":
        return {
          icon: <Video className="w-5 h-5" />,
          bg: "bg-orange-50",
          text: "text-orange-500",
        };
      case "DATASET":
      case "CSV":
      case "XLSX":
      case "XLS":
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

  // Get full file URL
  const getFileUrl = () => {
    if (!file_url) return null;
    
    // If file_url already has a domain, use it as is
    if (file_url.startsWith('http://') || file_url.startsWith('https://')) {
      return file_url;
    }
    
    // Otherwise, prepend the base URL
    return `https://nacos.nextgenerationones.org${file_url}`;
  };

  // Handle Preview
  const handlePreview = () => {
    const fullUrl = getFileUrl();
    if (!fullUrl) {
      alert('File URL not available');
      return;
    }

    const fileType = type?.toLowerCase() || '';
    
    // For PDFs, show in modal
    if (fileType === 'pdf') {
      setShowPreview(true);
    } else {
      // For other files, open in new tab
      window.open(fullUrl, '_blank');
    }
  };

  // Handle Download
  const handleDownload = async () => {
    const fullUrl = getFileUrl();
    if (!fullUrl) {
      alert('File URL not available');
      return;
    }

    try {
      setIsDownloading(true);

      // Track download analytics (optional)
      try {
        const token = localStorage.getItem("ACCESS_TOKEN") || localStorage.getItem("token");
        await fetch(`https://nacos.nextgenerationones.org/api/resources/${id}/download`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });
      } catch (error) {
        console.log('Download tracking failed:', error);
        // Continue with download even if tracking fails
      }

      // Create download link
      const link = document.createElement('a');
      link.href = fullUrl;
      link.download = `${code}_${title}`.replace(/[^a-z0-9]/gi, '_');
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download file. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <>
      <div className="bg-white border border-gray-100 rounded-xl p-5 hover:shadow-md hover:border-green-200 transition-all flex flex-col h-full group">
        {/* 1. TOP ROW: Icon (Left) & Actions (Right) */}
        <div className="flex justify-between items-start mb-4">
          {/* File Icon Box */}
          <div
            className={`w-10 h-10 rounded-lg flex items-center justify-center ${theme.bg} ${theme.text}`}
          >
            {theme.icon}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-1">
            <button
              onClick={handlePreview}
              className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded transition-colors"
              title="Preview"
            >
              <Eye className="w-4 h-4" />
            </button>
            <button
              onClick={handleDownload}
              disabled={isDownloading}
              className="p-1.5 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              title="Download"
            >
              {isDownloading ? (
                <div className="w-4 h-4 border-2 border-green-600 border-t-transparent rounded-full animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
            </button>
          </div>
        </div>

        {/* 2. BODY: Code, Title, Desc */}
        <div className="flex-1 mb-4">
          {/* Course Code Badge */}
          <div className="flex items-center gap-2 mb-2">
            <span className="inline-block bg-gray-50 text-gray-600 text-[10px] font-bold px-2 py-1 rounded uppercase tracking-wide">
              {code}
            </span>
            {downloads > 0 && (
              <span className="text-[10px] text-gray-400 flex items-center gap-1">
                <Download className="w-3 h-3" />
                {downloads}
              </span>
            )}
          </div>

          <h3
            className="font-bold text-gray-900 text-base mb-2 line-clamp-1 cursor-pointer hover:text-green-600 transition-colors"
            title={title}
            onClick={handlePreview}
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
              {author?.charAt(0)?.toUpperCase() || "?"}
            </div>
            <span className="font-medium text-gray-500 truncate max-w-[100px]" title={author}>
              {author}
            </span>
          </div>
          <span className="font-bold text-gray-400">{size}</span>
        </div>
      </div>

      {/* Preview Modal */}
      {showPreview && (
        <PreviewModal
          title={title}
          fileUrl={getFileUrl()}
          fileType={type}
          onClose={() => setShowPreview(false)}
        />
      )}
    </>
  );
};

// Preview Modal Component
const PreviewModal = ({ title, fileUrl, fileType, onClose }) => {
  const renderPreviewContent = () => {
    const type = fileType?.toLowerCase() || '';

    if (type === 'pdf') {
      return (
        <iframe
          src={fileUrl}
          className="w-full h-full min-h-[80vh]"
          title={title}
        />
      );
    }

    if (type === 'video' || type === 'mp4' || type === 'avi' || type === 'mov') {
      return (
        <video
          controls
          className="w-full h-auto max-h-full"
          src={fileUrl}
        >
          Your browser does not support the video tag.
        </video>
      );
    }

    if (['jpg', 'jpeg', 'png', 'gif', 'webp'].includes(type)) {
      return (
        <img
          src={fileUrl}
          alt={title}
          className="w-full h-auto max-h-full object-contain"
        />
      );
    }

    // For other file types, show download option
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 text-center">
        <File className="w-16 h-16 text-gray-400 mb-4" />
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Preview Not Available</h3>
        <p className="text-sm text-gray-500 mb-6">
          This file type cannot be previewed in the browser.
        </p>
        <a
          href={fileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-green-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-green-700 flex items-center gap-2 transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
          Open in New Tab
        </a>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-6xl w-full max-h-[90vh] pb-2 flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="text-lg font-bold text-gray-900 truncate flex-1 mr-4">
            {title}
          </h2>
          <div className="flex items-center gap-2">
            <a
              href={fileUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-gray-500 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
              title="Open in new tab"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
            <button
              onClick={onClose}
              className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              title="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Preview Content */}
        <div className="flex-1 overflow-hidden">
          {renderPreviewContent()}
        </div>
      </div>
    </div>
  );
};

export default ResourceCard;