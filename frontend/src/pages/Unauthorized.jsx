import { Link } from "react-router-dom";

export default function Unauthorized() {
  return (
    <div style={{ padding: "40px", textAlign: "center" }}>
      <h1>403 – Access Denied</h1>
      <p>You do not have permission to view this page.</p>
      <Link to="/login">Go to Login</Link>
    </div>
  );
}
