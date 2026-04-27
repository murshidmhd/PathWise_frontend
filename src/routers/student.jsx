import { Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import StudentLayout from "../components/layot/StudentLayout";
import StudentDashboard from "../pages/student/Dashboard";
import StudentAssessments from "../pages/student/Assessments";
import StudentProfile from "../pages/student/Profile";
import AssessmentQuestionsPage from "../pages/student/AssessmentQuestionsPage.jsx";
import AssessmentReportPage from "../pages/student/AssessmentReportPage.jsx";
import CareerRoadmapPage from "../pages/student/CareerRoadmapPage.jsx";
import CareerListingsPage from "../pages/student/CareerListingsPage.jsx";
import StudentChatHub from "../pages/student/StudentChatHub.jsx";
import StudentCounselors from "../pages/student/Counselors.jsx";
import NotificationsPage from "../pages/student/Notifications.jsx";
import SkillPointsPage from "../pages/student/SkillPoints.jsx";
import SkillAnalyzePage from "../pages/student/SkillAnalyze.jsx";

const studentRoutes = (
  <Route
    path="/student"
    element={
      <ProtectedRoute allowedRoles={["student"]}>
        <StudentLayout />
      </ProtectedRoute>
    }
  >
    <Route path="dashboard" element={<StudentDashboard />} />
    <Route path="assessments" element={<StudentAssessments />} />
    <Route path="profile" element={<StudentProfile />} />
    <Route path="assessment_question/:id" element={<AssessmentQuestionsPage />} />
    <Route path="assessment_report/:id" element={<AssessmentReportPage />} />
    <Route path="careers" element={<CareerListingsPage />} />
    <Route path="roadmap" element={<CareerRoadmapPage />} />
    <Route path="chat" element={<StudentChatHub />} />
    <Route path="counselors" element={<StudentCounselors />} />
    <Route path="notifications" element={<NotificationsPage />} />
    <Route path="skill-points" element={<SkillPointsPage />} />
    <Route path="skill-analyze" element={<SkillAnalyzePage />} />
  </Route>
);

export default studentRoutes;
