import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth";

const DashboardLayout = () => {
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate("/login");
  };

  return (
    <div className="layout">
      <aside className="layout__sidebar">
        <h1 className="layout__logo">Media Recommender</h1>
        <nav className="layout__nav">
          <Link to="/">Recommendations</Link>
          <Link to="/analytics">Analytics</Link>
          <Link to="/downloads">Downloads</Link>
          <Link to="/profile">Profile</Link>
        </nav>
        <button type="button" className="layout__logout" onClick={handleLogout}>
          Log out
        </button>
      </aside>
      <main className="layout__content">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
