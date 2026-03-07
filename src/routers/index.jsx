import { Navigate, Route, Routes } from "react-router-dom";
import AuthRoutes from "./auth";
import StudentDashboard from "../pages/student/Dashboard";
import ApprovalPage from "../pages/student/Approval";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth/landing" replace />} />
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="/student/dashboard" element={<StudentDashboard />} />
      <Route path="/student/approval" element={<ApprovalPage />} />
      {/* <Route path="*" element={<Navigate to="/auth/landing" replace />} /> */}
    </Routes>
  );
}
