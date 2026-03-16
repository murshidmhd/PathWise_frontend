import { Navigate, Route, Routes } from "react-router-dom";
import AuthRoutes from "./auth";
import StudentDashboard from "../pages/student/Dashboard";
import StudentProfile from "../pages/student/Profile";
import ApprovalPage from "../pages/student/Approval";
import ParentDashboard from "../pages/parent/Dashboard";
import CounselorDashboard from "../pages/counselor/Dashboard";
import CounselorProfile from "../pages/counselor/Profile";
import AdminDashboard from "../pages/admin/Dashboard";
import ProtectedRoute from "../components/ProtectedRoute";
import StudentLayout from "../components/layot/StudentLayout";
import CounselorLayout from "../components/layot/CounselorLayout";
import AdminLayout from "../components/layot/AdminLayout";
export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth/landing" replace />} />
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route
        path="/student"
        element={
          <ProtectedRoute allowedRoles={["student"]}>
            <StudentLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<StudentDashboard />} />
        <Route path="profile" element={<StudentProfile />} />
      </Route>

      <Route
        path="/parent/dashboard"
        element={
          <ProtectedRoute allowedRoles={["parent"]}>
            <ParentDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/counselor"
        element={
          <ProtectedRoute allowedRoles={["counselor"]}>
            <CounselorLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<CounselorDashboard />} />
        <Route path="profile" element={<CounselorProfile />} />
      </Route>
      <Route
        path="/admin"
        element={
          <ProtectedRoute allowedRoles={["admin"]}>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<AdminDashboard />} />
      </Route>

      <Route path="/student/approval" element={<ApprovalPage />} />
      <Route
        path="/pending-approval"
        element={<Navigate to="/auth/approval" replace />}
      />
      <Route path="*" element={<Navigate to="/auth/landing" replace />} />
    </Routes>
  );
}
