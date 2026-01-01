import {Navigate, Outlet} from "react-router-dom";
import {useUserStore} from "../../store/useUserStore"; 

const ProtectedRoutes = ({allowedRoles}) => {
  const {token, user} = useUserStore();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

 
  if (!allowedRoles.includes(user.role)) {
    return (
      <Navigate
        to={user.role === "admin" ? "/admin/dashboard" : "/student/dashboard"}
        replace
      />
    );
  }

 
  return <Outlet />;
};

export default ProtectedRoutes;
