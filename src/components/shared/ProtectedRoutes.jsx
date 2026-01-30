import useUserStore from "@/store/useUserStore";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoutes = ({ allowedRoles }) => {
  const { isAuthenticated, user } = useUserStore();
  const location = useLocation();

  // Not logged in? Send to login, but save where they were trying to go
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Logged in, but role not authorized for this specific route?
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return (
      <Navigate
        to={user?.role === "admin" ? "/admin/dashboard" : "/student/dashboard"}
        replace
      />
    );
  }

  // Authorized? Let them through
  return <Outlet />;
};

export default ProtectedRoutes;

