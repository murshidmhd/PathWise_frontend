import { Navigate, Route, Routes } from "react-router-dom";
import AuthRoutes from "./auth";
import ProtectedRoute from "../components/ProtectedRoute";
import studentRoutes from "./student";
import counselorRoutes from "./counselor";
import adminRoutes from "./admin";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth/landing" replace />} />
      <Route
        path="/auth/*"
        element={
          <ProtectedRoute allowGuests>
            <AuthRoutes />
          </ProtectedRoute>
        }
      />
      {studentRoutes}
      {counselorRoutes}
      {adminRoutes}
      <Route
        path="/pending-approval"
        element={<Navigate to="/counselor/approval" replace />}
      />
      <Route path="*" element={<Navigate to="/auth/landing" replace />} />
    </Routes>
  );
}
