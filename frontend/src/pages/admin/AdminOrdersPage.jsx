import OrderTableSupport from "../../components/OrderTableSupport";

export default function AdminOrdersPage() {
  return (
    <div className="container">
      <div className="pageTitle">All Orders</div>
      <p className = "subtitle">Complete list of customer orders</p>
      <OrderTableSupport />
    </div>
  );
}