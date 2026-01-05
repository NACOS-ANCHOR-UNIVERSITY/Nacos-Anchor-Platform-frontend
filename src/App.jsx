import { Routes, Route, Navigate } from "react-router-dom";
import StudentLayout from "./layouts/StudentLayout";
import Portfolio from "./pages/student/Portfolio";
import AdminLayout from "./layouts/AdminLayout";
import AdminPaymentsPage from "./pages/admin/Payments";

export default function App() {
  return (
    <Routes>
      <Route path="/student" element={<StudentLayout />}>
        <Route index element={<Navigate to="portfolio" replace />} />
        <Route path="portfolio" element={<Portfolio />} />

        {/* placeholders so sidebar links don't crash */}
        <Route path="dashboard" element={<div className="text-sm text-slate-600">Dashboard</div>} />
        <Route path="library" element={<div className="text-sm text-slate-600">Academic Library</div>} />
        <Route path="siwes" element={<div className="text-sm text-slate-600">SIWES</div>} />
        <Route path="payments" element={<div className="text-sm text-slate-600">Payments</div>} />
        <Route path="resources" element={<div className="text-sm text-slate-600">Resources</div>} />
        <Route path="settings" element={<div className="text-sm text-slate-600">Settings</div>} />
      </Route>

      <Route path="*" element={<Navigate to="/student/portfolio" replace />} />

      {/* Admin area */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="payments" replace />} />
        <Route path="payments" element={<AdminPaymentsPage />} />

        {/* placeholders */}
        <Route path="dashboard" element={<div className="p-8 text-sm text-slate-600">Admin Dashboard</div>} />
        <Route path="users" element={<div className="p-8 text-sm text-slate-600">User Management</div>} />
        <Route path="moderation" element={<div className="p-8 text-sm text-slate-600">Content Moderation</div>} />
        <Route path="events" element={<div className="p-8 text-sm text-slate-600">Events & Polls</div>} />
        <Route path="siwes" element={<div className="p-8 text-sm text-slate-600">SIWES Board</div>} />
        <Route path="voting" element={<div className="p-8 text-sm text-slate-600">Voting System</div>} />
      </Route>

      {/* fallback */}
      <Route path="*" element={<Navigate to="/admin/payments" replace />} />
    </Routes>
  );
}
