import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import client from '../../config/axios-client';
import useUserStore from '../../store/useUserStore';

const Login = () => {
  const navigate = useNavigate();
  const { login: setUserLogin } = useUserStore();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({});

  // Login mutation
  const loginMutation = useMutation({
    mutationFn: async (credentials) => {
      const response = await client.post('/auth/login', credentials);
      return response.data;
    },
    onSuccess: (data) => {
      if (data.status === 'success') {
        // Store token in localStorage
        localStorage.setItem('ACCESS_TOKEN', data.data.token);

        // Update Zustand store
        setUserLogin(data.data.user, data.data.token);

        // Redirect based on role
        if (data.data.user.role === 'student') {
          navigate('/student/dashboard');
        } else if (data.data.user.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          navigate('/');
        }
      }
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      setErrors({ general: errorMessage });
    },
  });

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
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      loginMutation.mutate(formData);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Side - Illustration */}
      <div className="hidden lg:flex lg:w-1/2  p-6 flex-col justify-between">
        <div>
          {/* Logo */}
          <div className="flex items-center gap-2 mb-12">
            <img
            src="/box.svg"
            />
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4 leading-tight">
            Empowering the Future of Technology
          </h1>
          <p className="text-[#128401]  font-[Lexend] text-xl leading-relaxed">
            Join the centralized platform for Anchor University<br />
            Computer Science students. Manage payments,<br />
            access resources, and collaborate seamlessly.
          </p>
        </div>

        {/* Illustration */}
        <div className="flex pt-10 my-12">
          <div className="relative">
            {/* Computer Screen with Illustration */}
            <div className="w-auto h-auto relative overflow-hidden flex items-center justify-center">
              <img src="/Illustration.svg" alt="Login illustration" className="w-full h-full object-contain " />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-sm text-[#000000] flex items-center gap-2 flex-wrap">
          <span>© 2026 NACOS Anchor University</span>
          <span>•</span>
          <Link to="/privacy" className="hover:text-gray-700 transition-colors">Privacy Policy</Link>
          <span>•</span>
          <Link to="/contact" className="hover:text-gray-700 transition-colors">Contact Support</Link>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className=" lg:w-1/2 flex items-center justify-center p-8 pt-32 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-left mb-8">
            <h2 className="text-xl font-bold  text-[#0F172A]">NACOS Anchor University</h2>
          </div>

          {/* Login Card */}
            <h3 className="text-3xl font-bold  tracking-tight text-gray-900 mb-2">Welcome Back, Student</h3>
            <p className="text-gray-600 text-sm mb-6">
              Enter your credentials to access your student portal.
            </p>

            {/* Error Message */}
            {errors.general && (
              <div className="mb-6 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                {errors.general}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email Input */}
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
                    className={`w-full pl-10 pr-4 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0d7c01] focus:border-transparent transition-all ${
                      errors.email ? 'border-red-500' : 'border-gray-300'
                    }`}
                  />
                </div>
                {errors.email && (
                  <p className="mt-1.5 text-xs text-red-600">{errors.email}</p>
                )}
              </div>

              {/* Password Input */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-[#138601] hover:text-[#0a6001] text-semibold text-[lexend] font-medium"
                  >
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
                    className={`w-full pl-10 pr-12 py-3 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#0d7c01] focus:border-transparent transition-all ${
                      errors.password ? 'border-red-500' : 'border-gray-300'
                    }`}
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
                disabled={loginMutation.isPending}
                className="w-full bg-[#0d7c01] text-white py-3 rounded-lg font-semibold hover:bg-[#0a6001] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed mt-6"
              >
                {loginMutation.isPending ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Signing In...
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-xs">
                  <span className="px-3 bg-white text-gray-500">OR</span>
                </div>
              </div>

              {/* Create Account Link */}
              <div className="text-center">
                <Link
                  to="/signup"
                  className="text-sm font-semibold text-gray-900 hover:text-[#0d7c01] transition-colors"
                >
                  Create New Account
                </Link>
              </div>
            </form>

            {/* Contact Support */}
            <div className="mt-6 text-center text-sm text-gray-600">
              Having trouble logging in?{' '}
              <Link to="/contact" className="text-[#0d7c01] hover:text-[#0a6001] font-medium">
                Contact Support
              </Link>
            </div>
          
        </div>
      </div>
    </div>
  );
};

export default Login;
