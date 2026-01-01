import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import AnalyticsPage from "../features/analytics/AnalyticsPage";
import LoginPage from "../features/auth/LoginPage";
import RegisterPage from "../features/auth/RegisterPage";
import DownloadsPage from "../features/downloads/DownloadsPage";
import ProfilePage from "../features/profile/ProfilePage";
import RecommendationsPage from "../features/recommendations/RecommendationsPage";
import DashboardLayout from "../layouts/DashboardLayout";

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route
      path="/"
      element={
        <ProtectedRoute>
          <DashboardLayout />
        </ProtectedRoute>
      }
    >
      <Route index element={<RecommendationsPage />} />
      <Route path="analytics" element={<AnalyticsPage />} />
      <Route path="downloads" element={<DownloadsPage />} />
      <Route path="profile" element={<ProfilePage />} />
    </Route>
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

export default AppRoutes;
