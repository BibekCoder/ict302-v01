import { NavLink } from "react-router-dom";

export default function TopBar() {
  return (
    <div className="topbar">
      <div className="topbarInner">
        <div className="brand">SORTEM</div>

        <div className="nav">
          <NavLink to="/admin/dashboard" className={({isActive}) => isActive ? "active" : ""}>Dashboard</NavLink>
          <NavLink to="/admin/users" className={({isActive}) => isActive ? "active" : ""}>User Management</NavLink>
          <NavLink to="/admin/email-logs" className={({isActive}) => isActive ? "active" : ""}>Email Logs</NavLink>
          <NavLink to="/admin/settings" className={({isActive}) => isActive ? "active" : ""}>System settings</NavLink>
        </div>

        <div className="userTag">👤 suman12 | admin</div>
      </div>
    </div>
  );
}
