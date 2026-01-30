import React, { useState } from "react";
import { X, Upload, Image as ImageIcon, Send } from "lucide-react";
import Spinner from "@/components/ui/Spinner";
import { toast } from "sonner";

import { useCreatePost } from "@/hooks/useAdmin";

const CreatePostModal = ({ isOpen, onClose, onSuccess }) => {
  const { mutate: createPost, isPending: loading } = useCreatePost();
  /* New Ref for File Input */
  const fileInputRef = React.useRef(null);

  const [form, setForm] = useState({
    title: "",
    category: "Announcement",
    content: "",
    files: [],
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      // For now, handling single file, or convert to array
      setForm({ ...form, files: Array.from(e.target.files) });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.content) {
      toast.error("Please fill in all required fields");
      return;
    }

    /* Convert to FormData for Backend (Multipart) */
    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("category", form.category);
    formData.append("content", form.content);

    // Append files (optional)
    if (form.files && form.files.length > 0) {
      form.files.forEach((file) => {
        formData.append("attachments", file); // Using 'attachments' as key, common for arrays
      });
    }

    createPost(formData, {
      onSuccess: () => {
        toast.success("Post created successfully!");
        setForm({
          title: "",
          category: "Announcement",
          content: "",
          files: [],
        });
        if (fileInputRef.current) fileInputRef.current.value = "";
        if (onSuccess) onSuccess();
        onClose();
      },
      onError: (error) => {
        toast.error(error?.response?.data?.message || "Failed to create post.");
      },
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 transition-all">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#F1F5F9] flex items-center justify-between bg-[#F8FAFC]">
          <h3 className="text-[#0F172A] font-bold text-lg">Create New Post</h3>
          <button
            onClick={onClose}
            className="text-[#64748B] hover:text-red-500 transition-colors cursor-pointer"
          >
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Title */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="title"
                className="text-xs font-bold text-[#64748B] uppercase"
              >
                Post Title
              </label>
              <input
                id="title"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="e.g. Town Hall Meeting"
                className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#138601] outline-none text-sm placeholder:text-gray-400"
              />
            </div>

            {/* Category */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="category"
                className="text-xs font-bold text-[#64748B] uppercase"
              >
                Category
              </label>
              <select
                id="category"
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#138601] outline-none text-sm bg-white"
              >
                <option value="Announcement">Announcement</option>
                <option value="Event">Event</option>
                <option value="News">News</option>
                <option value="Alert">Urgent Alert</option>
              </select>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-1">
              <label
                htmlFor="content"
                className="text-xs font-bold text-[#64748B] uppercase"
              >
                Content
              </label>
              <textarea
                id="content"
                name="content"
                rows="5"
                value={form.content}
                onChange={handleChange}
                placeholder="Write your post content here..."
                className="w-full px-3 py-2.5 border border-[#E2E8F0] rounded-xl focus:ring-2 focus:ring-[#138601] outline-none text-sm resize-none placeholder:text-gray-400"
              ></textarea>
            </div>

            {/* Attachments */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border border-dashed border-[#E2E8F0] rounded-xl p-4 flex flex-col items-center justify-center text-center bg-gray-50/50 hover:bg-gray-50 transition-colors cursor-pointer group"
            >
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                multiple
                onChange={handleFileChange}
                accept="image/*,.pdf,.doc,.docx"
              />
              <div className="bg-white p-2 rounded-full shadow-sm mb-2 group-hover:scale-110 transition-transform">
                <Upload className="size-5 text-[#138601]" />
              </div>
              <p className="text-xs font-medium text-[#64748B]">
                {form.files.length > 0
                  ? `${form.files.length} file(s) selected`
                  : "Click to upload images or documents (Optional)"}
              </p>
              <p className="text-[10px] text-gray-400 mt-1">
                SVG, PNG, JPG or GIF (max. 5MB)
              </p>
            </div>

            <div className="pt-2 flex gap-3 justify-end">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-[#64748B] font-bold text-sm hover:text-black hover:bg-gray-100 rounded-xl transition-colors cursor-pointer"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-[#138601] text-white rounded-xl font-bold text-sm hover:bg-[#138601]/90 flex items-center gap-2 shadow-sm shadow-green-200 transition-all active:scale-95 cursor-pointer"
              >
                {loading ? (
                  <>
                    <Spinner className="size-4 text-white" />
                    <span>Publishing...</span>
                  </>
                ) : (
                  <>
                    <span>Publish Post</span>
                    <Send className="size-4" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePostModal;
