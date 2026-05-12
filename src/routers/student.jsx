import { Navigate, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import StudentLayout from "../components/layot/StudentLayout";
import StudentDashboard from "../pages/student/Dashboard";
import StudentAssessments from "../pages/student/Assessments";
import StudentProfile from "../pages/student/Profile";
import AssessmentQuestionsPage from "../pages/student/AssessmentQuestionsPage.jsx";
import AssessmentReportPage from "../pages/student/AssessmentReportPage.jsx";
import CareerRoadmapPage from "../pages/student/CareerRoadmapPage.jsx";
import CareerListingsPage from "../pages/student/CareerListingsPage.jsx";
import CareerScenariosPage from "../pages/student/CareerScenariosPage.jsx";
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
    <Route index element={<Navigate to="dashboard" replace />} />
    <Route path="dashboard" element={<StudentDashboard />} />
    <Route path="assessments" element={<StudentAssessments />} />
    <Route path="profile" element={<StudentProfile />} />
    <Route path="assessment_question/:id" element={<AssessmentQuestionsPage />} />
    <Route path="assessment_report/:id" element={<AssessmentReportPage />} />
    <Route path="careers" element={<CareerListingsPage />} />
    <Route path="careers/skills" element={<SkillAnalyzePage />} />
    <Route path="careers/roadmap" element={<CareerRoadmapPage />} />
    <Route path="careers/scenarios" element={<CareerScenariosPage />} />
    <Route path="chat" element={<StudentChatHub />} />
    <Route path="counselors" element={<StudentCounselors />} />
    <Route path="notifications" element={<NotificationsPage />} />
    <Route path="skills" element={<Navigate to="/student/skills/points" replace />} />
    <Route path="skills/analyze" element={<Navigate to="/student/careers/skills" replace />} />
    <Route path="skills/points" element={<SkillPointsPage />} />
    <Route path="roadmap" element={<Navigate to="/student/careers/roadmap" replace />} />
    <Route path="skill-points" element={<Navigate to="/student/skills/points" replace />} />
    <Route path="skill-analyze" element={<Navigate to="/student/careers/skills" replace />} />
  </Route>
);

export default studentRoutes;
