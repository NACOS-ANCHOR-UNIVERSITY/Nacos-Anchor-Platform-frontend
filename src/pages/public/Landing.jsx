import Navbar from "../../components/shared/navbar/Navbar";
import Footer from "../../components/shared/footer/footer";
import React from "react";
import hero from "../../assets/images/hero1.png";
import secondimg from "../../assets/images/section1.png";
import seventh from "../../assets/images/7th section.png";
import dues from "../../assets/images/Dues.png";
import past from "../../assets/images/past.png";
import update from "../../assets/images/updates.png";
import members from "../../assets/images/members.png";
import questions from "../../assets/images/question.png";
import happy from "../../assets/images/happy.png";
import payments from "../../assets/images/payment.png";
import fifteen from "../../assets/images/15th.png";
import communicate from "../../assets/images/communication.png";
import collarb from "../../assets/images/collaboration.png";
import innovate from "../../assets/images/innovation.png";
import star from "../../assets/images/star.png";

const Landing = () => {
  return (
    <div>
      <Navbar />
      <div>
        {/* ====hero section==== */}
        <div className="flex w-[1500px] mx-auto items-center mt-[178px] mb-[316px]">
          <div className="w-[808px] mx-auto flex flex-col gap-[32px] items-start">
            <h1 className="font-semibold text-[64px] text-[#4D4D4D]">
              Unlock Your Full Potential as a NACOS Student.
            </h1>
            <p className="font-normal text-[18px] text-[#717171]">
              Welcome to your new digital home. From lecture notes to exam past
              questions, everything you need is now just a click away.
            </p>
            <button className="bg-[#138601] rounded-[4px] py-[14px] px-[32px] font-medium text-[16px] text-[#FFFFFF]">
              Join the Community
            </button>
          </div>
          <div>
            <img src={hero} alt="" className="w-[657px] " />
          </div>
        </div>

        {/* ====Section two==== */}
        <div className="text-center w-[1110px] mx-auto flex flex-col gap-[8px]">
          <h2 className="font-semibold text-[36px] text-[#4D4D4D]">About Us</h2>
          <p className="font-normal text-[18px] text-[#717171] w-[1110px]">
            NACOS which stands for Nigeria Association of Computing
            Students(NACOS) formerly known as Nigeria Association of Computer
            Science Students(NACOSS) Students
          </p>
        </div>

        {/* ====Section three==== */}
        <div className="flex items-center gap-[180px] mt-[69px] w-[1493px] mx-auto">
          <div>
            <img src={secondimg} alt="" />
          </div>
          <div className="flex flex-col gap-[32px] items-start w-[661px]">
            <h2 className="font-semibold text-[36px] text-[#000000]">
              More Than Just An Association.
            </h2>
            <p className="font-normal text-[18px] text-[#717171]">
              We are the heartbeat of the Computer Science department at Anchor
              University. We exist to bridge the gap between the classroom and
              the tech industry, providing our students with a centralized
              platform for academic resources, mentorship, and career growth.
            </p>
            <button className="bg-[#128401] rounded-[4px] py-[14px] px-[32px] font-medium text-[16px] text-[#FFFFFF]">
              Meet the Excos
            </button>
          </div>
        </div>

        {/* ====Section four==== */}
        <div className="w-[1300px] mx-auto mb-[241px] flex flex-col gap-[16px] mt-[117px] text-center">
          <h2 className="font-semibold text-[36px] text-[#000000]">
            Why we are here
          </h2>
          <div className="flex items-center justify-between">
            <div className="flex flex-col gap-[8px] items-center rounded-[8px] py-[24px] px-[32px] bg-[#FFFFFF] w-[299px] text-center">
              <img src={dues} alt="" />
              <p className="font-bold text-[28px] text-[#000000]">
                Pay Nacos Dues
              </p>
              <p className="font-normal text-[18px] text-[#717171]">
                Our management software provides full automation of membership
                renewals and payments
              </p>
            </div>

            <div className="flex flex-col gap-[8px] items-center rounded-[8px] py-[24px] px-[32px] bg-[#FFFFFF] w-[299px] text-center">
              <img src={past} alt="" />
              <p className="font-bold text-[26px] text-[#000000]">
                Get past questions
              </p>
              <p className="font-normal text-[18px] text-[#717171]">
                {" "}
                Our management software provides full automation of membership
                renewals and payments
              </p>
            </div>

            <div className="flex flex-col gap-[8px]  items-center rounded-[8px] py-[24px] px-[32px] bg-[#FFFFFF] w-[299px] text-center">
              {" "}
              <img src={update} alt="" />
              <p className="font-bold text-[28px] text-[#000000]">Updates</p>
              <p className="font-normal text-[18px] text-[#717171]">
                {" "}
                Our management software provides full automation of membership
                renewals and payments
              </p>
            </div>
          </div>
        </div>

        {/* ====Section five==== */}
        <div className="bg-[#128401] flex gap-[330px] px-[144px] py-[64px] items-center mx-auto w-[1400px]">
          <div>
            <h2 className="font-semibold text-[36px] text-[#FFFFFF]">
              How far we’ve come
            </h2>
            <p className="font-normal text-[16px] text-[#DDDDDD]">
              We reached here with our hard work and dedication
            </p>
          </div>

          <div className="grid grid-cols-2 gap-[40px]">
            <div className="flex items-center gap-[16px]">
              <img src={members} alt="" />
              <div className="flex flex-col">
                <p className="font-bold text-[28px] text-[#FFFFFF]">1,276</p>
                <p className="font-normal text-[16px] text-[#ABABAB]">
                  Members
                </p>
              </div>
            </div>

            <div className="flex items-center gap-[16px]">
              <img src={questions} alt="" />
              <div className="flex flex-col">
                <p className="font-bold text-[28px] text-[#FFFFFF]">1,276</p>
                <p className="font-normal text-[16px] text-[#ABABAB]">
                  Past Questions
                </p>
              </div>
            </div>

            <div className="flex items-center gap-[16px]">
              <img src={happy} alt="" />
              <div className="flex flex-col">
                <p className="font-bold text-[28px] text-[#FFFFFF]">1,276</p>
                <p className="font-normal text-[16px] text-[#ABABAB]">
                  Happy Students
                </p>
              </div>
            </div>

            <div className="flex items-center gap-[16px]">
              <img src={payments} alt="" />
              <div className="flex flex-col">
                <p className="font-bold text-[28px] text-[#FFFFFF]">1,276</p>
                <p className="font-normal text-[16px] text-[#ABABAB]">
                  Payments
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* ====Section six==== */}

        <div className="max-w-[1400px] mx-auto mb-[195px] mt-[210px] px-[32px] text-center relative">
          <h3 className="text-center font-semibold text-[40px] text-[#000000] pb-[181px]">
            How we work
          </h3>
          <div className="grid grid-cols-2 gap-[150px] place-items-center">
            <div className="col-span-2 w-[760px] text-center flex flex-col items-center">
              <img src={communicate} alt="" />

              <p className="font-normal text-[18px] text-[#717171]">
                <span className="font-semibold text-[40px] text-[#000000]">
                  Communication
                </span>{" "}
                <br /> We believe in open governance. From real-time election
                results to automated receipt generation for departmental dues,
                our platform ensures every transaction and vote is accounted for
                and visible.
              </p>
            </div>

            <img src={star} alt="" className="absolute bottom-[150px]" />

            <div className="text-center flex flex-col items-center">
              <img src={collarb} alt="" />

              <p className="font-normal text-[18px] text-[#717171]">
                <span className="font-semibold text-[40px] text-[#000000]">
                  Collaboration
                </span>{" "}
                <br /> Knowledge grows when shared. Our platform breaks down
                silos between levels, allowing 100L to 400L students to share
                resources, mentor one another, and collaborate on projects
                through our digital library.
              </p>
            </div>

            <div className="text-center flex flex-col items-center">
              <img src={innovate} alt="" />
              <p className="font-normal text-[18px] text-[#717171]">
                <span className="font-semibold text-[40px] text-[#000000]">
                  Innovation
                </span>{" "}
                <br /> We are preparing for the future. By integrating digital
                ID cards, QR-based attendance (future), and portfolio
                management, we are building a tech-first culture that reflects
                the spirit of Computer Science.
              </p>
            </div>
          </div>
        </div>

        {/* ====Section seven==== */}
        <div className="flex items-center gap-[90px] mt-[69px] w-[1000px] mx-auto">
          <div>
            <img src={seventh} alt="" />
          </div>
          <div className="flex flex-col gap-[32px] items-start w-[661px]">
            <h2 className="font-semibold text-[36px] text-[#000000]">
              Our Digital Ecosystem
            </h2>
            <p className="font-normal text-[18px] text-[#717171]">
              We have built a centralized web-based system designed to serve
              every student in the department. From secure student onboarding
              and identity management to real-time academic resource sharing,
              this platform replaces manual processes with transparency,
              accountability, and speed.
            </p>
            <button className="bg-[#128401] rounded-[4px] py-[14px] px-[32px] font-medium text-[16px] text-[#FFFFFF]">
              Explore Features
            </button>
          </div>
        </div>

        {/* ====Section eight==== */}
        <div className="mt-[200px] mb-[176px]">
          <h2 className="font-bold text-[40px] text-[#000000] text-center">
            Events
          </h2>
          <div className="pt-[22px]">
            <div className="flex flex-col w-[1341px] mx-auto">
              <div className="flex items-center justify-between py-[40px] border-b border-[#E5E7EB]">
                <div className="flex items-start gap-[16px]">
                  <img src={fifteen} alt="" />
                  <div className="flex flex-col items-start gap-[10px]">
                    <p className="font-bold text-[24px] text-[#1A1A1A]">
                      Annual NACOS Executive Election
                    </p>
                    <p className="font-normal text-[16px] text-[#555555]">
                      Election of new student leadership for the department.
                      Open to all registered students.
                    </p>
                    <div className="rounded-[9999px] bg-[#E6F4EA]">
                      <p className="font-bold text-[14px] text-[#006837] py-[6px] px-[16px]">
                        8:00 AM
                      </p>
                    </div>
                  </div>
                </div>
                <div className="border-[#128401] border-2 bg-[#FFFFFF] rounded-[4px] py-[14px] px-[34px]">
                  <button className="font-bold text-[14px] text-[#128401]">
                    Read More
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between py-[40px] border-b border-[#E5E7EB]">
                <div className="flex items-start gap-[16px]">
                  <img src={fifteen} alt="" />
                  <div className="flex flex-col items-start gap-[10px]">
                    <p className="font-bold text-[24px] text-[#1A1A1A]">
                      Annual NACOS Executive Election
                    </p>
                    <p className="font-normal text-[16px] text-[#555555]">
                      Election of new student leadership for the department.
                      Open to all registered students.
                    </p>
                    <div className="rounded-[9999px] bg-[#E6F4EA]">
                      <p className="font-bold text-[14px] text-[#006837] py-[6px] px-[16px]">
                        8:00 AM
                      </p>
                    </div>
                  </div>
                </div>
                <div className="border-[#128401] border-2 bg-[#FFFFFF] rounded-[4px] py-[14px] px-[34px]">
                  <button className="font-bold text-[14px] text-[#128401]">
                    Read More
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between py-[40px] border-b border-[#E5E7EB]">
                <div className="flex items-start gap-[16px]">
                  <img src={fifteen} alt="" />
                  <div className="flex flex-col items-start gap-[10px]">
                    <p className="font-bold text-[24px] text-[#1A1A1A]">
                      Annual NACOS Executive Election
                    </p>
                    <p className="font-normal text-[16px] text-[#555555]">
                      Election of new student leadership for the department.
                      Open to all registered students.
                    </p>
                    <div className="rounded-[9999px] bg-[#E6F4EA]">
                      <p className="font-bold text-[14px] text-[#006837] py-[6px] px-[16px]">
                        8:00 AM
                      </p>
                    </div>
                  </div>
                </div>
                <div className="border-[#128401] border-2 bg-[#FFFFFF] rounded-[4px] py-[14px] px-[34px]">
                  <button className="font-bold text-[14px] text-[#128401]">
                    Read More
                  </button>
                </div>
              </div>

              <button className="font-bold text-[14px] bg-[#128401] text-[#FFFFFF] rounded-[4px] py-[14px] px-[34px] w-[976px] mx-auto mt-[45px]">
                See all events
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Landing;
