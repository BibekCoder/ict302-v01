import { Navigate } from "react-router-dom";

function getRole() {
  // adjust this depending on how your app stores role
  // common approach: localStorage.setItem("role", "admin")
  // For the demo dashboard, assume admin when a role hasn't been set
  return localStorage.getItem("role") ?? "admin";
}

export default function AdminRoute({ children }) {
  const role = getRole();

  if (role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
}
