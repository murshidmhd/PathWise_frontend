// src/components/ProtectedRoute.jsx
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const roleHome = {
  student: "/student/dashboard",
  parent: "/parent/dashboard",
  counselor: "/counselor/dashboard",
  admin: "/admin/dashboard",
};

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const location = useLocation();
  const { token, role } = useSelector((state) => state.auth);

  // Allow auth pages without token (login/register/landing/etc.)
  if (location.pathname.startsWith("/auth")) {
    return children;
  }

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  if (allowedRoles.length && !allowedRoles.includes(role)) {
    return <Navigate to={roleHome[role] || "/auth/landing"} replace />;
  }

  return children;
};

export default ProtectedRoute;
