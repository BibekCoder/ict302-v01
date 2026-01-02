export default function UsersPage() {
  return (
    <div className="container">
      <div className="pageTitle">User Management</div>
      <div className="subtitle">Manage roles and accounts (demo UI).</div>

      <div className="templatesBox">
        <div className="templatesHeaderRow" style={{ gridTemplateColumns: "1fr 220px 220px" }}>
          <div>User</div><div>Role</div><div>Actions</div>
        </div>

        {[
          { email: "admin@sortem.com", role: "admin" },
          { email: "support@example.com", role: "support" },
          { email: "staff@sortem.com", role: "staff" },
        ].map((u) => (
          <div key={u.email} className="templateRow" style={{ gridTemplateColumns: "1fr 220px 220px" }}>
            <div className="templateName">{u.email}</div>
            <div><span className="pill">{u.role}</span></div>
            <div style={{ textAlign: "right" }}>
              <button className="smallBtn" onClick={() => alert("Edit user (demo) ✅")}>Edit</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
