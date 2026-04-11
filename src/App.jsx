import "./index.css";
import {useState, useEffect} from "react";
import {Routes, Route} from "react-router-dom";
import {Toaster} from "sonner";
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
import AdminActivityLogs from "./pages/admin/AdminActivityLogs";
import RestoreTransactions from "./pages/admin/RestoreTransactions";
import StudentNews from "./pages/student/StudentNews";
import NotFound from "./pages/public/NotFound";
import EventsAndPolls from "./pages/admin/EventsAndPolls";
import ComingSoon from "./components/shared/ComingSoon";
import ProtectedRoutes from "./components/shared/ProtectedRoutes";
import useUserStore from "./store/useUserStore";
import SplashScreen from "./components/shared/SplashScreen";

function App() {
  const hasHydrated = useUserStore((state) => state._hasHydrated);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    // If the store is hydrated, start the 2s timer to hide the splash
    if (hasHydrated) {
      const timer = setTimeout(() => {
        setShowSplash(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [hasHydrated]);

  // If we haven't hydrated OR the 2s timer hasn't finished, stay on Splash
  if (!hasHydrated || showSplash) {
    return <SplashScreen />;
  }

  return (
    <>
      <Toaster position="top-center" richColors />
      <Routes>
        {/* public routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/executives" element={<Executivepage />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* coming soon */}
        <Route path="/voting" element={<ComingSoon />} />
        <Route path="/moderation" element={<ComingSoon />} />

        {/* student routes (secured) */}
        <Route element={<ProtectedRoutes allowedRoles={["student"]} />}>
          <Route element={<StudentDashboardLayout />}>
            <Route path="/student/dashboard" element={<DashboardHome />} />
            <Route
              path="/student/payments"
              element={<StudentPaymentReceipt />}
            />
            <Route path="/student/siwes" element={<StudentSiwesPage />} />
            <Route path="/student/library" element={<LibraryPage />} />
            <Route path="/student/settings" element={<Settings />} />
            <Route
              path="/student/resources/upload"
              element={<UploadResourcePage />}
            />
            <Route path="/student/news" element={<StudentNews />} />
            <Route path="/student/profile" element={<Portfolio />} />
          </Route>
        </Route>

        {/* admin routes (secured) */}
        <Route element={<ProtectedRoutes allowedRoles={["admin"]} />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/payments" element={<AdminPaymentsPage />} />
            <Route path="/admin/events" element={<EventsAndPolls />} />
            <Route path="/admin/siwes" element={<SiwesBoardMgt />} />
            <Route path="/admin/activities" element={<AdminActivityLogs />} />
            <Route path="/admin/restore" element={<RestoreTransactions />} />
          </Route>
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
