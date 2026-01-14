// src/components/shared/Sidebar.jsx
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <div className="w-64 bg-white border-r border-gray-200 min-h-screen p-6 flex flex-col">
      {/* Logo */}
      <div className="flex items-center space-x-3 mb-8">
        <img src="/logo-sidebar.png" alt="NACOS" className="w-8 h-8" />
        <div>
          <div className="font-bold text-gray-800 text-lg">NACOS</div>
          <div className="text-xs text-gray-600">Admin Console</div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="space-y-4 flex-1">
        <Link to="/admin/dashboard" className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
          <img src="/icon-dashboard.png" alt="Dashboard" className="h-5 w-5" />
          Dashboard
        </Link>

        <Link to="/admin/users" className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
          <img src="/icon-users.png" alt="User Management" className="h-5 w-5" />
          User Management
        </Link>

        <Link to="/admin/moderation" className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-white bg-nacos-green rounded-md">
          <img src="/icon-moderation.png" alt="Content Moderation" className="h-5 w-5" />
          Content Moderation
        </Link>

        <Link to="/admin/reports" className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
          <img src="/icon-reports.png" alt="Financial Reports" className="h-5 w-5" />
          Financial Reports
        </Link>

        {/* MODULES Section */}
        <div className="px-3 pt-4">
          <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">Modules</span>
        </div>

        <Link to="/admin/events" className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
          <img src="/icon-events.png" alt="Events & Polls" className="h-5 w-5" />
          Events & Polls
        </Link>

        <Link to="/admin/siwes" className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
          <img src="/icon-siwes.png" alt="SIWES Board" className="h-5 w-5" />
          SIWES Board
        </Link>

        <Link to="/admin/voting" className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded-md">
          <img src="/icon-voting.png" alt="Voting System" className="h-5 w-5" />
          Voting System
        </Link>
      </nav>

      {/* Logout */}
      <div className="mt-auto pt-4 border-t border-gray-200">
        <button className="flex items-center space-x-3 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md w-full">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;