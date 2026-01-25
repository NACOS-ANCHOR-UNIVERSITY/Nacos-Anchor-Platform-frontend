import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

const Login = () => {
  const navigate = useNavigate();

  // --- STATE ---
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // --- HANDLERS ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email';
    if (!formData.password) newErrors.password = 'Password is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    const toastId = toast.loading("Verifying credentials...");

    try {
      const response = await fetch("https://nacos.nextgenerationones.org/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) throw new Error(result.message || "Login failed.");

      // Save Data
      localStorage.setItem("ACCESS_TOKEN", result.token || result.data?.token);
      localStorage.setItem("token", result.token || result.data?.token);
      const userData = result.user || result.data?.user;
      localStorage.setItem("user", JSON.stringify(userData));

      toast.dismiss(toastId);
      toast.success("Welcome back!");

      if (userData?.role === 'admin') navigate('/admin/dashboard');
      else navigate('/student/dashboard');

    } catch (error) {
      console.error("Login Error:", error);
      toast.dismiss(toastId);
      setErrors({ general: error.message || "Connection failed." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F6F7F8] flex">

      {/* --- LEFT SIDE (Illustration) --- */}
      {/* Fixed: Moved this div to be a sibling of the form, not a parent */}
      <div className="hidden lg:flex lg:w-1/2 bg-white p-12 flex-col justify-between border-r border-gray-200">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-2 mb-12">
            <img src="/box.svg" alt="Logo" className="h-10" />
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Empowering the Future of Technology
          </h1>
          <p className="text-[#128401] font-[Lexend] text-xl leading-relaxed">
            Join the centralized platform for Anchor University<br />
            Computer Science students. Manage payments,<br />
            access resources, and collaborate seamlessly.
          </p>
        </div>

        {/* Illustration */}
        <div className="flex-1 flex items-center justify-center my-12">
          <div className="w-full max-w-md">
            <img src="/Illustration.svg" alt="Login illustration" className="w-full h-auto object-contain" />
          </div>
        </div>

        {/* Footer */}
        <div className="text-sm text-gray-500 flex items-center gap-2 flex-wrap">
          <span>© 2026 NACOS Anchor University</span>
          <span>•</span>
          <Link to="/privacy" className="hover:text-gray-900 transition-colors">Privacy Policy</Link>
          <span>•</span>
          <Link to="/contact" className="hover:text-gray-900 transition-colors">Contact Support</Link>
        </div>
      </div>

      {/* --- RIGHT SIDE (Login Form) --- */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-[#F6F7F8]">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-left mb-8">
            <h2 className="text-xl font-bold text-[#0F172A]">NACOS Anchor University</h2>
          </div>

          {/* Login Card Title */}
          <h3 className="text-3xl font-bold tracking-tight text-gray-900 mb-2">Welcome Back, Student</h3>
          <p className="text-[#64748B] text-sm mb-6">
            Enter your credentials to access your student portal.
          </p>

          {/* Error Message */}
          {errors.general && (
            <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              {errors.general}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email Input (Fixed: Removed duplicate input) */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                Matric Number / Email
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </span>
                <input
                  type="text"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. 19/1234 or student@aul.edu.ng"
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 bg-white focus:ring-[#0d7c01] focus:border-transparent transition-all ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                />
              </div>
              {errors.email && (
                <p className="mt-1.5 text-xs text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Password Input (Fixed: Removed duplicate className) */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                  Password
                </label>
                <Link to="/forgot-password" className="text-sm text-[#138601] hover:text-[#0a6001] font-medium">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </span>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  className={`w-full pl-10 pr-12 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 bg-white focus:ring-[#0d7c01] focus:border-transparent transition-all ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1.5 text-xs text-red-600">{errors.password}</p>
              )}
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-[#F6F7F8] text-gray-500">OR</span>
              </div>
            </div>

            {/* Create Account Link */}
            <div className="text-center">
              <button type="button" className="border border-[#E2E8F0] bg-white p-2 rounded-lg w-full hover:bg-gray-50 transition-colors">
                <Link
                  to="/signup"
                  className="text-md font-bold tracking-tight text-[#0F172A] hover:text-[#0d7c01] block w-full h-full"
                >
                  Create New Account
                </Link>
              </button>
            </div>
          </form>

          {/* Contact Support */}
          <div className="mt-6 text-center text-sm text-gray-600">
            Having trouble logging in?{' '}
            <Link to="/contact" className="text-[#138601] hover:text-[#0a6001] font-medium">
              Contact Support
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;