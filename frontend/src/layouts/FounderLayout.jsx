import React, { useState } from "react";
import { Outlet, NavLink } from "react-router-dom";
import "@/css/dashboard.css";
import { useNavigate } from "react-router-dom";
export default function FounderLayout()
 {

  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    navigate("/login");
  };
  return (
    <>
      {/* FULL WIDTH TOPBAR */}
      <div className="topbar">
        <div className="topbarInner">
          {/* LEFT */}
         <div className="brand">SORTEM</div>

          {/* CENTER */}
          <nav className="topnav">
            <NavLink to="/founder/reports" className="topnavLink">
              Order Reports
            </NavLink>
            
          </nav>
       

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
            👤 Founder ▾
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
              >
                Logout
              </div>
            </div>
          )}
        </div>
      </div>
      </div>
          <div className="appShell">
        <main className="pageWrap">
          <Outlet />
        </main>
      </div>
    </>
   
  );
}
