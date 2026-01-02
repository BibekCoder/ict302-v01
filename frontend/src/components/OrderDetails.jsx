import { useNavigate, useParams } from "react-router-dom";

export default function OrderDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <div className="details-card">
      <button className="back" onClick={() => navigate(-1)}>←</button>

      <h2>Order Details</h2>

      <div className="details-grid">
        <div className="box">
          <p>Order ID: <b>#{id}</b></p>
          <p>Order Date: <b>October 5, 2023</b></p>
          <p>Payment Status: <b>Completed</b></p>
          <p>Delivery Address: <b>24 Albert Street, Hornsby NSW</b></p>
        </div>

        <div className="box">
          <p>Customer ID: <b>CUST7890</b></p>
          <p>Customer Name: <b>Bibek</b></p>
          <p>Email: <b>bibekbamjan405@gmail.com</b></p>
          <p>Plan Manager: <b>Dikes</b></p>
          <p>Manager Email: <b>dikesbamjanmg@gmail.com</b></p>
        </div>
      </div>

      <div className="box">
        <h4>Order Items</h4>
        <ul>
          <li>1 pc Comfy Pants</li>
          <li>1 pc XL Side Fastening Pants</li>
          <li>1 pc The Comfy Long Sleeve Top</li>
        </ul>
      </div>

      <div className="box">
        <h4>Other Instructions</h4>
        <p>Please deliver in front of the front door</p>
      </div>

      <div className="actions">
        <button className="approve">Approve this order</button>
        <button className="reject">Don't Approve</button>
      </div>
    </div>
  );
}
