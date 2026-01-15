import React from "react";
import {Link} from "react-router-dom";

const StudentDashboard = () => {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Student Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* The Link to your new feature */}
        <Link
          to="/student/resources/upload"
          className="block p-6 bg-white border rounded-lg shadow hover:border-green-500 transition-colors"
        >
          <h3 className="font-bold text-lg text-green-700">Upload Resource</h3>
          <p className="text-sm text-gray-500">Contribute notes and slides</p>
        </Link>
      </div>
    </div>
  );
};

export default StudentDashboard;
