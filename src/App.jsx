import { Navigate, Route, Routes } from "react-router-dom";
import AcademicDetails from "./pages/public/student-portal/AcademicDetails.jsx";
import PersonalInformation from "./pages/public/student-portal/PersonalInformation.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/student-portal/personal-information" replace />} />
      <Route path="/student-portal/personal-information" element={<PersonalInformation />} />
      <Route path="/student-portal/academic-details" element={<AcademicDetails />} />
      <Route path="*" element={<Navigate to="/student-portal/personal-information" replace />} />
    </Routes>
  );
}
