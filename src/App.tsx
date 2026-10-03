import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import DashboardLayout from './layouts/DashboardLayout';
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Onboarding from './pages/Onboarding';
import Dashboard from './pages/Dashboard';
import Roadmap from './pages/Roadmap';
import Courses from './pages/Courses';
import CourseDetail from './pages/CourseDetail';
import Lesson from './pages/Lesson';
import ChallengePage from './pages/ChallengePage';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import ProjectSubmit from './pages/ProjectSubmit';
import FeedbackPage from './pages/FeedbackPage';
import Progress from './pages/Progress';
import Portfolio from './pages/Portfolio';
import MentorDashboard from './pages/MentorDashboard';
import MentorReviews from './pages/MentorReviews';
import MentorReviewDetail from './pages/MentorReviewDetail';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Landing />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/onboarding" element={<Onboarding />} />

        {/* Student dashboard routes */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/courses" element={<Courses />} />
          <Route path="/courses/:courseId" element={<CourseDetail />} />
          <Route path="/lessons/:lessonId" element={<Lesson />} />
          <Route path="/challenges/:challengeId" element={<ChallengePage />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/:projectId" element={<ProjectDetail />} />
          <Route path="/projects/:projectId/submit" element={<ProjectSubmit />} />
          <Route path="/feedback" element={<FeedbackPage />} />
          <Route path="/progress" element={<Progress />} />
          <Route path="/portfolio" element={<Portfolio />} />
        </Route>

        {/* Mentor routes */}
        <Route element={<DashboardLayout isMentor />}>
          <Route path="/mentor" element={<MentorDashboard />} />
          <Route path="/mentor/reviews" element={<MentorReviews />} />
          <Route path="/mentor/reviews/:submissionId" element={<MentorReviewDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
