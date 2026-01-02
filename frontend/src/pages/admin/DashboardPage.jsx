export default function DashboardPage() {
  return (
    <div className="container">
      <div className="pageTitle">Dashboard</div>
      <div className="subtitle">Overview of admin activity and quick actions.</div>

      <div className="bigCard" style={{ maxWidth: 820 }}>
        <div>
          <div className="bigCardTitle" style={{ fontSize: 34 }}>Quick Summary</div>
          <div className="bigCardSub">Demo metrics for presentation.</div>
        </div>
        <div style={{ fontSize: 34, fontWeight: 900 }}>📊</div>
      </div>

      <div style={{ height: 14 }} />

      <div className="templatesBox" style={{ maxWidth: 820 }}>
        <div style={{ fontSize: 22, fontWeight: 900, marginBottom: 12 }}>Today</div>
        <ul style={{ margin: 0, paddingLeft: 20, fontSize: 18, lineHeight: 1.6 }}>
          <li>Templates updated: 2</li>
          <li>Emails sent (demo): 14</li>
          <li>Admin logins: 3</li>
        </ul>
      </div>
    </div>
  );
}
