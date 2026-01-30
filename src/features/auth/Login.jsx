import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { authService } from "@/services/authService";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.password) newErrors.password = "Password is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    // 🛑 THE FIX: Clear old data immediately so "Student" and "Admin" 
    // tokens never mix. This runs BEFORE we get the new token.
    localStorage.clear();
    sessionStorage.clear();

    setIsLoading(true);
    try {
      // Now we fetch the NEW, CLEAN token
      const { user } = await authService.login(formData);

      toast.success(`Welcome back, ${user.first_name}!`);

      // Navigate based on the NEW role
      navigate(
        user.role === "admin" ? "/admin/dashboard" : "/student/dashboard",
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F7F8] flex">
      {/* --- LEFT SIDE (Illustration) --- */}
      <div className="hidden lg:flex lg:w-1/2 bg-white p-12 flex-col justify-between border-r border-gray-200">
        <div>
          <div className="flex items-center gap-2 mb-12">
            <img src="/box.svg" alt="Logo" className="h-10" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Empowering the Future of Technology
          </h1>
          <p className="text-[#128401] font-[Lexend] text-xl leading-relaxed">
            Join the centralized platform for Anchor University
            <br />
            Computer Science students.
          </p>
        </div>
        <div className="flex-1 flex items-center justify-center my-12">
          <img
            src="/Illustration.svg"
            alt="Login illustration"
            className="w-full max-w-md h-auto object-contain"
          />
        </div>
        <div className="text-sm text-gray-500 flex items-center gap-2 flex-wrap">
          <span>© 2026 NACOS Anchor University</span>
          <span>•</span>
          <Link to="/privacy" className="hover:text-gray-900 transition-colors">
            Privacy Policy
          </Link>
        </div>
      </div>

      {/* --- RIGHT SIDE (Form) --- */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#F6F7F8]">
        <div className="w-full max-w-md">
          <div className="text-left mb-8">
            <h2 className="text-xl font-bold text-[#0F172A]">
              NACOS Anchor University
            </h2>
          </div>

          <h3 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">
            Welcome Back, Student
          </h3>
          <p className="text-[#64748B] text-sm mb-6">
            Enter your credentials to access your student portal.
          </p>

          {errors.general && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Matric Number / Email
              </label>
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. 19/1234 or student@aul.edu.ng"
                  className={`w-full pl-4 pr-4 py-3 border rounded-lg text-sm focus:ring-2 focus:ring-[#0d7c01] transition-all ${errors.email ? "border-red-500" : "border-gray-300"}`}
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-600">{errors.email}</p>
              )}
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-medium text-gray-900">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  size="sm"
                  className="text-sm text-[#138601] font-medium"
                >
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={`w-full pl-4 pr-12 py-3 border rounded-lg text-sm focus:ring-2 focus:ring-[#0d7c01] transition-all ${errors.password ? "border-red-500" : "border-gray-300"}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs text-red-600">{errors.password}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 disabled:bg-gray-400 transition-colors"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

