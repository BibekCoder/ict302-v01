import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const role = localStorage.getItem("role");  

  if(!role) {
    return <Navigate to="/login" replace />;
  } 
  
  if (role !== "support") {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
}
