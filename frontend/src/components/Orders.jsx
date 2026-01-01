
import {useNavigate} from "react-router-dom";
const orders = [3001, 3002, 3003, 3004, 3005, 3006];

export default function Orders() {
  const navigate = useNavigate();
  return (
    <div>
      <div className="section-header">
        <h2>Recent Orders</h2>
        <span className="view-all">View All &gt;</span>
      </div>

      <div className="grid">
        {orders.map((id) => (
          <div className="card" key={id}>
            <h3>Order {id}</h3>
            <p className="status">Payment Status: Completed</p>
            <button onClick={()=> navigate(`/order/${id}`)}>See Details</button>
          </div>
        ))}
      </div>
    </div>
  );
}
