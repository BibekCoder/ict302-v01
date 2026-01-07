import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TopBar from "./components/TopBar";
import AdminRoute from "./routes/AdminRoute";
import OrdersAdminDash from "./components/OrdersAdminDash";
import Activities from "./components/Activities";
import OrderDetails from "./components/OrderDetails";
import Login from "./pages/Login";
import Unauthorized from "./pages/Unauthorized";
import ProtectedLayout from "./layouts/ProtectedLayout";

import ordersDetailsSupport from "./components/orderDetailsSupport";
import EmailModal from "./components/EmailModal";
import SupportRoute from "./routes/SupportRoute";
import SupportDashboard from "./pages/support/SupportDashboard";
import OrderTable from "./components/OrderTable";

import CustomizeTemplatesPage from "./pages/admin/CustomizeTemplatesPage";
import EmailTemplatesPage from "./pages/admin/EmailTemplatesPage";
import EmailConfigPage from "./pages/admin/EmailConfigPage";
import DashboardPage from "./pages/admin/DashboardPage";
import UsersPage from "./pages/admin/UsersPage";
import EmailLogsPage from "./pages/admin/EmailLogsPage";
import SettingsGeneralPage from "./pages/admin/SettingsGeneralPage";
import PaymentTaxesPage from "./pages/admin/PaymentTaxesPage";
import ShippingPage from "./pages/admin/ShippingPage";
import ApiAccessPage from "./pages/admin/ApiAccessPage";
import InvoiceTemplatesPage from "./pages/admin/InvoiceTemplatesPage";
import Orders from "./components/OrdersAdminDash";


function Placeholder({ title }) {
  return (
    <div className="container">
      <div className="pageTitle">{title}</div>
      <div className="subtitle">Demo screen (not required for Week 7 task)</div>
    </div>
  );
}

export default function App() {
  return (
 <>     
  <Routes>
  
  {/* Public */}
  <Route path="/"  element={<Navigate to="/login" replace />} />
  <Route path="/login" element={<Login />} />
  <Route path="/unauthorized" element={<Unauthorized />} />

  {/*Protected Admin Routes */}
  <Route element={<AdminRoute><ProtectedLayout /></AdminRoute>}>

      <Route path="/admin/dashboard" element={<AdminRoute><>
                        <h1>Dashboard</h1>
                        <OrdersAdminDash/>
                        <Activities/>
                        </></AdminRoute>} />

      <Route path="/order/:id" element={<AdminRoute><OrderDetails /></AdminRoute>} />
                        
      <Route path="/admin/users" element={<AdminRoute><UsersPage /></AdminRoute>} />
      <Route
  path="/admin/email-logs"
  element={
    <AdminRoute>
      <EmailLogsPage />
    </AdminRoute>
  }
/>

      <Route path="/admin/settings" element={<AdminRoute><SettingsGeneralPage /></AdminRoute>} />
      <Route path="/admin/settings/credentials" element={<AdminRoute><EmailConfigPage /></AdminRoute>} />

      <Route path="/admin/settings/templates" element={<AdminRoute><CustomizeTemplatesPage /></AdminRoute>} />
      <Route path="/admin/settings/templates/email" element={<AdminRoute><EmailTemplatesPage /></AdminRoute>} />
      <Route path="/admin/settings/templates/invoice" element={<AdminRoute><InvoiceTemplatesPage /></AdminRoute>} />

      <Route path="/admin/settings/payment" element={<AdminRoute><PaymentTaxesPage /></AdminRoute>} />
      <Route path="/admin/settings/shipping" element={<AdminRoute><ShippingPage /></AdminRoute>} />
      <Route path="/admin/settings/api" element={<AdminRoute><ApiAccessPage /></AdminRoute>} /> 

  </Route>

  <Route element={<SupportRoute />}>
    <Route path="/support/dashboard" element={<SupportDashboard />} />
</Route>

  {/*Default routes*/}
  <Route path="*" element={<Navigate to="/login" replace />} />
</Routes>

</> 
  );
} 