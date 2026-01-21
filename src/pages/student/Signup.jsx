import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { authService } from "../../services/authService"; // Ensure this path is correct
import { toast } from "sonner"; // Or your preferred toast library
import Navbar from "../../components/shared/navbar/Navbar";
import {
  User, Mail, Phone, ChevronLeft, ChevronRight,
  BookOpen, Hash, Lock, GraduationCap
} from "lucide-react";

// Images (Keep your imports)
import stu from "../../assets/images/student.png";
import material from "../../assets/images/materials.png";
import hub from "../../assets/images/hub.png";
import three from "../../assets/images/three.png";

const Signup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1); // 1 = Personal, 2 = Academic

  // --- 1. Form State (Holds all data) ---
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    department: "",
    level: "",
    matric_number: "",
    password: ""
  });

  // --- 2. Handle Input Changes ---
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // --- 3. API Mutation ---
  const registerMutation = useMutation({
    mutationFn: authService.register,
    onSuccess: () => {
      toast.success("Registration Successful! Please login.");
      navigate("/login");
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Registration failed");
    }
  });

  // --- 4. Handle Submit ---
  const handleSubmit = (e) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2); // Go to next step
    } else {
      // Final Submit
      registerMutation.mutate(formData);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-10">
      <Navbar />

      <div className="flex w-full max-w-[1100px] mx-auto rounded-[16px] border-2 border-[#F3F4F6] bg-[#FFFFFF] mt-[36px] overflow-hidden shadow-sm">

        {/* --- LEFT SIDE (Static Sidebar) --- */}
        <div className="hidden lg:flex flex-col bg-[#1386010D] p-[40px] w-[457px] shrink-0">
          <div className="flex gap-[8px] items-center">
            <img src={stu} alt="" className="w-8 h-8 object-contain" />
            <h3 className="font-bold text-[20px] text-[#138601]">Student Portal</h3>
          </div>
          <h2 className="font-bold text-[30px] text-[#0D141B] mt-4 leading-tight">
            Unlock your academic potential
          </h2>
          <p className="font-normal text-[16px] text-[#4C739A] mt-4">
            Join the digital ecosystem for Anchor University computer science students.
          </p>

          <div className="flex flex-col gap-[16px] pt-[32px]">
            <div className="flex items-center gap-[16px] bg-[#FFFFFF] rounded-[12px] p-[12px] shadow-sm">
              <img src={material} alt="" className="w-10 h-10" />
              <div>
                <p className="font-semibold text-[14px] text-[#0D141B]">Course Materials</p>
                <p className="font-normal text-[12px] text-[#4C739A]">Past questions & lecture notes</p>
              </div>
            </div>
            <div className="flex items-center gap-[16px] bg-[#FFFFFF] rounded-[12px] p-[12px] shadow-sm">
              <img src={hub} alt="" className="w-10 h-10" />
              <div>
                <p className="font-semibold text-[14px] text-[#0D141B]">Community Hub</p>
                <p className="font-normal text-[12px] text-[#4C739A]">Connect with alumni & peers</p>
              </div>
            </div>
          </div>

          <div className="pt-[60px] mt-auto">
            <div className="flex items-center gap-2">
              <img src={three} alt="" className="h-8" />
              <div className="font-medium text-[12px] text-[#4C739A]">Joined by 500+ students</div>
            </div>
          </div>
        </div>

        {/* --- RIGHT SIDE (The Form) --- */}
        <div className="p-[40px] flex-1">

          {/* Progress Header */}
          <div className="flex flex-col gap-[8px] pb-[32px]">
            <p className="font-semibold text-[14px] text-[#138601]">Step {step} of 2</p>
            <div className="flex justify-between items-end">
              <h3 className="font-bold text-[24px] text-[#0D141B]">
                {step === 1 ? "Personal Information" : "Academic Information"}
              </h3>
              <p className="font-normal text-[12px] text-[#4C739A]">
                {step === 1 ? "Next: Academic Details" : "Final Step"}
              </p>
            </div>
            {/* Progress Bar */}
            <div className="flex w-full h-[8px] bg-[#F3F4F6] rounded-full overflow-hidden mt-2">
              <div
                className={`bg-[#138601] h-full rounded-full transition-all duration-300 ${step === 1 ? 'w-1/2' : 'w-full'}`}
              />
            </div>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-[20px]">

            {/* === STEP 1: PERSONAL INFO === */}
            {step === 1 && (
              <>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1 relative">
                    <label className="font-medium text-[14px] text-[#0D141B] mb-1.5 block">First Name</label>
                    <div className="relative">
                      <input type="text" name="first_name" required
                        value={formData.first_name} onChange={handleChange}
                        placeholder="e.g Ade"
                        className="border border-[#E5E7EB] rounded-md px-4 py-2.5 bg-[#F9FAFB] w-full outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all pr-10"
                      />
                      <User className="absolute right-3 top-3 text-gray-400 w-4 h-4" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="font-medium text-[14px] text-[#0D141B] mb-1.5 block">Last Name</label>
                    <input type="text" name="last_name" required
                      value={formData.last_name} onChange={handleChange}
                      placeholder="e.g Oluwaseun"
                      className="border border-[#E5E7EB] rounded-md px-4 py-2.5 bg-[#F9FAFB] w-full outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-medium text-[14px] text-[#0D141B] mb-1.5 block">University Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                    <input type="email" name="email" required
                      value={formData.email} onChange={handleChange}
                      placeholder="student@aul.edu.ng"
                      className="border border-[#E5E7EB] bg-[#F9FAFB] rounded-md w-full px-4 py-2.5 pl-10 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
                    />
                  </div>
                  <p className="font-normal text-[12px] text-[#4C739A] mt-1">Please use your official university email</p>
                </div>

                <div>
                  <label className="font-medium text-[14px] text-[#0D141B] mb-1.5 block">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                    <input type="tel" name="phone" required
                      value={formData.phone} onChange={handleChange}
                      placeholder="+234 800 000 0000"
                      className="border border-[#E5E7EB] bg-[#F9FAFB] rounded-md w-full px-4 py-2.5 pl-10 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500 transition-all"
                    />
                  </div>
                </div>
              </>
            )}

            {/* === STEP 2: ACADEMIC INFO === */}
            {step === 2 && (
              <>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label className="font-medium text-[14px] text-[#0D141B] mb-1.5 block">Department</label>
                    <div className="relative">
                      <GraduationCap className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                      <select name="department" required
                        value={formData.department} onChange={handleChange}
                        className="border border-[#E5E7EB] rounded-md px-4 py-2.5 pl-10 bg-[#F9FAFB] w-full outline-none focus:border-green-500 cursor-pointer appearance-none"
                      >
                        <option value="">Select Dept</option>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Information Tech">Information Tech</option>
                      </select>
                    </div>
                  </div>
                  <div className="flex-1">
                    <label className="font-medium text-[14px] text-[#0D141B] mb-1.5 block">Level</label>
                    <select name="level" required
                      value={formData.level} onChange={handleChange}
                      className="border border-[#E5E7EB] rounded-md px-4 py-2.5 bg-[#F9FAFB] w-full outline-none focus:border-green-500 cursor-pointer"
                    >
                      <option value="">Select Level</option>
                      <option value="100">100</option>
                      <option value="200">200</option>
                      <option value="300">300</option>
                      <option value="400">400</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="font-medium text-[14px] text-[#0D141B] mb-1.5 block">Matric Number</label>
                  <div className="relative">
                    <Hash className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                    <input type="text" name="matric_number" required
                      value={formData.matric_number} onChange={handleChange}
                      placeholder="AUL/CMP/22/000"
                      className="border border-[#E5E7EB] bg-[#F9FAFB] rounded-md w-full px-4 py-2.5 pl-10 outline-none focus:border-green-500 transition-all uppercase"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-medium text-[14px] text-[#0D141B] mb-1.5 block">Create Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
                    <input type="password" name="password" required
                      value={formData.password} onChange={handleChange}
                      placeholder="••••••••"
                      className="border border-[#E5E7EB] bg-[#F9FAFB] rounded-md w-full px-4 py-2.5 pl-10 outline-none focus:border-green-500 transition-all"
                    />
                  </div>
                </div>
              </>
            )}

            {/* BUTTONS */}
            <div className="flex justify-between pt-[20px] mt-auto">
              {step === 2 ? (
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="py-[12px] px-[16px] rounded-[8px] flex items-center gap-[6px] text-[#4C739A] hover:bg-gray-100 transition-colors"
                >
                  <ChevronLeft size={20} /> Back
                </button>
              ) : (
                <div></div> // Empty div to keep the Next button on the right
              )}

              <button
                type="submit"
                disabled={registerMutation.isPending}
                className="font-bold text-[16px] text-[#FFFFFF] bg-[#138601] hover:bg-[#0f6b01] rounded-[8px] py-[12px] px-[32px] flex items-center gap-[8px] transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md shadow-green-900/10"
              >
                {registerMutation.isPending ? "Creating Account..." : (step === 1 ? "Next Step" : "Complete Registration")}
                {!registerMutation.isPending && <ChevronRight size={20} />}
              </button>
            </div>

            <div className="font-normal text-[14px] text-[#4C739A] text-center mt-2">
              Already have an account?{" "}
              <Link to="/login" className="font-semibold text-[14px] text-[#138601] hover:underline">
                Log in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;