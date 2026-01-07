import "@/css/support.css";
import { useMemo, useState } from "react";
import OrderTable from "@/components/OrderTable";
import EmailModal from "@/components/EmailModal";



const sampleOrders = [
  { id: "#12345", customer: "Bibek", email: "bibek@gmail.com", status: "Pending", date: "2023-10-05", total: 85 },
  { id: "#12346", customer: "Sita", email: "sita@gmail.com", status: "Completed", date: "2023-10-06", total: 120 },
  { id: "#12347", customer: "Ram", email: "ram@gmail.com", status: "Pending", date: "2023-10-07", total: 60 },
];

export default function SupportDashboard() {
  const [orders] = useState(sampleOrders);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("All");
  const [selectedOrder, setSelectedOrder] = useState(null);

  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const matchSearch =
        o.id.toLowerCase().includes(search.toLowerCase()) ||
        o.customer.toLowerCase().includes(search.toLowerCase());

      const matchStatus = status === "All" ? true : o.status === status;

      return matchSearch && matchStatus;
    });
  }, [orders, search, status]);



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

      {/*
      <OrderTable
        orders={filteredOrders}
        onEmailClick={(order) => setSelectedOrder(order)}
      />
      */}
      <pre>{JSON.stringify(filteredOrders, null, 2)}</pre>


      {selectedOrder && (
        <EmailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  ); 
}
