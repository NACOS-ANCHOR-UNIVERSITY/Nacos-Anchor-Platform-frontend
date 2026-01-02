import React from "react";
import {Routes, Route, Navigate} from "react-router-dom";

// 1. IMPORT ADMIN COMPONENTS (Make sure paths are correct)
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./features/admin/dashboard/AdminDashboard";

// ... other imports (StudentLayout, etc.) ...

function App() {
  return (
    <Routes>
      {/* ... your existing student routes ... */}

      {/* 2. ADD THE ADMIN ROUTE BLOCK */}
      <Route path="/admin" element={<AdminLayout />}>
        {/* This handles localhost:5173/admin/dashboard */}
        <Route path="dashboard" element={<AdminDashboard />} />

        {/* Redirect /admin to /admin/dashboard automatically */}
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
