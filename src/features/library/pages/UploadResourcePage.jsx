import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Upload, FileText, X, Info, Trash2, SendHorizontal } from "lucide-react";
import { toast } from "sonner";

const uploadSchema = z.object({
  courseCode: z.string().min(1, "Please select a course"),
  level: z.string().min(1, "Please select an academic level"),
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().max(300, "Description cannot exceed 300 characters"),
  file: z.any().refine((files) => files?.length === 1, "File is required").refine((files) => files?.[0]?.size <= 15000000, "Max file size is 15MB"),
});

export default function UploadResourcePage() {
  const [filePreview, setFilePreview] = useState(null);
  const { register, handleSubmit, setValue, watch, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(uploadSchema),
    defaultValues: {
      level: "300",
    },
  });
  const descriptionValue = watch("description", "");
  const selectedLevel = watch("level");

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFilePreview({
        name: file.name,
        size: (file.size / 1024 / 1024).toFixed(2),
        type: file.type
      });
      setValue("file", e.target.files);
    }
  };

  const removeFile = () => {
    setFilePreview(null);
    setValue("file", null);
  };

  const onSubmit = async (data) => {
    const toastId = toast.loading("Uploading document...");
    try {
      const token = localStorage.getItem("ACCESS_TOKEN") || localStorage.getItem("token");
      if (!token) throw new Error("Please login to upload files.");
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("course_code", data.courseCode);
      formData.append("level", data.level);
      formData.append("description", data.description);
      formData.append("resource_file", data.file[0]);
      console.log("Uploading to: https://nacos.nextgenerationones.org/api/upload/submit");
      const response = await fetch("https://nacos.nextgenerationones.org/api/upload/submit", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Accept": "application/json",
        },
        body: formData,
      });
      let result;
      try {
        result = await response.json();
      } catch (err) {
        throw new Error(`Server Error: ${response.status} ${response.statusText}`);
      }
      if (!response.ok) {
        if (response.status === 400) {
          throw new Error(result.message || "All fields are required or invalid file type/size.");
        } else if (response.status === 405) {
          throw new Error("Method Not Allowed. Please contact support.");
        } else {
          throw new Error(result.message || "Upload failed");
        }
      }
      toast.dismiss(toastId);
      toast.success(result.message || "Document uploaded successfully!");
      reset();
      setFilePreview(null);
    } catch (error) {
      console.error("Upload Error:", error);
      toast.dismiss(toastId);
      toast.error(error.message || "Upload failed. Check your connection.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-8 px-4">
      <div className="mb-6">
        <p className="text-sm text-gray-500 mb-2">Home / Resources / <span className="text-gray-900 font-medium">Upload</span></p>
        <h1 className="text-2xl font-bold text-gray-900">Contribute Academic Resources</h1>
        <p className="text-gray-600 mt-1">Share your notes and handouts.</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white border border-gray-200 rounded-xl p-8 shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Course Code</label>
            <select {...register("courseCode")} className="w-full border border-gray-300 rounded-lg px-4 py-2.5 bg-white focus:ring-2 focus:ring-green-500 outline-none">
              <option value="">Select Course</option>
              <option value="CSC 101">CSC 101 - Intro to Comp Sci</option>
              <option value="CSC 201">CSC 201 - Programming I</option>
              <option value="CSC 301">CSC 301 - Data Structures</option>
              <option value="CSC 401">CSC 401 - Software Engineering</option>
              <option value="GNS 101">GNS 101 - Use of English</option>
            </select>
            {errors.courseCode && <p className="text-red-500 text-xs mt-1">{errors.courseCode.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Academic Level</label>
            <div className="flex border border-gray-200 rounded-lg p-1 bg-gray-50">
              {["100", "200", "300", "400"].map((lvl) => (
                <label key={lvl} className={`flex-1 text-center py-1.5 text-sm font-medium rounded-md cursor-pointer transition-all ${selectedLevel === lvl ? "bg-white shadow-sm text-green-700" : "text-gray-500 hover:text-gray-700"}`}>
                  <input type="radio" value={lvl} {...register("level")} className="hidden" />
                  {lvl}L
                </label>
              ))}
            </div>
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Resource Title</label>
          <input {...register("title")} type="text" placeholder="e.g. Introduction to Algorithms" className="w-full border border-gray-300 bg-gray-50 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-green-500 outline-none" />
          {errors.title && <p className="text-red-500 text-xs mt-1">{errors.title.message}</p>}
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea {...register("description")} rows={4} placeholder="Provide a brief description of the resource..." className="w-full border border-gray-300 bg-gray-50 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-green-500 outline-none resize-none" />
          <div className="flex justify-between mt-1">
            {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
            <p className="text-xs text-gray-400 ml-auto">{descriptionValue.length}/300</p>
          </div>
        </div>
        <div className="mb-8">
          <label className="block text-sm font-medium text-gray-700 mb-2">Upload Document</label>
          {!filePreview ? (
            <div className="border-2 border-dashed bg-gray-50 border-gray-300 rounded-lg p-8 text-center hover:bg-gray-100 transition-colors relative">
              <input type="file" accept=".pdf,.docx,.doc,.ppt,.pptx" onChange={handleFileChange} className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" />
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-50 text-green-600 mb-3">
                <Upload className="w-6 h-6" />
              </div>
              <p className="text-sm text-gray-900 font-medium"><span className="text-green-600">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-gray-500 mt-1">PDF, DOCX, PPT (Max 15MB)</p>
            </div>
          ) : (
            <div className="border border-green-200 bg-green-50 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-white p-2 rounded shadow-sm">
                  <FileText className="w-6 h-6 text-red-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900 line-clamp-1">{filePreview.name}</p>
                  <p className="text-xs text-gray-500">{filePreview.size} MB</p>
                </div>
              </div>
              <button type="button" onClick={removeFile} className="text-gray-400 hover:text-red-500">
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          )}
          {errors.file && <p className="text-red-500 text-xs mt-1">{errors.file.message}</p>}
          <div className="mt-3 flex items-start gap-2 p-3 bg-blue-50 border border-blue-100 rounded-lg">
            <Info className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-blue-700">
              <p className="font-medium mb-1">Accepted file types:</p>
              <ul className="list-disc list-inside space-y-0.5 text-blue-600">
                <li>PDF documents (.pdf)</li>
                <li>Word documents (.doc, .docx)</li>
                <li>PowerPoint slides (.ppt, .pptx)</li>
              </ul>
              <p className="mt-2 text-blue-600">Maximum file size: 15MB</p>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
          <button type="button" onClick={() => { reset(); setFilePreview(null); }} className="px-6 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 border border-gray-300 rounded-lg">Cancel</button>
          <button type="submit" disabled={isSubmitting} className="px-6 py-2.5 text-sm font-medium text-white bg-green-700 hover:bg-green-800 rounded-lg flex items-center gap-2 disabled:opacity-50">
            <SendHorizontal className="w-4 h-4" />
            {isSubmitting ? "Uploading..." : "Submit Resource"}
          </button>
        </div>
      </form>
    </div>
  );
} 