import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  MapPin,
  Twitter,
  Facebook,
  Instagram,
  Linkedin,
} from "lucide-react";
import img2 from "../../../assets/images/Icon.png";

// Custom link component that scrolls to top on navigation
const ScrollLink = ({ to, children, className }) => {
  const navigate = useNavigate();
  
  const handleClick = (e) => {
    e.preventDefault();
    window.scrollTo(0, 0);
    navigate(to);
  };
  
  return (
    <a href={to} onClick={handleClick} className={className}>
      {children}
    </a>
  );
};

const Footer = () => {
  return (
    <div className="flex flex-col justify-center mx-auto w-full max-w-[1800x]">
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
              <ScrollLink to="/about">About us</ScrollLink>
              <ScrollLink to="/executives">Executive Team</ScrollLink>
              <ScrollLink to="/about#history">Roadmap</ScrollLink>
              <ScrollLink to="/events">Events Calendar</ScrollLink>
            </div>
          </div>

          <div className="flex flex-col gap-[16px] w-[238px]">
            <p className="font-bold text-[14px] text-[#0F172A]">Resources</p>
            <div className="flex flex-col gap-[12px] font-normal text-[14px] text-[#475569]">
              <ScrollLink to="/login">Student Portal</ScrollLink>
              <ScrollLink to="/login">Pay Dues</ScrollLink>
              <ScrollLink to="/login">Academic Library</ScrollLink>
              <ScrollLink to="/login">Past Questions</ScrollLink>
            </div>
          </div>

          <div className="flex flex-col gap-[16px] w-[238px]">
            <p className="font-bold text-[14px] text-[#0F172A]">Contact</p>
            <div className="flex flex-col gap-[12px] font-normal text-[14px] text-[#475569]">
              <div className="flex items-start gap-[5px]">
                <MapPin className="h-4 w-4 mt-0.5 shrink-0 text-slate-500" />
                <p>Anchor University, Lagos. Ayobo Road, Ipaja.</p>
              </div>
              <div className="flex items-center gap-[5px]">
                <Mail className="h-4 w-4 shrink-0 text-slate-500" />
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
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="text-slate-500 hover:text-brand-primary transition-colors"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-slate-500 hover:text-brand-primary transition-colors"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-slate-500 hover:text-brand-primary transition-colors"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="text-slate-500 hover:text-brand-primary transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
