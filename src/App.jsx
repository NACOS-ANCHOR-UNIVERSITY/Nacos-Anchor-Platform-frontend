import { Navigate, Route, Routes } from "react-router-dom";
import AcademicDetails from "./pages/public/signup/signup2.jsx";
import PersonalInformation from "./pages/public/signup/signup.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/signup" replace />} />
      <Route path="/signup" element={<PersonalInformation />} />
      <Route path="/signup/academic-details" element={<AcademicDetails />} />
      <Route path="*" element={<Navigate to="/signup" replace />} />
    </Routes>
  );
}
