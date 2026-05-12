import { Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import CounselorLayout from "../components/layot/CounselorLayout";
import CounselorApprovalPage from "../pages/counselor/Approval";
import CounselorDashboard from "../pages/counselor/Dashboard";
import CounselorProfile from "../pages/counselor/Profile";
import CounselorStudents from "../pages/counselor/Students";
import CounselorStudentDetail from "../pages/counselor/StudentDetail";
import CounselorChatHub from "../pages/counselor/CounselorChatHub";
import NotificationsPage from "../pages/counselor/Notifications.jsx";

const counselorRoutes = (
  <Route
    path="/counselor"
    element={
      <ProtectedRoute allowedRoles={["counselor"]}>
        <CounselorLayout />
      </ProtectedRoute>
    }
  >
    <Route path="dashboard" element={<CounselorDashboard />} />
    <Route path="students" element={<CounselorStudents />} />
    <Route path="students/:studentId" element={<CounselorStudentDetail />} />
    <Route path="profile" element={<CounselorProfile />} />
    <Route path="approval" element={<CounselorApprovalPage />} />
    <Route path="chat" element={<CounselorChatHub />} />
    <Route path="notifications" element={<NotificationsPage />} />
  </Route>
);

export default counselorRoutes;
