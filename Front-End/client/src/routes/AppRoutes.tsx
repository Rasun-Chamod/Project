import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute.tsx";
import AnalyticsPage from "../features/analytics/AnalyticsPage.tsx";
import LoginPage from "../features/auth/LoginPage.tsx";
import RegisterPage from "../features/auth/RegisterPage.tsx";
import DownloadsPage from "../features/downloads/DownloadsPage.tsx";
import ProfilePage from "../features/profile/ProfilePage.tsx";
import RecommendationsPage from "../features/recommendations/RecommendationsPage.tsx";
import DashboardLayout from "../layouts/DashboardLayout.tsx";

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
