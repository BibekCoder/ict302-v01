import React from "react";


function OrderDetails() {
  return (
    <div className="container">
      <h2>Order Details</h2>

      <div className="grid">
        {/* Left Box */}
        <div className="box">
          <p><strong>Order ID:</strong> #12345</p>
          <p><strong>Order Date:</strong> October 5, 2023</p>
          <p><strong>Payment Status:</strong> Completed</p>
          <p><strong>Delivery Address:</strong> Unit 6, 24 Albert Street, Hornsby, NSW 2077</p>
        </div>

        {/* Right Box */}
        <div className="box">
          <p><strong>Customer ID:</strong> CUST7890</p>
          <p><strong>Customer Name:</strong> Bibek</p>
          <p><strong>Date of Birth:</strong> 04/03/2004</p>
          <p><strong>Email:</strong> bibekbamjan405@gmail.com</p>
          <p><strong>Plan Manager:</strong> Dikes</p>
          <p><strong>Manager Email:</strong> dikesbamjanmg@gmail.com</p>
          <p><strong>Phone:</strong> 0444265867</p>
        </div>
      </div>

      {/* Order Items */}
      <div className="box">
        <h3>Order Items</h3>
        <ul>
          <li>1 pc Comfy Pants</li>
          <li>1 pc X-Large Side Fastening Pants</li>
          <li>1 pc Comfy Long Sleeve Top</li>
        </ul>
      </div>

      {/* Instructions */}
      <div className="box">
        <h3>Additional Instructions</h3>
        <p>Please deliver in front of the front door</p>
      </div>

      {/* Buttons */}
      <div className="actions">
        <button className="approve">Approve this order</button>
        <button className="reject">Don't Approve</button>
      </div>
    </div>
  );
}

export default OrderDetails;
