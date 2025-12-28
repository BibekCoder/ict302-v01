import SystemSettingsLayout from "./SystemSettingsLayout";

export default function EmailConfigPage() {
  return (
    <SystemSettingsLayout activeKey="creds">
      <div>
        <div className="pageTitle" style={{fontSize:38}}>Global Credentials</div>
        <div className="subtitle">Read-only configuration for demo</div>

        <div className="templatesBox" style={{maxWidth:720}}>
          <div style={{fontSize:22, fontWeight:900, marginBottom:10}}>Email Configuration</div>

          <div style={{display:"grid", gap:10, fontSize:18}}>
            <div><b>Email service used:</b> Ethereal (Demo SMTP)</div>
            <div><b>Sender email:</b> no-reply@sortem.com</div>
            <div className="subtitle" style={{marginTop:6}}>
              Note: Values are read-only for demo. Backend uses Ethereal to generate preview links.
            </div>
          </div>
        </div>
      </div>
    </SystemSettingsLayout>
  );
}
