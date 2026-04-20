import { Navigate, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import AdminLayout from "../components/layot/AdminLayout";
import AdminDashboard from "../pages/admin/Dashboard";
import AdminApprovals from "../pages/admin/Approvals";
import AdminUsers from "../pages/admin/Users";
import AdminReports from "../pages/admin/Reports";
import AdminSettings from "../pages/admin/Settings";
import CounselorApprovalPage from "../pages/counselor/Approval";
import CounselorApprovals from "../pages/admin/CounselorApproval";
import AdminCounselorRequests from "../pages/admin/CounselorRequests";

const adminRoutes = (
  <Route
    path="/admin"
    element={
      <ProtectedRoute allowedRoles={["admin"]}>
        <AdminLayout />
      </ProtectedRoute>
    }
  >
    <Route index element={<Navigate to="dashboard" replace />} />
    <Route path="dashboard" element={<AdminDashboard />} />
    <Route path="approvals" element={<AdminApprovals />} />
    <Route path="users" element={<AdminUsers />} />
    {/* <Route path="reports" element={<AdminReports />} /> */}
    {/* <Route path="settings" element={<AdminSettings />} /> */}
    <Route path="counselor-approval" element={<CounselorApprovals />} />
    <Route path="counselor-requests" element={<AdminCounselorRequests />} />
  </Route>
);

export default adminRoutes;
