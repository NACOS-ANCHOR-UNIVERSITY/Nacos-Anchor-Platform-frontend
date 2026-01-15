import React from "react";
import img2 from "../../../assets/images/Icon.png";
import icon2 from "../../../assets/icons/Container2.png";
import icon3 from "../../../assets/icons/Container 3.png";
import icon4 from "../../../assets/icons/Container 4.png";
import {Link} from "react-router-dom";

const Footer = () => {
  return (
    <div className="flex flex-col justify-center mx-auto max-w-[1800x]">
      <div className="px-[260px] bg-white border border-[#E8F4E6] pt-[64px] pb-[32px]">
        <div className="grid grid-cols-4 w-[1096px] pb-[48px] mx-auto">
          <div className="flex flex-col w-[238px]">
            <div className="flex items-center gap-[8px]">
              <img src={img2} alt="" />
              <p className="font-bold text-[20px] text-[#0F172A]">
                NACOS Anchor
              </p>
            </div>
            <div>
              <p className="font-normal text-[14px] text-[#475569] pr-[20px]">
                The official student body for the Department of Computer Science
                at <br />
                Anchor University, Lagos.
              </p>
            </div>
          </div>

          <div className="flex flex-col gap-[16px] w-[238px]">
            <p className="font-bold text-[14px] text-[#0F172A]">Quick Links</p>
            <div className="flex flex-col gap-[12px] font-normal text-[14px] text-[#475569]">
              <Link>About us</Link>
              <Link>Executive Team</Link>
              <Link>Constitution</Link>
              <Link>Events Calendar</Link>
            </div>
          </div>

          <div className="flex flex-col gap-[16px] w-[238px]">
            <p className="font-bold text-[14px] text-[#0F172A]">Resources</p>
            <div className="flex flex-col gap-[12px] font-normal text-[14px] text-[#475569]">
              <Link>Student Portal</Link>
              <Link>Pay Dues</Link>
              <Link>Academic Library</Link>
              <Link>Past Questions</Link>
            </div>
          </div>

          <div className="flex flex-col gap-[16px] w-[238px]">
            <p className="font-bold text-[14px] text-[#0F172A]">Contact</p>
            <div className="flex flex-col gap-[12px] font-normal text-[14px] text-[#475569]">
              <div className="flex items-start gap-[5px]">
                <img src={icon3} alt="" />
                <p>Anchor University, Lagos. Ayobo Road, Ipaja.</p>
              </div>
              <div className="flex items-center gap-[5px]">
                <img src={icon2} alt="" />
                <p>info@nacosanchor.edu.ng</p>
              </div>
            </div>
          </div>
        </div>

        <hr className="text-[#F1F5F9] w-[1096px] mx-auto" />

        <div className="flex justify-between items-center w-[1096px] mx-auto pt-[32px]">
          <p className="font-normal text-[14px] text-[#64748B]">
            © 2026 NACOS Anchor University. All rights reserved.
          </p>
          <img src={icon4} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Footer;
