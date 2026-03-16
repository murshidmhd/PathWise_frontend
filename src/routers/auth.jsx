import { Navigate, Route, Routes } from "react-router-dom";
import PathWiseLanding from "../pages/auth/Landing";
import RoleSelection from "../pages/auth/RoleSelection";
import RoleSelectionGoogle from "../pages/auth/RoleSelectionGoogle";
import Register from "../pages/auth/Register";
import VerifyOtp from "../pages/auth/VerifyOtp";
import Login from "../pages/auth/Login";
import ApprovalPage from "../pages/student/Approval";
import CompleteRegistration from "../pages/auth/CompleteRegistration";
export default function AuthRoutes() {
  return (
    <Routes>
      <Route path="landing" element={<PathWiseLanding />} />
      <Route path="role-selection" element={<RoleSelection />} />
      <Route path="role-selection-google" element={<RoleSelectionGoogle />} />
      <Route
        path="role"
        element={<Navigate to="/auth/role-selection" replace />}
      />
      <Route path="complete-registration" element={<CompleteRegistration />} />
      <Route
        path="select-role"
        element={<Navigate to="/auth/role-selection-google" replace />}
      />
      <Route
        path="selectrole"
        element={<Navigate to="/auth/role-selection-google" replace />}
      />
      <Route path="register" element={<Register />} />
      <Route path="verify-otp" element={<VerifyOtp />} />
      <Route path="login" element={<Login />} />
      <Route path="approval" element={<ApprovalPage />} />
    </Routes>
  );
}
