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

const BASE_URL = "https://nacos.nextgenerationones.org/api";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [bioText, setBioText] = useState("");
  const [userData, setUserData] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [uploadingPhoto, setUploadingPhoto] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [passwords, setPasswords] = useState({
    current_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [showPasswords, setShowPasswords] = useState(false);

  const menuItems = [
    { id: "profile", label: "Edit Profile", icon: UserIcon },
    { id: "security", label: "Account Security", icon: LockIcon },
    // coming soon...
    // { id: "notifications", label: "Notifications", icon: NotificationIcon },
    // { id: "appearance", label: "Appearance", icon: Eye },
    // { id: "billing", label: "Billing", icon: CreditCardIcon },
  ];

  // Fetch user data on component mount
  useEffect(() => {
    fetchUserData();
  }, []);

  const getAuthToken = () => {
    return localStorage.getItem("token");
  };

  const fetchUserData = async () => {
    try {
      const token = getAuthToken();

      // Check if token exists
      if (!token) {
        setError("You are not logged in. Please login to continue.");
        // Redirect to login page after 2 seconds
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

      const data = await response.json();

      if (data.status === "success") {
        console.log(data);
        setUserData(data.data.user);
        setBioText(data.data.user.bio || "");
        setPhoneNumber(data.data.user.phone || "");
      } else if (response.status === 401) {
        // Token is invalid or expired
        setError("Your session has expired. Please login again.");
        localStorage.removeItem("token");
        setTimeout(() => {
          window.location.href = "/login"; // Update this path to your actual login route
        }, 2000);
      } else {
        setError(data.message || "Failed to load user data");
      }
    } catch (err) {
      console.error("Error fetching user data:", err);
      setError("Failed to load user data");
    }
  };

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = getAuthToken();

      if (!token) {
        setError("You are not logged in. Please login to continue.");
        return;
      }

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
        // Refresh user data
        await fetchUserData();
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(""), 3000);
      } else if (response.status === 401) {
        setError("Your session has expired. Please login again.");
        localStorage.removeItem("token");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
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

    // Validate file type
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

      if (!token) {
        setError("You are not logged in. Please login to continue.");
        setUploadingPhoto(false);
        return;
      }

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
        // Refresh user data to get new avatar URL
        await fetchUserData();
        // Clear success message after 3 seconds
        setTimeout(() => setSuccess(""), 3000);
      } else if (response.status === 401) {
        setError("Your session has expired. Please login again.");
        localStorage.removeItem("token");
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
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
    // Reset form to original user data
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

  const handleChangePassword = async (e) => {
    e.preventDefault();

    if (passwords.new_password !== passwords.confirm_password) {
      setError("New passwords do not match");
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = getAuthToken();
      const response = await fetch(`${BASE_URL}/student/change-password`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          current_password: passwords.current_password,
          new_password: passwords.new_password,
        }),
      });

      const data = await response.json();

      if (data.status === "success") {
        setSuccess("Password updated successfully");
        setPasswords({
          current_password: "",
          new_password: "",
          confirm_password: "",
        });
      } else {
        setError(data.message || "Failed to update password");
      }
    } catch (err) {
      console.error("Error updating password:", err);
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-[#0F1C0C]">Account Settings</h1>
        <p className="text-[#52A046] text-base mt-1">
          Manage your personal details, academic preferences, and secure your
          account access.
        </p>
      </div>

      {/* Error and Success Messages */}
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
                      activeTab === item.id ? "text-[#13860]" : "text-[#6B7280]"
                    }`}
                  />
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        <div className="w-full lg:w-3/4 space-y-6">
          {activeTab === "profile" && (
            <>
              {/* Profile Header */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="relative">
                    <img
                      src={
                        userData?.avatar_url
                          ? `${BASE_URL}/${userData.avatar_url}`
                          : "https://api.dicebear.com/7.x/avataaars/svg?seed=Sue"
                      }
                      alt="Profile"
                      className="size-32 rounded-full border-4 border-gray-50 bg-gray-200 object-cover"
                      onError={(e) => {
                        e.currentTarget.src =
                          "https://api.dicebear.com/7.x/avataaars/svg?seed=Sue";
                      }}
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
                      {userData
                        ? `${userData.first_name} ${userData.last_name}`
                        : "Loading..."}
                    </h2>
                    <p className="text-[#52A046] font-medium">
                      {userData?.department || "Computer Science"} -{" "}
                      {userData?.level || "400"} Level
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
                  className="w-fit mx-auto sm:mx-0 flex items-center gap-2 px-4 py-2 bg-[#E8F4E6] hover:bg-gray-100 text-[#0F1C0C] rounded-lg text-sm font-bold transition-colors disabled:opacity-50"
                >
                  <UploadIcon className="size-3.5" />
                  {uploadingPhoto ? "Uploading..." : "Change Photo"}
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

                <form className="space-y-6" onSubmit={handleProfileUpdate}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <InputField
                      id="firstName"
                      label="First Name"
                      defaultValue={userData?.first_name || ""}
                      disabled={true}
                    />
                    <InputField
                      id="lastName"
                      label="Last Name"
                      defaultValue={userData?.last_name || ""}
                      disabled={true}
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
                          defaultValue={userData?.email || ""}
                          disabled={true}
                          className="w-full pl-10 pr-4 py-2.5 border border-[#E5E7EB] rounded-lg bg-gray-50 cursor-not-allowed outline-none"
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
                          value={phoneNumber}
                          onChange={(e) => setPhoneNumber(e.target.value)}
                          className="w-full pl-10 pr-4 py-2.5 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#138601] outline-none"
                        />
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
                      className="w-full p-4 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#138601] outline-none resize-none h-32.5"
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
                      onClick={handleCancel}
                      className="text-sm font-bold text-[#4B5563] hover:bg-gray-100 rounded-lg py-2.5 px-6"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-6 py-2.5 bg-[#138601] text-white text-sm font-bold rounded-lg disabled:opacity-50"
                    >
                      {loading ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}

          {activeTab === "security" && (
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 sm:p-8">
              <div className="mb-8">
                <h3 className="text-lg font-bold text-[#0F1C0C]">
                  Account Security
                </h3>
                <p className="text-sm text-gray-500">
                  Update your password to keep your account secure.
                </p>
              </div>

              <form
                onSubmit={handleChangePassword}
                className="space-y-6 max-w-md"
              >
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[#0F1C0C]">
                    Current Password
                  </label>
                  <input
                    type={showPasswords ? "text" : "password"}
                    required
                    value={passwords.current_password}
                    onChange={(e) =>
                      setPasswords({
                        ...passwords,
                        current_password: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#138601] outline-none"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[#0F1C0C]">
                    New Password
                  </label>
                  <input
                    type={showPasswords ? "text" : "password"}
                    required
                    value={passwords.new_password}
                    onChange={(e) =>
                      setPasswords({
                        ...passwords,
                        new_password: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#138601] outline-none"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-[#0F1C0C]">
                    Confirm New Password
                  </label>
                  <input
                    type={showPasswords ? "text" : "password"}
                    required
                    value={passwords.confirm_password}
                    onChange={(e) =>
                      setPasswords({
                        ...passwords,
                        confirm_password: e.target.value,
                      })
                    }
                    className="w-full px-4 py-2.5 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#138601] outline-none"
                  />
                </div>

                <div
                  className="flex items-center gap-2 cursor-pointer"
                  onClick={() => setShowPasswords(!showPasswords)}
                >
                  <input
                    type="checkbox"
                    checked={showPasswords}
                    readOnly
                    className="rounded border-gray-300 text-[#138601]"
                  />
                  <span className="text-sm text-gray-600">Show passwords</span>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full sm:w-fit px-8 py-2.5 bg-[#138601] hover:bg-[#138601]/80 text-white text-sm font-bold rounded-lg transition-colors disabled:opacity-50"
                  >
                    {loading ? "Updating..." : "Update Password"}
                  </button>
                </div>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const InputField = ({
  label,
  defaultValue,
  type = "text",
  id = "",
  disabled = false,
}) => (
  <div className="flex flex-col gap-2">
    <label htmlFor={id} className="text-sm font-medium text-[#0F1C0C]">
      {label}
    </label>
    <input
      id={id}
      type={type}
      defaultValue={defaultValue}
      disabled={disabled}
      className={`w-full px-4 py-2.5 border border-[#E5E7EB] rounded-lg focus:ring-2 focus:ring-[#138601] focus:border-transparent outline-none transition-all text-base text-[#0F1C0C] ${
        disabled ? "bg-gray-50 cursor-not-allowed" : ""
      }`}
    />
  </div>
);

export default Settings;

