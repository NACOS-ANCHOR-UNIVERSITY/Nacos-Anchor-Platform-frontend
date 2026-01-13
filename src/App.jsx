import Navbar from "./components/shared/navbar/Navbar";
import Footer from "./components/shared/footer/Footer";
import "./index.css";
import {Routes, Route} from "react-router-dom";
import Landing from "./pages/public/Landing";
import AboutUs from "./pages/public/AboutUs";
import Executivepage from "./pages/public/Executivepage";
import Contact from "./pages/public/Contact";
import Events from "./pages/public/Events";
import Login from "./features/auth/Login";
import Signup from "./pages/student/Signup";
import PublicLayout from "./layouts/PublicLayout";
import StudentDashboardLayout from "./layouts/dashboard/StudentDashboardLayout";
import DashboardHome from "./pages/student/dashboard-home";

function App() {
  return (
    <>
      <Routes>
      {/* public layout for the landing page and the navbar links */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/executives" element={<Executivepage />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        {/* student dashboard layout */}
        <Route element={<StudentDashboardLayout />}>
          <Route path="/student/dashboard" element={<DashboardHome />} />
      </Route>


        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
