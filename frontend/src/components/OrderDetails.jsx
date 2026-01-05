import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchOrderById } from "../api/orders";

export default function OrderDetails() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let alive = true;

    (async () => {
      try {
        setLoading(true);
        setError("");
        const data = await fetchOrderById(id); // returns order object directly
        if (alive) setOrder(data);
      } catch (e) {
        if (alive) setError(e.message || "Failed to load order");
      } finally {
        if (alive) setLoading(false);
      }
    })();

    return () => {
      alive = false;
    };
  }, [id]);

  if (loading) return <div className="card">Loading order…</div>;
  if (error) return <div className="card">Error: {error}</div>;
  if (!order) return <div className="card">No order found.</div>;

  return (
    <div className="container">
      <h2>Order #{order.orderId}</h2>
      <p>Status: {order.status}</p>
      <p>Product: {order.productName}</p>
      <p>Quantity: {order.quantity}</p>
      <p>Total: ${order.totalPrice}</p>
      <p>Notes: {order.orderNotes || "-"}</p>
      <p>Date: {order.orderDate ? new Date(order.orderDate).toLocaleString() : "-"}</p>

      <br>
      </br>

      <h3>Customer Details</h3>
      <p>CustomerId: {order.Customer?.customerId || "-"}</p>
      <p>Name: {order.Customer?.customerName || "-"}</p>
      <p>Email: {order.Customer?.customerEmail || "-"}</p>
      <p>Phone: {order.Customer?.customerPhone || "-"}</p>
      <p>Address: {order.Customer?.customerAddress || "-"}</p>
      <br></br>

      <p>Plan Manager Name: {order.Customer?.planManagerName || "-"}  </p>
      <p>Plan Manager Email: {order.Customer?.planManagerEmail || "-"}  </p>
      <p>Plan Manager Phone: {order.Customer?.planManagerPhone || "-"}  </p> 
      <p>Additional Email Recipients: {order.Customer?.emailRecipient1 || "-"},
        {order.Customer?.emailRecipient2 || "-"}, {order.Customer?.emailRecipient3 || "-"}
        </p> 

    </div>
  );
}


