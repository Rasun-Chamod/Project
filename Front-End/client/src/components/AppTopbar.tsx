const AppTopbar = () => (
  <header className="topbar">
    <div className="topbar__search">
      <input type="search" placeholder="Search..." />
    </div>
    <div className="topbar__actions">
      <button type="button" className="topbar__icon" aria-label="Notifications">
        <span />
      </button>
      <div className="topbar__user">AD</div>
    </div>
  </header>
);

export default AppTopbar;
