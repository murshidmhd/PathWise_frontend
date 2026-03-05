import { Navigate, Route, Routes } from "react-router-dom";
import AuthRoutes from "./auth";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/auth/landing" replace />} />
      <Route path="/auth/*" element={<AuthRoutes />} />
      <Route path="*" element={<Navigate to="/auth/landing" replace />} />
    </Routes>
  );
}
