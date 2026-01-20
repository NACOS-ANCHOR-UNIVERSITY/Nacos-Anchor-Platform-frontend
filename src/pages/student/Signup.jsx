import Navbar from "../../components/shared/navbar/Navbar";
import stu from "../../assets/images/student.png";
import material from "../../assets/images/materials.png";
import hub from "../../assets/images/hub.png";
import three from "../../assets/images/three.png";
import left from "../../assets/images/left.png";
import right from "../../assets/images/right.png";
import namee from "../../assets/images/name.png";
import mail from "../../assets/images/mail.png";
import phone from "../../assets/images/phone.png";
import React from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div>
      <Navbar />

      <div className="flex w-[1100px] mx-auto rounded-[16px] border-2 border-[#F3F4F6] bg-[#FFFFFF] mt-[36px]">
        <div className="flex flex-col bg-[#1386010D] rounded-l-[16px] p-[40px] w-[457px] ">
          <div className="flex gap-[8px] items-center">
            <img src={stu} alt="" />
            <h3 className="font-bold text-[20px] text-[#138601]">
              Student Portal
            </h3>
          </div>
          <h2 className="font-bold text-[30px] text-[#0D141B]">
            Unlock your academic potential
          </h2>
          <p className="font-normal text-[16px] text-[#4C739A]">
            Join the digital ecosystem for Anchor University computer science
            students. Access exclusive resources, track your dues, and network
            with industry leaders.
          </p>
          <div className="flex flex-col gap-[16px] pt-[32px]">
            <div className="flex items-center gap-[16px] bg-[#FFFFFF] border border-[#FFFFFF] rounded-[12px] p-[12px]">
              <img src={material} alt="" />
              <div className="flex flex-col">
                <p className="font-semibold text-[14px] text-[#0D141B]">
                  Course Materials
                </p>
                <p className="font-normal text-[12px] text-[#4C739A]">
                  Past questions & lecture notes
                </p>
              </div>
            </div>

            <div className="flex items-center gap-[16px] bg-[#FFFFFF] border border-[#FFFFFF] rounded-[12px] p-[12px]">
              <img src={hub} alt="" />
              <div className="flex flex-col">
                <p className="font-semibold text-[14px] text-[#0D141B]">
                  Community Hub
                </p>
                <p className="font-normal text-[12px] text-[#4C739A]">
                  Connect with alumni & peers{" "}
                </p>
              </div>
            </div>
          </div>

          <div className="pt-[87px]">
            <div className="flex items-center">
              <div>
                <img src={three} alt="" />
              </div>
              <div className="font-medium text-[12px] text-[#4C739A]">
                Joined by 500+ students
              </div>
            </div>
          </div>
        </div>

        <div className="p-[40px]">
          <div className="flex flex-col gap-[8px] pb-[32px]">
            <p className="font-semibold text-[14px] text-[#138601]">
              Step 1 of 2
            </p>
            <div className="flex justify-between items-end">
              <h3 className="font-bold text-[24px] text-[#0D141B]">
                Personal Information
              </h3>
              <p className="font-normal text-[12px] text-[#4C739A]">
                Next Academic Details
              </p>
            </div>
            <div className="flex w-[545px] h-[8px] bg-[#F3F4F6] rounded-[9999px]">
              <div className="bg-[#138601] w-[181.5px] rounded-[9999px]"></div>
            </div>
          </div>

          <form action="" className="flex flex-col gap-[10px]">
            <div class="w-full flex flex-col sm:flex-row sm:items-center items-start gap-4">
              <div class="flex-1 flex flex-col gap-2 w-full h-[90px] relative">
                <label
                  for=""
                  className="font-medium text-[14px] text-[#0D141B]"
                >
                  First Name
                </label>
                <input
                  type="text"
                  placeholder="e.g Ade"
                  className=" border border-[#E5E7EB] rounded-md px-4 py-2 cursor-pointer bg-[#F9FAFB] w-full outline-none"
                />
                <img
                  src={namee}
                  alt=""
                  className="absolute bottom-[25px] items-center right-[14px]"
                />
              </div>

              <div class="flex-1 flex flex-col gap-2 w-full h-[90px]">
                <label
                  for=""
                  className="font-medium text-[14px] text-[#0D141B]"
                >
                  {" "}
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="e.g Oluwaseun"
                  className=" border border-[#E5E7EB] rounded-md px-4 py-2 cursor-pointer bg-[#F9FAFB] w-full outline-none"
                />
              </div>
            </div>
            <div class="w-full flex flex-col gap-2 relative">
              <label for="" className="font-medium text-[14px] text-[#0D141B]">
                {" "}
                University Email Address
              </label>
              <input
                type="email"
                placeholder="student@anchor.edu.ng"
                className="border border-[#E5E7EB] bg-[#F9FAFB] rounded-md w-full px-4 py-2 cursor-pointer outline-none pl-[45px]"
              />
              <p className="font-normal text-[12px] text-[#4C739A]">
                Please use your official university email for verification
              </p>
              <img
                src={mail}
                alt=""
                className="absolute bottom-[31px] items-center left-[14px]"
              />
            </div>
            <div>
              <label
                htmlFor=""
                className="font-medium text-[14px] text-[#0D141B] relative"
              >
                Phone Number
              </label>
              <input
                type="text"
                placeholder="+234 800 000 0000"
                className="border border-[#E5E7EB] bg-[#F9FAFB] rounded-md w-full px-4 py-2 pl-[40px] cursor-pointer outline-none"
              />
              <img
                src={phone}
                alt=""
                className="absolute top-[510px] items-center left-[730px]"
              />
            </div>
            <div className="flex justify-between pt-[34px]">
              <div className="py-[8px] px-[16px] rounded-[8px] flex items-center gap-[6px]">
                <img src={left} alt="" />
                <button className="font-medium text-[16px] text-[]#4C739A">
                  Back
                </button>
              </div>
              <button className="font-bold text-[16px] text-[#FFFFFF] bg-[#138601] rounded-[8px] py-[12px] px-[32px] flex items-center gap-[6px]">
                Next Step
                <img src={right} alt="" />
              </button>
            </div>
            <div className="font-normal text-[14px] text-[#4C739A] text-center">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-semibold text-sm text-[#138601] hover:underline"
              >
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

