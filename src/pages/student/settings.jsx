import React, { useState, useEffect } from "react";
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

// 1. FIX: Use Proxy URL (Fixes Network/CORS Errors)
const BASE_URL = "/api/proxy";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [bioText, setBioText] = useState("");
  const [userData, setUserData] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const menuItems = [
    { id: "profile", label: "Edit Profile", icon: UserIcon },
    { id: "security", label: "Account Security", icon: LockIcon },
    { id: "notifications", label: "Notifications", icon: NotificationIcon },
    { id: "appearance", label: "Appearance", icon: Eye },
    { id: "billing", label: "Billing", icon: CreditCardIcon },
  ];

  // 2. FIX: Check for BOTH token names so Students don't get kicked out
  const getAuthToken = () => {
    return localStorage.getItem("token") || localStorage.getItem("ACCESS_TOKEN");
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = getAuthToken();

      if (!token) {
        // If NO token is found at all, then redirect
        setError("You are not logged in. Please login to continue.");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
        return;
      }

      const response = await fetch(`${BASE_URL}/auth/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Handle 401 specifically (Expired Session)
      if (response.status === 401) {
        setError("Your session has expired. Please login again.");
        localStorage.clear();
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
        return;
      }

      const data = await response.json();

      if (data.status === "success") {
        setUserData(data.data.user);
        setBioText(data.data.user.bio || "");
        setPhoneNumber(data.data.user.phone || "");
      } else {
        setError(data.message || "Failed to load user data");
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
      // Don't redirect on network error, just show message
      setError("Network error. Please check your connection.");
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = getAuthToken();
      if (!token) return;

      const response = await fetch(`${BASE_URL}/settings/profile`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bio: bioText,
          phone: phoneNumber,
        }),
      });

      const data = await response.json();

      if (data.status === "success") {
        setSuccess("Profile updated successfully");
        await fetchUserData();
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(data.message || "Failed to update profile");
      }
    } catch (err) {
      console.error("Error updating profile:", err);
      setError("An error occurred while updating profile");
    } finally {
      setLoading(false);
    }
  };

  const handlePhotoUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const allowedTypes = ["image/jpg", "image/jpeg", "image/png", "image/webp"];
    if (!allowedTypes.includes(file.type)) {
      setError("Only JPG, JPEG, PNG, and WEBP files are allowed");
      return;
    }

    setUploadingPhoto(true);
    setError("");
    setSuccess("");

    try {
      const token = getAuthToken();
      if (!token) return;

      const formData = new FormData();
      formData.append("profile_picture", file);

      const response = await fetch(`${BASE_URL}/settings/profile-picture`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await response.json();

      if (data.status === "success") {
        setSuccess("Profile picture updated successfully");
        await fetchUserData();
        setTimeout(() => setSuccess(""), 3000);
      } else {
        setError(data.message || "Failed to upload photo");
      }
    } catch (err) {
      console.error("Error uploading photo:", err);
      setError("An error occurred while uploading photo");
    } finally {
      setUploadingPhoto(false);
    }
  };

  const handleCancel = () => {
    if (userData) {
      setBioText(userData.bio || "");
      setPhoneNumber(userData.phone || "");
    }
    setError("");
    setSuccess("");
  };

  const triggerFileInput = () => {
    document.getElementById("profile-photo-input").click();
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#0F1C0C]">Account Settings</h1>
        <p className="text-[#52A046] text-base mt-1">
          Manage your personal details, academic preferences, and secure your account access.
        </p>
      </div>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600 text-sm">{error}</p>
        </div>
      )}
      {success && (
        <div className="mb-4 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-green-600 text-sm">{success}</p>
        </div>
      )}

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-1/4">
          <div className="bg-white rounded-xl drop-shadow-sm border border-[#E8F4E6] p-4">
            <nav className="flex flex-col gap-1">
              {menuItems.map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center gap-3 px-3 py-2 h-10 rounded-lg text-sm font-semibold cursor-pointer transition-colors ${activeTab === item.id
                      ? "bg-[#1386011A] text-[#138601]"
                      : "text-[#0F1C0C] hover:bg-gray-50 hover:text-gray-900"
                    }`}
                >
                  <item.icon className={`size-4.5 ${activeTab === item.id ? "text-[#13860]" : "text-[#6B7280]"}`} />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="w-full lg:w-3/4 space-y-6">
          {activeTab === "profile" ? (
            <>
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="relative">
                    <img
                      src={
                        userData?.avatar_url
                          ? `${BASE_URL.replace('/api/proxy', 'https://nacos.nextgenerationones.org')}/${userData.avatar_url}`
                          : "https://api.dicebear.com/7.x/avataaars/svg?seed=Sue"
                      }
                      alt="Profile"
                      className="size-32 rounded-full border-4 border-gray-50 bg-gray-200 object-cover"
                      onError={(e) => { e.error = null; e.currentTarget.src = "https://api.dicebear.com/7.x/avataaars/svg?seed=Sue" }}
                    />
                    <button
                      type="button"
                      onClick={triggerFileInput}
                      disabled={uploadingPhoto}
                      className="absolute bottom-0 right-0 bg-white rounded-full size-9 flex items-center justify-center drop-shadow-sm cursor-pointer hover:bg-gray-50 disabled:opacity-50"
                    >
                      <CameraIcon className="size-4 text-gray-600" />
                    </button>
                    <input
                      id="profile-photo-input"
                      type="file"
                      accept=".jpg,.jpeg,.png,.webp"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </div>
                  <div className="flex flex-col gap-1 items-center sm:items-start">
                    <h2 className="text-xl md:text-2xl font-bold text-[#0F1C0C]">
                      {userData ? `${userData.first_name} ${userData.last_name}` : "Loading..."}
                    </h2>
                    <p className="text-[#52A046] font-medium">
                      {userData?.department || "Computer Science"} - {userData?.level || "400"} Level
                    </p>
                    <p className="text-sm text-[#6B7280]">
                      Matric No: {userData?.matric_no || "--------------"}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={triggerFileInput}
                  disabled={uploadingPhoto}
                  className="w-fit mx-auto sm:mx-0 flex items-center gap-2 px-4 py-2 bg-[#E8F4E6] hover:bg-gray-100 text-[#0F1C0C] rounded-lg text-sm font-bold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <UploadIcon className="size-3.5" />
                  {uploadingPhoto ? "Uploading..." : "Change Photo"}
                </button>
              </div>

              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8 pb-12">
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-lg font-bold text-[#0F1C0C]">Personal Information</h3>
                  <button type="button" className="text-[#138601] text-sm font-medium hover:text-[#138601]/80 cursor-pointer">
                    Download Data
                  </button>
                </div>

                <form className="space-y-6" onSubmit={handleProfileUpdate}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField id="firstName" label="First Name" defaultValue={userData?.first_name || ""} disabled={true} />
                    <InputField id="lastName" label="Last Name" defaultValue={userData?.last_name || ""} disabled={true} />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="email" className="text-sm font-medium text-[#0F1C0C]">Email Address</label>
                      <div className="relative">
                        <MailIcon className="absolute left-4 top-4 size-4 text-[#9CA3AF]" />
                        <input
                          type="email"
                          id="email"
                          defaultValue={userData?.email || ""}
                          disabled={true}
                          className="w-full pl-10 pr-4 py-2.5 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#138601] focus:border-transparent outline-none transition-all text-[#0F1C0C] bg-gray-50 cursor-not-allowed"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="phone" className="text-sm font-medium text-[#0F1C0C]">Phone Number</label>
                      <div className="relative">
                        <PhoneIcon className="absolute left-4 top-4 size-4 text-[#9CA3AF]" />
                        <input
                          type="tel"
                          id="phone"
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#138601] focus:border-transparent outline-none transition-all text-[#0F1C0C]"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="bg-[#F8FCF8] border border-dashed border-[#D1D5DB] rounded-lg p-4">
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Academic Details (Read-only)</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div><p className="text-xs text-[#6B7280] block mb-1">Matric Number</p><p className="text-sm font-semibold text-[#0F1C0C]">{userData?.matric_no || "--------------"}</p></div>
                      <div><p className="text-xs text-[#6B7280] block mb-1">Department</p><p className="text-sm font-semibold text-[#0F1C0C]">{userData?.department || "--------------"}</p></div>
                      <div><p className="text-xs text-[#6B7280] block mb-1">Current Level</p><p className="text-sm font-semibold text-[#0F1C0C]">{userData?.level ? userData.level + " Level" : "---------------"}</p></div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label htmlFor="bio" className="text-sm font-medium text-[#0F1C0C]">Bio</label>
                    <textarea
                      id="bio"
                      rows="4"
                      placeholder="Write a short bio about yourself..."
                      className="w-full p-4 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#138601] focus:border-transparent outline-none transition-all text-base resize-none h-32.5"
                      maxLength="300"
                      value={bioText}
                      onChange={(e) => setBioText(e.target.value)}
                    ></textarea>
                    <p className="text-right text-xs text-[#6B7280]">{bioText.length}/300 characters</p>
                  </div>

                  <div className="flex items-center justify-end gap-4 pt-6 border-t border-[#F3F4F6]">
                    <button type="button" onClick={handleCancel} className="text-sm font-bold text-[#4B5563] hover:text-gray-900 bg-transparent hover:bg-gray-100 transition-colors rounded-lg py-2.5 px-6 cursor-pointer">Cancel</button>
                    <button type="submit" disabled={loading} className="px-6 py-2.5 bg-[#138601] hover:bg-[#138601]/80 text-white text-sm font-bold rounded-lg transition-colors drop-shadow-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                      {loading ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              </div>
            </>
          ) : (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-12 flex items-center justify-center">
              <p className="text-gray-500">{menuItems.find((i) => i.id === activeTab)?.label} Content</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const InputField = ({ label, defaultValue, type = "text", id = "", disabled = false }) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={id} className="text-sm font-medium text-[#0F1C0C]">{label}</label>
    <input
      id={id}
      type={type}
      defaultValue={defaultValue}
      disabled={disabled}
      className={`w-full px-4 py-2.5 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#138601] focus:border-transparent outline-none transition-all text-base text-[#0F1C0C] ${disabled ? "bg-gray-50 cursor-not-allowed" : ""}`}
    />
  </div>
);

export default Settings;