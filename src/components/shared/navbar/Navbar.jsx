import React from "react";
import { Link } from "react-router-dom";
import img1 from "../../../assets/images/Heading 2.png";
import icon1 from "../../../assets/icons/Container.png";

const Navbar = () => {
  return (
    <div>
      <div className="mx-auto max-w-[1800px] bg-[#F6F8F5] border border-[#E8F4E6] px-[80px] py-[16px] flex justify-center gap-[75px]">
        <div className="flex items-center justify-center gap-[32px]">
          <div>
            <img src={img1} alt="" />
          </div>
          <div className="flex gap-[32px]">
            <Link to="/" className="font-medium text-[#0F1C0C] text-[14px]">
              Home
            </Link>
            <Link
              to="/about"
              className="font-medium text-[#0F1C0C] text-[14px]"
            >
              About us
            </Link>
            <Link
              to="/executives"
              className="font-medium text-[#0F1C0C] text-[14px]"
            >
              Executives
            </Link>
            <Link className="font-medium text-[#0F1C0C] text-[14px]">
              Events
            </Link>
            <Link className="font-medium text-[#0F1C0C] text-[14px]">
              Contact
            </Link>
          </div>
        </div>

        {/* ======================================= */}
        <div className="flex justify-between w-87.5">
          <div className="flex items-center rounded-lg py-3 pl-4 pr-10 w-[256px] bg-[#E8F4E6] gap-2">
            <img src={icon1} alt="search icon" />
            <input
              type="text"
              placeholder="Search executives..."
              className="outline-none"
            />
          </div>
          <Link
            to="/login"
            className="bg-brand-primary hover:bg-brand-primary/80 transition-colors rounded-lg px-5 py-3 font-bold text-[#FFFFFF] text-[14px] items-center"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

