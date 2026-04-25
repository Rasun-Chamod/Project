import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/auth.ts";

const AppSidebar = () => {
  const clearAuth = useAuthStore((state) => state.clearAuth);
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    const confirmed = window.confirm("Log out of your account?");
    if (!confirmed) {
      return;
    }
    clearAuth();
    navigate("/login");
  };

  const navItems = [
    {
      label: "Library",
      to: "/library",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            d="M5 4h10a2 2 0 0 1 2 2v12a1 1 0 0 1-1.4.9L13 17.2 10.4 18.9A1 1 0 0 1 9 18V6a2 2 0 0 1 2-2H5v14H3V6a2 2 0 0 1 2-2Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      label: "Recommendations",
      to: "/",
      end: true,
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            d="m12 3 2.6 5.3 5.8.8-4.2 4.1 1 5.8L12 16.8 6.8 19l1-5.8L3.6 9.1l5.8-.8L12 3Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      label: "Games",
      to: "/library?type=game",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            d="M7.5 9h9a4.5 4.5 0 0 1 4.3 5.8l-1.2 3.6a2.5 2.5 0 0 1-4.8-1V17H9v.4a2.5 2.5 0 0 1-4.8 1l-1.2-3.6A4.5 4.5 0 0 1 7.5 9Zm1 2.5h-2v1.5h2v2h1.5v-2h2v-1.5h-2v-2H8.5v2Zm7.5 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2Zm2.5 1.5a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      label: "Movies",
      to: "/library?type=movie",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            d="M4 6h16a2 2 0 0 1 2 2v2H2V8a2 2 0 0 1 2-2Zm-2 6h20v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4Zm4-5h2V5H6v2Zm4 0h2V5h-2v2Zm4 0h2V5h-2v2Zm4 0h2V5h-2v2Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      label: "TV Shows",
      to: "/library?type=tv",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            d="M8.6 5 7 3.4 8.4 2 12 5.6 15.6 2 17 3.4 15.4 5H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4.6ZM4 7v9h16V7H4Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      label: "Analytics",
      to: "/analytics",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            d="M4 19h16v2H2V3h2v16Zm6-2H6v-6h4v6Zm6 0h-4V7h4v10Zm6 0h-4v-4h4v4Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      label: "Downloads",
      to: "/downloads",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            d="M12 3a1 1 0 0 1 1 1v9.6l2.8-2.8 1.4 1.4-5.2 5.2-5.2-5.2 1.4-1.4 2.8 2.8V4a1 1 0 0 1 1-1Zm-7 16h14v2H5v-2Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
    {
      label: "Profile",
      to: "/profile",
      icon: (
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            d="M12 12a4 4 0 1 0-4-4 4 4 0 0 0 4 4Zm-7 8a7 7 0 0 1 14 0H5Z"
            fill="currentColor"
          />
        </svg>
      ),
    },
  ];

  const isItemActive = (to: string, end?: boolean) => {
    if (end) {
      return location.pathname === "/";
    }

    if (to.startsWith("/library?type=")) {
      const type = to.split("=")[1];
      const currentType = new URLSearchParams(location.search).get("type");
      return location.pathname === "/library" && currentType === type;
    }

    if (to === "/library") {
      const currentType = new URLSearchParams(location.search).get("type");
      return location.pathname === "/library" && !currentType;
    }

    return location.pathname === to;
  };

  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <span className="sidebar__dot" />
        <div>
          <h1>Recommenda</h1>
          <p>Movies, Games, TV</p>
        </div>
      </div>
      <nav className="sidebar__nav">
        {navItems.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            end={item.end}
            className={isItemActive(item.to, item.end) ? "active" : undefined}
          >
            {item.icon}
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
      <button
        type="button"
        className="sidebar__logout"
        onClick={handleLogout}
        title="Logout"
      >
        <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
          <path
            d="M15 4h-4a2 2 0 0 0-2 2v3h2V6h4v12h-4v-3H9v3a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm-1.5 4 4.5 4-4.5 4v-3H7v-2h6.5V8Z"
            fill="currentColor"
          />
        </svg>
        Logout
      </button>
    </aside>
  );
};

export default AppSidebar;
