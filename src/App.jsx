import React from "react";
import {Routes, Route, Navigate} from "react-router-dom";


import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./features/admin/dashboard/AdminDashboard";


function App() {
  return (
    <Routes>
    
      <Route path="/admin" element={<AdminLayout />}>
       
        <Route path="dashboard" element={<AdminDashboard />} />

        
        <Route index element={<Navigate to="/admin/dashboard" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
