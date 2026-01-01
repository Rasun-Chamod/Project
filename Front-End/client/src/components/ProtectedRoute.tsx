import { Navigate, useLocation } from "react-router-dom";
import { useAuthStore } from "../store/auth.ts";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const access = useAuthStore((state) => state.access);
  const location = useLocation();

  if (!access) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
