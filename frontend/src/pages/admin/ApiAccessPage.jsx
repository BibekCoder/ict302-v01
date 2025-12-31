import SystemSettingsLayout from "./SystemSettingsLayout";

export default function ApiAccessPage() {
  return (
    <SystemSettingsLayout activeKey="api">
      <div>
        <div className="pageTitle" style={{ fontSize: 38 }}>API Access</div>
        <div className="subtitle">Keys and integrations (demo).</div>

        <div className="templatesBox" style={{ maxWidth: 760 }}>
          <div style={{ fontSize: 22, fontWeight: 900, marginBottom: 12 }}>API Key</div>
          <div style={{ fontSize: 18 }}>
            <div><b>Status:</b> Active</div>
            <div style={{ marginTop: 8 }}>
              <b>Key:</b> <span className="pill">sk_live_••••••••••••</span>
            </div>
            <div style={{ marginTop: 12 }}>
              <button className="smallBtn" onClick={() => alert("Regenerated (demo) ✅")}>Regenerate</button>
            </div>
          </div>
        </div>
      </div>
    </SystemSettingsLayout>
  );
}
