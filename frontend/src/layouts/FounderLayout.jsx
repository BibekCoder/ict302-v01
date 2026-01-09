import { Outlet, NavLink } from "react-router-dom";
import "@/css/dashboard.css";

export default function FounderLayout() {
  return (
    <>
      {/* FULL WIDTH TOPBAR */}
      <header className="topbar">
        <div className="topbarInner">
          {/* LEFT */}
          <div className="brand">SORTEM</div>

          {/* CENTER */}
          <nav className="topnav">
            <NavLink to="/founder/reports" className="topnavLink">
              Order Reports
            </NavLink>
            
          </nav>

          {/* RIGHT */}
          <div className="topbarRight">
            <span className="userIcon">👤</span>
            <span className="userText">Founder</span>
          </div>
        </div>
      </header>

      {/* CONTENT WRAPPER (this can be centered) */}
      <div className="appShell">
        <main className="pageWrap">
          <Outlet />
        </main>
      </div>
    </>
  );
}
