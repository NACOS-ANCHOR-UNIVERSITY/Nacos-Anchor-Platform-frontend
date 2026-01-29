import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload, FileText, X, Trash2, SendHorizontal } from "lucide-react";
import { toast } from "sonner";

// 1. Validation Schema
const uploadSchema = z.object({
  courseCode: z.string().min(1, "Please select a course"),
  level: z.string().min(1, "Please select an academic level"),
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().max(300, "Description cannot exceed 300 characters"),
  file: z
    .any()
    .refine((files) => files?.length === 1, "File is required")
    .refine((files) => files?.[0]?.size <= 15000000, "Max file size is 15MB"),
});

const UploadResourceModal = ({ isOpen, onClose }) => {
  const [filePreview, setFilePreview] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      level: "300L",
    },
  });

  const descriptionValue = watch("description", "");
  const selectedLevel = watch("level");

  // --- HANDLE FILE SELECTION ---
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFilePreview({
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2),
        type: file.type,
      });
      setValue("file", e.target.files);
    }
  };

  const removeFile = () => {
    setFilePreview(null);
    setValue("file", null);
  };

  // --- SUBMIT FUNCTION (DIRECT FETCH) ---
  const onSubmit = async (data) => {
    const toastId = toast.loading("Uploading document...");

    try {
      // 1. Get Token
      const token =
        localStorage.getItem("ACCESS_TOKEN") || localStorage.getItem("token");
      if (!token) throw new Error("Please login to upload files.");

      // 2. Prepare FormData
      const formData = new FormData();
      formData.append("course_code", data.courseCode);
      formData.append("level", data.level);
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("resource_file", data.file[0]);

      console.log("Uploading file via Fetch...");

      // 3. Send Request
      const response = await fetch(
        "https://nacos.nextgenerationones.org/api/resources",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          body: formData,
        },
      );

      let result;
      try {
        result = await response.json();
      } catch (err) {
        throw new Error(
          `Server Error: ${response.status} ${response.statusText}`,
        );
      }

      if (!response.ok) {
        throw new Error(result.message || "Upload failed");
      }

      // 4. Success
      toast.dismiss(toastId);
      toast.success("Document uploaded successfully!");
      reset();
      setFilePreview(null);
      onClose(); // Close modal on success
    } catch (error) {
      console.error("Upload Error:", error);
      toast.dismiss(toastId);
      toast.error(error.message || "Upload failed. Check your connection.");
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="bg-white w-full max-w-2xl rounded-2xl shadow-xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Upload Resource</h2>
            <p className="text-sm text-gray-500">
              Share your notes and handouts.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Scrollable Form Content */}
        <div className="overflow-y-auto p-6">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Course & Level */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Course Code
                </label>
                <select
                  {...register("courseCode")}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-white focus:ring-2 focus:ring-green-500 outline-none"
                >
                  <option value="">Select Course</option>
                  <option value="CSC101">CSC 101 - Intro to Comp Sci</option>
                  <option value="CSC201">CSC 201 - Programming I</option>
                  <option value="CSC301">CSC 301 - Data Structures</option>
                  <option value="CSC401">CSC 401 - Software Engineering</option>
                  <option value="GNS101">GNS 101 - Use of English</option>
                </select>
                {errors.courseCode && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.courseCode.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Academic Level
                </label>
                <div className="flex border border-gray-200 rounded-lg p-1 bg-gray-50">
                  {["100L", "200L", "300L", "400L"].map((lvl) => (
                    <label
                      key={lvl}
                      className={`flex-1 text-center py-1.5 text-sm font-medium rounded-md cursor-pointer transition-all ${
                        selectedLevel === lvl
                          ? "bg-white shadow-sm text-green-700"
                          : "text-gray-500 hover:text-gray-700"
                      }`}
                    >
                      <input
                        type="radio"
                        value={lvl}
                        {...register("level")}
                        className="hidden"
                      />
                      {lvl}
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Resource Title
              </label>
              <input
                {...register("title")}
                type="text"
                placeholder="e.g. CSC 301 Lecture Note 1"
                className="w-full border border-gray-300 bg-gray-50 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-green-500 outline-none"
              />
              {errors.title && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                {...register("description")}
                rows={3}
                className="w-full border border-gray-300 bg-gray-50 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-green-500 outline-none resize-none"
              />
              <div className="flex justify-between mt-1">
                {errors.description && (
                  <p className="text-red-500 text-xs">
                    {errors.description.message}
                  </p>
                )}
                <p className="text-xs text-gray-400 ml-auto">
                  {descriptionValue.length}/300
                </p>
              </div>
            </div>

            {/* FILE UPLOAD BOX */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Upload Document
              </label>

              {!filePreview ? (
                <div className="border-2 border-dashed bg-gray-50 border-gray-300 rounded-lg p-6 text-center hover:bg-gray-100 transition-colors relative">
                  <input
                    type="file"
                    accept=".pdf,.docx,.doc,.ppt,.pptx,.txt"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-50 text-green-600 mb-2">
                    <Upload className="w-5 h-5" />
                  </div>
                  <p className="text-sm text-gray-900 font-medium">
                    <span className="text-green-600">Click to upload</span> or
                    drag and drop
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    PDF, DOCX, PPT (Max 15MB)
                  </p>
                </div>
              ) : (
                <div className="border border-green-200 bg-green-50 rounded-lg p-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-white p-2 rounded shadow-sm">
                      <FileText className="w-5 h-5 text-red-500" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900 line-clamp-1">
                        {filePreview.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {filePreview.size} MB
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={removeFile}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              )}
              {errors.file && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.file.message}
                </p>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 text-sm font-medium text-white bg-green-700 hover:bg-green-800 rounded-lg flex items-center gap-2 disabled:opacity-50"
              >
                <SendHorizontal className="w-4 h-4" />
                {isSubmitting ? "Uploading..." : "Submit Resource"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadResourceModal;
