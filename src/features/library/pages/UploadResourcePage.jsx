import React, {useState} from "react";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {z} from "zod";
import {Upload, FileText, X, Info, Trash2, CheckCircle, SendHorizontal} from "lucide-react";
import client from "../../../config/axios-client";

// 1. Zod Schema (Validation Rules)
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

export default function UploadResourcePage() {
  const [filePreview, setFilePreview] = useState(null);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {errors, isSubmitting},
  } = useForm({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      level: "300L", 
    },
  });

  const descriptionValue = watch("description", "");
  const selectedLevel = watch("level");

  // Handle File Selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFilePreview({
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2),
      });
      setValue("file", e.target.files); 
    }
  };

  const removeFile = () => {
    setFilePreview(null);
    setValue("file", null);
  };

  const onSubmit = async (data) => {
    try {
     
      const formData = new FormData();
      formData.append("course_code", data.courseCode);
      formData.append("level", data.level);
      formData.append("title", data.title);
      formData.append("description", data.description);
      formData.append("resource_file", data.file[0]);

     
      await client.post("/resources/upload", formData, {
        headers: {"Content-Type": "multipart/form-data"},
      });

      alert("Resource uploaded successfully!");
    } catch (error) {
      console.error("Upload failed", error);
      alert("Upload failed. Check console.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      {/* Breadcrumb & Header */}
      <div className="mb-6">
        <p className="text-sm text-gray-500 mb-2">
          Home / Resources /{" "}
          <span className="text-gray-900 font-medium">Upload</span>
        </p>
        <h1 className="text-2xl font-bold text-gray-900">
          Contribute Academic Resources
        </h1>
        <p className="text-gray-600 mt-1">
          Share your notes, past questions, and slides with the NACOS community.
        </p>
      </div>

      {/* Guidelines Banner (Green) */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8 flex items-start gap-3 relative">
        <Info className="w-5 h-5 text-green-700 mt-0.5" />
        <div>
          <h3 className="text-sm font-semibold">Upload Guidelines</h3>
          <p className="text-sm text-gray-400 mt-1">
            Please ensure your files are in PDF, DOCX, or PPT format and do not
            violate copyright policies. Max size: 15MB per file.
          </p>
        </div>
        <button className="absolute top-4 right-4 text-green-700 hover:text-green-900">
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Main Form Card */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm"
      >
        {/* Row 1: Course & Level */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Course Code */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course Code
            </label>
            <select
              {...register("courseCode")}
              className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none bg-white"
            >
              <option value="">Select Course (e.g., CSC 101)</option>
              <option value="CSC101">CSC 101 - Intro to Comp Sci</option>
              <option value="CSC201">CSC 201 - Programming I</option>
            </select>
            {errors.courseCode && (
              <p className="text-red-500 text-xs mt-1">
                {errors.courseCode.message}
              </p>
            )}
          </div>

          {/* Academic Level (Segmented Control) */}
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
            {errors.level && (
              <p className="text-red-500 text-xs mt-1">
                {errors.level.message}
              </p>
            )}
          </div>
        </div>

        {/* Resource Title */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Resource Title
          </label>
          <input
            {...register("title")}
            type="text"
            placeholder="e.g., Introduction to Algorithms - Week 1 Notes"
            className="w-full border border-gray-300 text-gray-700 bg-gray-50 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-green-500 outline-none"
          />
          {errors.title && (
            <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>
          )}
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description
          </label>
          <textarea
            {...register("description")}
            rows={4}
            placeholder="Briefly describe the contents of this resource..."
            className="w-full border border-gray-300 bg-gray-50 text-gray-700 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-green-500 outline-none resize-none"
          />
          <div className="flex justify-between mt-1">
            {errors.description && (
              <p className="text-red-500 text-xs">
                {errors.description.message}
              </p>
            )}
            <p className="text-xs text-gray-400 ml-auto">
              {descriptionValue.length}/300 characters
            </p>
          </div>
        </div>

        {/* File Upload Area */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Upload File
          </label>

          {!filePreview ? (
            <div className="border-2 border-dashed bg-gray-50 border-gray-300 rounded-lg p-8 text-center hover:bg-gray-200 transition-colors relative">
              <input
                type="file"
                accept=".pdf,.docx,.ppt,.pptx"
                onChange={handleFileChange}
                className="absolute inset-0 w-ful h-full opacity-0 cursor-pointer"
              />
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-50 text-green-600 mb-3">
                <Upload className="w-6 h-6" />
              </div>
              <p className="text-sm text-gray-900 font-medium">
                <span className="text-green-600">Click to upload</span> or drag
                and drop
              </p>
              <p className="text-xs text-gray-500 mt-1">
                PDF, DOCX, or PPT (MAX. 15MB)
              </p>
            </div>
          ) : (
            // File Preview State (Matches the bottom of your image)
            <div className="border border-green-200 bg-green-50 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded shadow-sm">
                  <FileText className="w-6 h-6 text-red-500" />{" "}
                  {/* Red icon for PDF */}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {filePreview.name}
                  </p>
                  <div className="w-32 h-1 bg-gray-200 rounded-full mt-1.5 overflow-hidden">
                    <div className="h-full bg-green-500 w-full"></div>{" "}
                    {/* 100% Progress */}
                  </div>
                </div>
              </div>
              <button
                type="button"
                onClick={removeFile}
                className="text-gray-400 hover:text-red-500"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          )}
          {errors.file && (
            <p className="text-red-500 text-xs mt-1">{errors.file.message}</p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4 pt-4 border-t border-gray-100">
          <button
            type="button"
            className="px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-lg"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2.5 text-sm font-medium text-white bg-green-700 hover:bg-green-800 rounded-lg flex items-center gap-2"
          >
            <SendHorizontal className="w-4 h-4" />
            {isSubmitting ? "Uploading..." : "Submit Resource"}
          </button>
        </div>
      </form>

      <footer className="items-center pt-8 justify-center text-center">
        <p className="text-[12px]">
          By uploading, you agree to NACOS Anchor University's <span className="text-green-600">
         Terms of Service
          and Privacy Policy. </span> 
        </p>
      </footer>
    </div>
  );
}
