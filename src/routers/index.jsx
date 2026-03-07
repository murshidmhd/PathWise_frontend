import { Navigate, Route, Routes } from "react-router-dom";
import AuthRoutes from "./auth";
import StudentDashboard from "../pages/student/Dashboard";
import StudentProfile from "../pages/student/Profile";
import ApprovalPage from "../pages/student/Approval";
import ParentDashboard from "../pages/parent/Dashboard";
import CounselorDashboard from "../pages/counselor/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth/landing" replace />} />
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/parent/dashboard"
        element={
          <ProtectedRoute allowedRoles={["parent"]}>
            <ParentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/student/profile"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <StudentProfile />
          </ProtectedRoute>
        }
      />

      <Route
        path="/counselor/dashboard"
        element={
          <ProtectedRoute allowedRoles={["counselor"]}>
            <CounselorDashboard />
          </ProtectedRoute>
        }
      />

      <Route path="/student/approval" element={<ApprovalPage />} />
      <Route
        path="/pending-approval"
        element={<Navigate to="/auth/approval" replace />}
      />
      <Route path="*" element={<Navigate to="/auth/landing" replace />} />
    </Routes>
  );
}
