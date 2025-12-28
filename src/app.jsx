import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TopBar from "./components/TopBar";
import AdminRoute from "./routes/AdminRoute";

import CustomizeTemplatesPage from "./pages/admin/CustomizeTemplatesPage";
import EmailTemplatesPage from "./pages/admin/EmailTemplatesPage";
import EmailConfigPage from "./pages/admin/EmailConfigPage";
import DashboardPage from "./pages/admin/DashboardPage";
import UsersPage from "./pages/admin/UsersPage";
import ActivityLogsPage from "./pages/admin/ActivityLogsPage";
import SettingsGeneralPage from "./pages/admin/SettingsGeneralPage";
import PaymentTaxesPage from "./pages/admin/PaymentTaxesPage";
import ShippingPage from "./pages/admin/ShippingPage";
import ApiAccessPage from "./pages/admin/ApiAccessPage";
import InvoiceTemplatesPage from "./pages/admin/InvoiceTemplatesPage";


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
    <BrowserRouter>
      <TopBar />

     <Routes>
  <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />

  <Route path="/admin/dashboard" element={<AdminRoute><DashboardPage /></AdminRoute>} />
  <Route path="/admin/users" element={<AdminRoute><UsersPage /></AdminRoute>} />
  <Route path="/admin/activity" element={<AdminRoute><ActivityLogsPage /></AdminRoute>} />

  <Route path="/admin/settings" element={<AdminRoute><SettingsGeneralPage /></AdminRoute>} />
  <Route path="/admin/settings/credentials" element={<AdminRoute><EmailConfigPage /></AdminRoute>} />

  <Route path="/admin/settings/templates" element={<AdminRoute><CustomizeTemplatesPage /></AdminRoute>} />
  <Route path="/admin/settings/templates/email" element={<AdminRoute><EmailTemplatesPage /></AdminRoute>} />
  <Route path="/admin/settings/templates/invoice" element={<AdminRoute><InvoiceTemplatesPage /></AdminRoute>} />

  <Route path="/admin/settings/payment" element={<AdminRoute><PaymentTaxesPage /></AdminRoute>} />
  <Route path="/admin/settings/shipping" element={<AdminRoute><ShippingPage /></AdminRoute>} />
  <Route path="/admin/settings/api" element={<AdminRoute><ApiAccessPage /></AdminRoute>} />

  <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
</Routes>

    </BrowserRouter>
  );
}
