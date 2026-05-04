import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const roleHome = {
  student: "/student",
  counselor: "/counselor/dashboard",
  admin: "/admin",
};

const ProtectedRoute = ({ children, allowedRoles = [], allowGuests = false }) => {
  const location = useLocation();
  const { token, role, approvalStatus } = useSelector((state) => state.auth);
  const isGuestAuthRoute =
    location.pathname === "/auth/login" ||
    location.pathname === "/auth/register" ||
    location.pathname === "/auth/landing" ||
    location.pathname === "/auth/role-selection" ||
    location.pathname === "/auth/role-selection-google" ||
    location.pathname === "/auth/role" ||
    location.pathname === "/auth/select-role" ||
    location.pathname === "/auth/selectrole" ||
    location.pathname === "/auth/complete-registration" ||
    location.pathname === "/auth/verify-otp";
  const isApprovalRoute =
    location.pathname === "/auth/approval" ||
    location.pathname === "/counselor/approval";

  if (allowGuests) {
    if (token && isGuestAuthRoute) {
      return <Navigate to={roleHome[role] || "/"} replace />;
    }
    return children;
  }

  if (!token) {
    return <Navigate to="/auth/login" replace />;
  }

  if (role === "counselor" && approvalStatus !== "approved") {
    if (!isApprovalRoute) {
      return <Navigate to="/auth/approval" replace />;
    }
    return children;
  }

  if (allowedRoles.length && !allowedRoles.includes(role)) {
    return <Navigate to={roleHome[role] || "/auth/landing"} replace />;
  }

  return children;
};

export default ProtectedRoute;
