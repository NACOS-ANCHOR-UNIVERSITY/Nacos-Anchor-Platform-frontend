import React, { useState } from "react";
import StudentDashboardLayout from "../../layouts/dashboard/StudentDashboardLayout";
import { Eye } from "lucide-react";
import {
  CameraIcon,
  CreditCardIcon,
  LockIcon,
  MailIcon,
  NotificationIcon,
  PhoneIcon,
  UploadIcon,
  UserIcon,
} from "../../assets/icons";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [bioText, setBioText] = useState("");

  const menuItems = [
    { id: "profile", label: "Edit Profile", icon: UserIcon },
    { id: "security", label: "Account Security", icon: LockIcon },
    { id: "notifications", label: "Notifications", icon: NotificationIcon },
    { id: "appearance", label: "Appearance", icon: Eye },
    { id: "billing", label: "Billing", icon: CreditCardIcon },
  ];

  return (
    // <StudentDashboardLayout>
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-[#0F1C0C]">
            Account Settings
          </h1>
          <p className="text-[#52A046] text-base mt-1">
            Manage your personal details, academic preferences, and secure your
            account access.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Tabs */}
          <div className="w-full lg:w-1/4">
            <div className="bg-white rounded-xl drop-shadow-sm border border-[#E8F4E6] p-4">
              <nav className="flex flex-col gap-1">
                {menuItems.map((item) => (
                  <button
                    type="button"
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 h-10 rounded-lg text-sm font-semibold cursor-pointer transition-colors ${
                      activeTab === item.id
                        ? "bg-[#1386011A] text-[#138601]"
                        : "text-[#0F1C0C] hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <item.icon
                      className={`size-4.5 ${
                        activeTab === item.id
                          ? "text-[#13860]"
                          : "text-[#6B7280]"
                      }`}
                    />
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          <div className="w-full lg:w-3/4 space-y-6">
            {activeTab === "profile" ? (
              <>
                {/* Profile Header */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <img
                        src="https://api.dicebear.com/7.x/avataaars/svg?seed=Sue"
                        alt="Profile"
                        className="size-32 rounded-full border-4 border-gray-50 bg-gray-200 object-cover"
                      />
                      <button
                        type="button"
                        className="absolute bottom-0 right-0 bg-white rounded-full size-9 flex items-center justify-center drop-shadow-sm cursor-pointer hover:bg-gray-50"
                      >
                        <CameraIcon className="size-4 text-gray-600" />
                      </button>
                    </div>
                    <div className="flex flex-col gap-1">
                      <h2 className="text-xl md:text-2xl font-bold text-[#0F1C0C]">
                        Adefemi Oluwatobi
                      </h2>
                      <p className="text-[#52A046] font-medium">
                        Computer Science - 400 Level
                      </p>
                      <p className="text-sm text-[#6B7280]">
                        Matric No: AUL/CMP/22/003
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="w-fit mx-auto sm:mx-0 flex items-center gap-2 px-4 py-2 bg-[#E8F4E6] hover:bg-gray-100 text-[#0F1C0C] rounded-lg text-sm font-bold transition-colors"
                  >
                    <UploadIcon className="size-3.5" />
                    Change Photo
                  </button>
                </div>

                {/* Personal Information Form */}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8 pb-12">
                  <div className="flex justify-between items-center mb-8">
                    <h3 className="text-lg font-bold text-[#0F1C0C]">
                      Personal Information
                    </h3>
                    <button
                      type="button"
                      className="text-[#138601] text-sm font-medium hover:text-[#138601]/80 cursor-pointer"
                    >
                      Download Data
                    </button>
                  </div>

                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <InputField
                        id="firstName"
                        label="First Name"
                        defaultValue="Adefemi"
                      />
                      <InputField
                        id="lastName"
                        label="Last Name"
                        defaultValue="Oluwatobi"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="email"
                          className="text-sm font-medium text-[#0F1C0C]"
                        >
                          Email Address
                        </label>
                        <div className="relative">
                          <MailIcon className="absolute left-4 top-4 size-4 text-[#9CA3AF]" />
                          <input
                            type="email"
                            id="email"
                            defaultValue="adefemi.oluwatobi@student.aul.edu.ng"
                            className="w-full pl-10 pr-4 py-2.5 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#138601] focus:border-transparent outline-none transition-all text-[#0F1C0C]"
                          />
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label
                          htmlFor="phone"
                          className="text-sm font-medium text-[#0F1C0C]"
                        >
                          Phone Number
                        </label>
                        <div className="relative">
                          <PhoneIcon className="absolute left-4 top-4 size-4 text-[#9CA3AF]" />
                          <input
                            type="tel"
                            id="phone"
                            defaultValue="+234 812 345 6789"
                            className="w-full pl-10 pr-4 py-2.5 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#138601] focus:border-transparent outline-none transition-all text-[#0F1C0C]"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="bg-[#F8FCF8] border border-dashed border-[#D1D5DB] rounded-lg p-4">
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">
                        Academic Details (Read-only)
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-xs text-[#6B7280] block mb-1">
                            Matric Number
                          </p>
                          <p className="text-sm font-semibold text-[#0F1C0C]">
                            AUL/CMP/22/003
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-[#6B7280] block mb-1">
                            Department
                          </p>
                          <p className="text-sm font-semibold text-[#0F1C0C]">
                            Computer Science
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-[#6B7280] block mb-1">
                            Current Level
                          </p>
                          <p className="text-sm font-semibold text-[#0F1C0C]">
                            400 Level
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="bio"
                        className="text-sm font-medium text-[#0F1C0C]"
                      >
                        Bio
                      </label>
                      <textarea
                        id="bio"
                        rows="4"
                        placeholder="Write a short bio about yourself..."
                        className="w-full p-4 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#138601] focus:border-transparent outline-none transition-all text-base resize-none h-32.5"
                        maxLength="300"
                        value={bioText}
                        onChange={(e) => setBioText(e.target.value)}
                      ></textarea>
                      <p className="text-right text-xs text-[#6B7280]">
                        {bioText.length}/300 characters
                      </p>
                    </div>

                    <div className="flex items-center justify-end gap-4 pt-6 border-t border-[#F3F4F6]">
                      <button
                        type="button"
                        className="text-sm font-bold text-[#4B5563] hover:text-gray-900 bg-transparent hover:bg-gray-100 transition-colors rounded-lg py-2.5 px-6 cursor-pointer"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        className="px-6 py-2.5 bg-[#138601] hover:bg-[#138601]/80 text-white text-sm font-bold rounded-lg transition-colors drop-shadow-sm cursor-pointer"
                      >
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </>
            ) : (
              //   placeholder content for tabs
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 flex items-center justify-center">
                <p className="text-gray-500">
                  {menuItems.find((i) => i.id === activeTab)?.label} Content
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    // </StudentDashboardLayout>
  );
};

const InputField = ({ label, defaultValue, type = "text", id = "" }) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={id} className="text-sm font-medium text-[#0F1C0C]">
      {label}
    </label>
    <input
      id={id}
      type={type}
      defaultValue={defaultValue}
      className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#138601] focus:border-transparent outline-none transition-all text-base text-[#0F1C0C]"
    />
  </div>
);

export default Settings;

