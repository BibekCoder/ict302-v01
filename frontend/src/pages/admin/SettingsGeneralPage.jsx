import SystemSettingsLayout from "./SystemSettingsLayout";

export default function SettingsGeneralPage() {
  return (
    <SystemSettingsLayout activeKey="general">
      <div>
        <div className="pageTitle" style={{ fontSize: 38 }}>General</div>
        <div className="subtitle">Basic system preferences (demo).</div>

        <div className="templatesBox" style={{ maxWidth: 760 }}>
          <div style={{ fontSize: 22, fontWeight: 900, marginBottom: 12 }}>Store Info</div>
          <div style={{ display: "grid", gap: 10, fontSize: 18 }}>
            <div><b>Brand:</b> Sortem NDIS Wear</div>
            <div><b>Timezone:</b> Australia/Sydney</div>
            <div><b>Currency:</b> AUD</div>
          </div>
        </div>
      </div>
    </SystemSettingsLayout>
  );
}
