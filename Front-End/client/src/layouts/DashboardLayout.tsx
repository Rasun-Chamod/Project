import { Outlet } from "react-router-dom";
import AppSidebar from "../components/AppSidebar.tsx";
import AppTopbar from "../components/AppTopbar.tsx";

const DashboardLayout = () => {
  return (
    <div className="app-shell">
      <AppSidebar />
      <main className="app-shell__main">
        <AppTopbar />
        <div className="app-shell__content">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
