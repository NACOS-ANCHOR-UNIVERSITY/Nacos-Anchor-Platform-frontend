import { Navigate, Route, Routes } from "react-router-dom";
import SignupStep1 from "./pages/public/signup/signup.jsx";
import SignupStep2 from "./pages/public/signup/signup2.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signup" replace />} />
      <Route path="/signup" element={<SignupStep1 />} />
      <Route path="/signup/academic-details" element={<SignupStep2 />} />
      <Route path="*" element={<Navigate to="/signup" replace />} />
    </Routes>
  );
}
