import { useEffect, useState } from "react";
import { apiGet } from "../../api";

export default function DashboardPage() {
  const token = localStorage.getItem("token");

  const [recentOrders, setRecentOrders] = useState([]);
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [orderError, setOrderError] = useState(null);

  useEffect(() => {
    const load = async () => {
      setLoadingOrders(true);
      setOrderError(null);

      try {
        const res = await apiGet("/api/orders/recent?limit=5", token);

        if (res?.orders) {
          setRecentOrders(res.orders);
        } else {
          setRecentOrders([]);
        }
      } catch (err) {
        setOrderError(err.message);
      } finally {
        setLoadingOrders(false);
      }
    };

    load();
  }, []);

  return (
    <div className="container">
      <div className="pageTitle">Dashboard</div>
      <div className="subtitle">Overview of admin activity and quick actions.</div>

      <div className="bigCard" style={{ maxWidth: 820 }}>
        <div>
          <div className="bigCardTitle" style={{ fontSize: 34 }}>Quick Summary</div>
          <div className="bigCardSub">Live data + demo metrics for presentation.</div>
        </div>
        <div style={{ fontSize: 34, fontWeight: 900 }}>📊</div>
      </div>

      <div style={{ height: 14 }} />

      {/* Recent Orders */}
      <div className="templatesBox" style={{ maxWidth: 820 }}>
        <div style={{ fontSize: 22, fontWeight: 900, marginBottom: 12 }}>
          Recent Orders
        </div>

        {loadingOrders && <div style={{ padding: 10 }}>Loading recent orders…</div>}

        {orderError && (
          <div style={{ padding: 10, color: "#b00020" }}>
            Failed to load orders: {orderError}
          </div>
        )}

        {!loadingOrders && !orderError && recentOrders.length === 0 && (
          <div style={{ padding: 10 }}>No orders found yet.</div>
        )}

        {!loadingOrders && !orderError && recentOrders.map((o) => (
          <div key={o.orderId} className="templateRow" style={{ gridTemplateColumns: "1fr 220px" }}>
            <div>
              <div className="templateName" style={{ fontWeight: 900 }}>
                Order #{o.orderId}
              </div>

              <div style={{ marginTop: 6, fontSize: 16 }}>
                Product: <b>{o.productName}</b> — Qty: <b>{o.quantity}</b>
              </div>

              <div style={{ marginTop: 6, fontSize: 16 }}>
                Total: <b>${Number(o.totalPrice).toFixed(2)}</b> • Status: <b>{o.status || "pending"}</b>
              </div>

              <div style={{ marginTop: 6, fontSize: 14, color: "#6b6b6b" }}>
                Customer: {o.Customer?.customerName || "Unknown"} ({o.Customer?.customerEmail || "—"})
              </div>
            </div>

            <div style={{ textAlign: "right" }}>
              <span className="pill">{o.status || "pending"}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ height: 14 }} />

      {/* Demo Metrics (keep your existing) */}
      <div className="templatesBox" style={{ maxWidth: 820 }}>
        <div style={{ fontSize: 22, fontWeight: 900, marginBottom: 12 }}>Today</div>
        <ul style={{ margin: 0, paddingLeft: 20, fontSize: 18, lineHeight: 1.6 }}>
          <li>Templates updated: 2</li>
          <li>Emails sent (demo): 14</li>
          <li>Admin logins: 3</li>
        </ul>
      </div>
    </div>
  );
}

