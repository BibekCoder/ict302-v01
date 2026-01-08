import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchOrders } from "../api/orders";

export default function OrderTable({ onEmailClick }) {
  const [orders, setOrders] = useState([]);
  const [loading,setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;

    async function loadOrders() {
      try {
        setLoading(true);
        setError("");

        const token = localStorage.getItem("token");
        const data = await fetchOrders(token); // { count, orders }

        // 🔁 Normalize DB → table format (VERY IMPORTANT)
        const normalized = (data.orders || []).map((o) => ({
          id: `#${o.orderId}`,
          customer: o.Customer?.customerName || "—",
          email: o.Customer?.customerEmail || "",
          status:
            o.status === "delivered"
              ? "Completed"
              : "Pending",
          date: new Date(o.orderDate).toISOString().split("T")[0],
          total: o.totalPrice,
          raw: o, // keep original if needed later
        }));

        if (alive) setOrders(normalized);
      } catch (err) {
        if (alive) setError(err.message || "Failed to load orders");
      } finally {
        if (alive) setLoading(false);
      }
    }

    loadOrders();
    return () => (alive = false);
  }, []);

  return (
    <div className="card">
      <h3 className="subtitle">Orders</h3>

      {loading && <p className="muted">Loading orders…</p>}
      {error && <p className="muted">Error: {error}</p>}

      {!loading && !error && orders.length === 0 && (
        <p className="muted">No orders found.</p>
      )}

      {!loading && !error && orders.length > 0 && (
        <table className="table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Status</th>
              <th>Date</th>
              <th>Total ($)</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((o) => (
              <tr key={o.id}>
                <td>{o.id}</td>
                <td>{o.customer}</td>
                <td>
                  <span
                    className={`badge ${
                      o.status === "Completed" ? "green" : "orange"
                    }`}
                  >
                    {o.status}
                  </span>
                </td>
                <td>{o.date}</td>
                <td>{o.total}</td>
                <td>
                  <button className="btn" onClick={() => onEmailClick(o)}>
                    Send Email
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
