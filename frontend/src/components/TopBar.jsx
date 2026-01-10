import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function TopBar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    navigate("/login");
  };

  return (
    <div className="topbar">
      <div className="topbarInner">
        <div className="brand">SORTEM</div>

        <div className="nav">
          <NavLink to="/admin/dashboard" className={({ isActive }) => (isActive ? "active" : "")}>
            Dashboard
          </NavLink>
          <NavLink to="/admin/create-order" className={({ isActive }) => (isActive ? "active" : "")}>
            Create Order
          </NavLink>
          <NavLink to="/admin/send-email" className={({ isActive }) => (isActive ? "active" : "")}>
            Send Email
          </NavLink>
           <NavLink to="/admin/email-logs" className={({ isActive }) => (isActive ? "active" : "")}>
            Email Logs
          </NavLink>
          <NavLink to="/admin/users" className={({ isActive }) => (isActive ? "active" : "")}>
            User Management
          </NavLink>
          <NavLink to="/admin/settings" className={({ isActive }) => (isActive ? "active" : "")}>
            System settings
          </NavLink>
          
        </div>

        {/* ADMIN DROPDOWN */}
        <div style={{ position: "relative" }}>
          <div
            className="userTag"
            style={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: "6px",
            }}
            onClick={() => setOpen(!open)}
          >
            👤 admin ▾
          </div>

          {open && (
            <div
              style={{
                position: "absolute",
                right: 0,
                top: "120%",
                background: "#fff",
                border: "1px solid #ddd",
                borderRadius: "6px",
                minWidth: "120px",
                zIndex: 1000,
                color: "#000",
              }}
            >
              <div
                onClick={handleLogout}
                style={{
                  padding: "10px 14px",
                  cursor: "pointer",
                  fontWeight: 700,
                  color: "#000",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#f5f5f5")}
                onMouseLeave={(e) => (e.currentTarget.style.background = "#fff")}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 


