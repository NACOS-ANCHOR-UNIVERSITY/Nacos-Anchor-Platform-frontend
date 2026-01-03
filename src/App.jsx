import React from "react";
import {Routes, Route, Navigate} from "react-router-dom";


import ChatPage from "./features/community/pages/ChatPage";

function App() {
  return (
    <Routes>
   
      <Route path="/" element={<Navigate to="/student/community" replace />} />

    
      <Route path="/student/community" element={<ChatPage />} />
    </Routes>
  );
}

export default App;
