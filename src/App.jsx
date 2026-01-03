import { Navigate, Route, Routes } from "react-router-dom";
import AcademicDetails from "./pages/public/signup/signup2.jsx";
import PersonalInformation from "./pages/public/signup/signup.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/pages/public/signup/signup.jsx" replace />} />
      <Route path="/pages/public/signup/signup.jsx" element={<PersonalInformation />} />
      <Route path="/signup/signup2.jsx" element={<AcademicDetails />} />
      <Route path="*" element={<Navigate to="/pages/public/signup/signup.jsx" replace />} />
    </Routes>
  );
}
