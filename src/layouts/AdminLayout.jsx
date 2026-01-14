// src/layouts/AdminLayout.jsx
import Sidebar from '../components/shared/Sidebar';
import Navbar from '../components/shared/Navbar';

const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 px-6 py-4 mt-8">
        <div className="flex justify-between items-center text-xs text-gray-500">
          <div>© 2024 NACOS Anchor University, Admin Console v1.2</div>
          <div className="space-x-4">
            <a href="#" className="hover:text-gray-700">System Status</a>
            <a href="#" className="hover:text-gray-700">Documentation</a>
            <a href="#" className="hover:text-gray-700">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminLayout;