import React from "react";
import {Outlet} from "react-router-dom";
import Navbar from "../components/shared/Navbar"; // Import the Navbar we just built

const StudentLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main className="pt-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Outlet />
      </main>
    </div>
  );
};

export default StudentLayout;
