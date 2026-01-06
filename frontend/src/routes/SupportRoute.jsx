import { Navigate } from "react-router-dom";

export default function SupportRoute({ children }) {
  const role = localStorage.getItem("role");  
  const token = localStorage.getItem("token");

  if(!role) {
    return <Navigate to="/login" replace />;
  } 
  
  if (role !== "support") {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
