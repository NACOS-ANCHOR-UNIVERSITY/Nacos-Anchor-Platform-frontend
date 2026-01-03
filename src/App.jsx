import { Routes, Route, Navigate } from "react-router-dom";
import StudentLayout from "./layouts/StudentLayout";
import Portfolio from "./pages/student/Portfolio";

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
    </Routes>
  );
}
