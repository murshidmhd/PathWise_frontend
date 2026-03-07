// src/components/ProtectedRoute.jsx
import { Navigate, useLocation } from "react-router-dom";

const roleHome = {
  student: "/student/dashboard",
  parent: "/parent/dashboard",
  counselor: "/counselor/dashboard",
};

const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const location = useLocation();
  const token = localStorage.getItem("access");
  const role = localStorage.getItem("role");

  // Allow auth pages without token (login/register/landing/etc.)
  if (location.pathname.startsWith("/auth")) {
    return children;
  }

  if (!token) { 
    return <Navigate to="/auth/landing" replace />;
  }

  if (allowedRoles.length && !allowedRoles.includes(role)) {
    return <Navigate to={roleHome[role] || "/auth/landing"} replace />;
  }

  return children;
};

export default ProtectedRoute;
