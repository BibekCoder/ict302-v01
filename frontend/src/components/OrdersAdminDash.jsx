import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchOrders } from "../api/orders";


export default function Orders() {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        setError("");
        const data = await fetchOrders(); // { count, orders }
        if (alive) setOrders(data.orders ?? []);
      } catch (e) {
        if (alive) setError(e.message || "Failed to load orders");
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, []);

  if (loading) return <div className="card">Loading orders…</div>;
  if (error) return <div className="card">Error: {error}</div>;

  return (
    <div>
      <div className="section-header">
        <h2>Recent Orders</h2>
        <span className="view-all">View All &gt;</span>
      </div>

      <div className="grid">
        {orders.map((order) => (
          <div className="card" key={order.orderId}>
            <h3>Order #{order.orderId}</h3>
            <p>Customer: {order.Customer?.customerName ?? "-"}</p>
            <p>CustomerEmail: {order.Customer?.customerEmail ?? "-"}</p>
            <p className="status">Status: {order.status}</p>
            <p>Total: ${order.totalPrice}</p>
            <button onClick={() => navigate(`/order/${order.orderId}`)}>
              See Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}









