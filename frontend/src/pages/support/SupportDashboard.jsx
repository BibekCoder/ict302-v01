import "@/css/support.css";
import { useMemo, useState } from "react";
import OrderTable from "@/components/OrderTableSupport";
import EmailModal from "@/components/EmailModal";

export default function SupportDashboard() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);

  return (
   
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



      <OrderTableSupport
        onEmailClick={(order) => setSelectedOrder(order)}
      />
      
      


      {selectedOrder && (
        <EmailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  ); 
}
