import { Navigate, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import AdminLayout from "../components/layot/AdminLayout";
import AdminDashboard from "../pages/admin/Dashboard";
import PlatformDashboard from "../pages/admin/PlatformDashboard";
import AdminColleges from "../pages/admin/Colleges";

const superAdminRoutes = (
  <Route
    path="/superadmin"
    element={
      <ProtectedRoute allowedRoles={["platform_admin"]}>
        <AdminLayout />
      </ProtectedRoute>
    }
  >
    <Route index element={<Navigate to="dashboard" replace />} />
    <Route path="dashboard" element={<PlatformDashboard />} />
    <Route path="colleges" element={<AdminColleges />} />
  </Route>
);

export default superAdminRoutes;
