import "@/css/support.css";
import { useMemo, useState } from "react";
import OrderTable from "@/components/OrderTableSupport";
import EmailModal from "@/components/EmailModal";

import { NavLink, useNavigate } from "react-router-dom";


export default function SupportDashboard() {
   const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);

   const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    navigate("/login");
  };

  return (
   <div>
    <div className="topbar">
      <div className="topbarInner">
        <div className="brand">SORTEM</div> 

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
            👤 Support ▾
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
  



   
     <div className="page">
      <h2 className="title">Support Dashboard</h2>

      <div className="filters">
        <input
          className="input"
          placeholder="Search by Order ID or Customer..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="select"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
      </div>



      <OrderTable
        onEmailClick={(order) => setSelectedOrder(order)}
      />
      
      


      {selectedOrder && (
        <EmailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
    </div>
  ); 
}
