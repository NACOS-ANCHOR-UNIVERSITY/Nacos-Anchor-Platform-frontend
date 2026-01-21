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
  const [isLoading, setIsLoading] = useState(false); // Manually handle loading

  // --- HANDLERS ---
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    // Clear errors when user types
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    }
    // Basic email regex (kept simple to avoid blocking valid emails)
    else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // --- THE DIRECT FETCH SUBMIT ---
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    const toastId = toast.loading("Verifying credentials...");

    try {
      console.log("Logging in via Fetch...");

      // 1. Direct API Call (Bypasses Proxy)
      const response = await fetch("https://nacos.nextgenerationones.org/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      // 2. Handle API Errors
      if (!response.ok) {
        throw new Error(result.message || "Login failed. Check your credentials.");
      }

      // 3. SUCCESS! Save Data
      console.log("Login Success:", result);

      // Save Token (Critical for Dashboard)
      const token = result.token || result.data?.token;
      localStorage.setItem("ACCESS_TOKEN", token);
      localStorage.setItem("token", token); // Saving twice just to be safe with your other code

      // Save User Info
      const userData = result.user || result.data?.user;
      localStorage.setItem("user", JSON.stringify(userData));

      toast.dismiss(toastId);
      toast.success("Welcome back!");

      // 4. Redirect based on Role
      if (userData?.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/student/dashboard');
      }

    } catch (error) {
      console.error("Login Error:", error);
      toast.dismiss(toastId);
      setErrors({ general: error.message || "Connection failed. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex">
      {/* Left Side - Illustration (Kept exactly as you had it) */}
      <div className="hidden lg:flex lg:w-1/2 bg-white p-12 flex-col justify-between">
        <div>
          <div className="flex items-center gap-2 mb-8">
            <div className="w-10 h-10 bg-gray-900 rounded-lg"></div>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Empowering the Future of Technology
          </h1>
          <p className="text-green-600 mb-2">
            Join the centralized platform for Anchor University
          </p>
          <p className="text-green-600 mb-2">
            Computer Science students. Manage payments,
          </p>
          <p className="text-green-600 font-medium">
            access resources, and collaborate seamlessly.
          </p>
        </div>

        {/* Illustration */}
        <div className="flex justify-center items-end">
          <div className="relative">
            <div className="w-64 h-64 border-4 border-gray-900 rounded-lg relative">
              <div className="absolute top-1/3 left-8 right-8">
                <div className="h-3 bg-green-600 rounded-full mb-3"></div>
                <div className="h-3 bg-gray-300 rounded-full mb-3"></div>
                <div className="h-3 bg-gray-300 rounded-full w-3/4"></div>
              </div>
            </div>
            {/* Person illustration */}
            <div className="absolute -right-12 bottom-0">
              <div className="w-24 h-32 bg-green-600 rounded-t-full"></div>
              <div className="w-24 h-16 bg-gray-800"></div>
              <div className="flex gap-2 mt-2">
                <div className="w-10 h-20 bg-gray-800 rounded-b-lg"></div>
                <div className="w-10 h-20 bg-gray-800 rounded-b-lg"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-sm text-gray-500">
          © 2026 NACOS Anchor University • Privacy Policy • Contact Support
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-right mb-8">
            <h2 className="text-2xl font-bold text-gray-900">NACOS Anchor University</h2>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back, Student</h3>
            <p className="text-gray-600 text-sm mb-6">Enter your credentials to access your student portal</p>

            {/* Error Message */}
            {errors.general && (
              <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {errors.general}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Email Input */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Matric Number / Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. 001234 or student@aul.edu.ng"
                  className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Password Input */}
              <div className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <Link to="/forgot-password" className="text-sm text-green-600 hover:text-green-700">
                    Forgot Password?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Enter your password"
                    className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 ${errors.password ? 'border-red-500' : 'border-gray-300'
                      }`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="mt-1 text-sm text-red-600">{errors.password}</p>
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
            </form>

            {/* Create Account Link */}
            <div className="mt-6 text-center">
              <Link to="/signup" className="text-green-600 hover:text-green-700 font-medium">
                Create New Account
              </Link>
            </div>

            {/* Contact Support */}
            <div className="mt-6 text-center text-sm text-gray-600">
              Having trouble logging in?{' '}
              <Link to="/contact" className="text-green-600 hover:text-green-700">
                Contact Support
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;