import { NavLink } from "react-router-dom";

export default function SystemSettingsLayout({ children, activeKey }) {
  return (
    <div className="twoCol">
      <div className="sideMenu">
        <h3>System Settings</h3>

        <NavLink className={`sideLink ${activeKey==="general" ? "active" : ""}`} to="/admin/settings">General</NavLink>
        <NavLink className={`sideLink ${activeKey==="creds" ? "active" : ""}`} to="/admin/settings/credentials">Global Credentials</NavLink>
        <NavLink className={`sideLink ${activeKey==="templates" ? "active" : ""}`} to="/admin/settings/templates">Customize Templates</NavLink>
        <NavLink className={`sideLink ${activeKey==="payment" ? "active" : ""}`} to="/admin/settings/payment">Payment & Taxes</NavLink>
<NavLink className={`sideLink ${activeKey==="shipping" ? "active" : ""}`} to="/admin/settings/shipping">Shipping</NavLink>
<NavLink className={`sideLink ${activeKey==="api" ? "active" : ""}`} to="/admin/settings/api">API Access</NavLink>

      </div>

      <div>{children}</div>
    </div>
  );
}
