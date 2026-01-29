import Navbar from "./components/shared/navbar/Navbar";
import Footer from "./components/shared/footer/Footer";
import "./index.css";
import { Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "sonner";
import Landing from "./pages/public/Landing";
import AboutUs from "./pages/public/AboutUs";
import Executivepage from "./pages/public/Executivepage";
import Contact from "./pages/public/Contact";
import Events from "./pages/public/Events";
import Login from "./features/auth/Login";
import Signup from "./pages/public/signup/signUp";
import PublicLayout from "./layouts/PublicLayout";
import StudentDashboardLayout from "./layouts/StudentDashboardLayout";
import DashboardHome from "./pages/student/dashboard-home";
import StudentSiwesPage from "./features/student/dashboard/StudentSiwesPage";
import StudentPaymentReceipt from "./features/student/dashboard/StudentPayementReceipt";
import Settings from "./pages/student/settings";
import Portfolio from "./pages/student/Portfolio";
import SiwesBoard from "./pages/student/siwes-board";
import AdminLayout from "./layouts/AdminLayout";
import AdminDashboard from "./features/admin/dashboard/AdminDashboard";
import UploadResourcePage from "./features/library/pages/UploadResourcePage";
import AdminPaymentsPage from "./pages/admin/Payments";
import UserManagement from "./pages/admin/UserManagement";
import LibraryPage from "./features/library/pages/LibraryPage";
import SiwesBoardMgt from "./pages/admin/siwes-board";
import NotFound from "./pages/public/NotFound";
import EventsAndPolls from "./pages/admin/EventsAndPolls";

function App() {
  return (
    <>
      <Toaster position="top-center" richColors />
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
          <Route
            path={"/student/Payments"}
            element={<StudentPaymentReceipt />}
          />
          {/* <Route path={"/student/siwes"} element={<StudentSiwesPage />} /> */}
          <Route path={"/student/siwes"} element={<SiwesBoard />} />
          <Route path="/student/library" element={<LibraryPage />} />
          <Route path="/student/settings" element={<Settings />} />
          <Route
            path="/student/resources/upload"
            element={<UploadResourcePage />}
          />
          <Route path="/student/profile" element={<Portfolio />} />
        </Route>

        {/* Admin dashboard */}
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/payments" element={<AdminPaymentsPage />} />
          <Route path="/admin/events" element={<EventsAndPolls />} />
          <Route path="/admin/siwes" element={<SiwesBoardMgt />} />
        </Route>

        {/* public */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

