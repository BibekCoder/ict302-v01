export default function OrderTable({ orders, onEmailClick }) {
  return (
    <div className="card">
      <h3 className="subtitle">Orders</h3>

      {orders.length === 0 ? (
        <p className="muted">No orders found.</p>
      ) : (
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
                  <span className={`badge ${o.status === "Completed" ? "green" : "orange"}`}>
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
