export default function ActivityLogsPage() {
  return (
    <div className="container">
      <div className="pageTitle">Activity Logs</div>
      <div className="subtitle">Audit trail of actions (demo UI).</div>

      <div className="templatesBox">
        <div className="templatesHeaderRow" style={{ gridTemplateColumns: "280px 1fr 240px" }}>
          <div>Time</div><div>Action</div><div>Performed By</div>
        </div>

        {[
          { t: "10:12 AM", a: "Edited Email Template: Shipping", by: "admin@sortem.com" },
          { t: "10:05 AM", a: "Viewed Email Config", by: "admin@sortem.com" },
          { t: "9:58 AM", a: "Login Successful", by: "admin@sortem.com" },
        ].map((x, i) => (
          <div key={i} className="templateRow" style={{ gridTemplateColumns: "280px 1fr 240px" }}>
            <div className="templateName" style={{ fontWeight: 700 }}>{x.t}</div>
            <div style={{ fontSize: 18 }}>{x.a}</div>
            <div style={{ textAlign: "right" }}><span className="pill">{x.by}</span></div>
          </div>
        ))}
      </div>
    </div>
  );
}
