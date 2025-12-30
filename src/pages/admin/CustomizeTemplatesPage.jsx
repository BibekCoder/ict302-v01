import { useNavigate } from "react-router-dom";
import SystemSettingsLayout from "./SystemSettingsLayout";

export default function CustomizeTemplatesPage() {
  const navigate = useNavigate();

  return (
    <SystemSettingsLayout activeKey="templates">
      <div>
        <div style={{ fontSize: 36, fontWeight: 900, marginTop: 6 }}>
          Customize Templates
        </div>

        <div className="subtitle">
          Configure, Edit Email or Invoice Templates
        </div>

        <div className="cardRow">
          {/* Email Templates card */}
          <div
            className="bigCard"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/admin/settings/templates/email")}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ fontSize: 44 }}>✉️</div>
              <div className="bigCardTitle">Email Templates</div>
            </div>
            <div style={{ fontSize: 36, fontWeight: 900 }}>▶</div>
          </div>

          {/* Invoice Templates card */}
          <div
            className="bigCard"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/admin/settings/templates/invoice")}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              <div style={{ fontSize: 44 }}>🧾</div>
              <div className="bigCardTitle">Invoice Templates</div>
            </div>
            <div style={{ fontSize: 36, fontWeight: 900 }}>▶</div>
          </div>
        </div>
      </div>
    </SystemSettingsLayout>
  );
}

