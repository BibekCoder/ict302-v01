const activities = [
  { user: "projw101", role: "Support", action: "sent custom email", time: "04/09/2023 2:00" },
  { user: "ram123", role: "Support", action: "Created manual order", time: "19/09/2023 5:00" },
  { user: "harry101", role: "Admin", action: "changed system settings", time: "18/09/2023 4:00" },
  { user: "chris00", role: "Admin", action: "Accessed activity logs", time: "18/09/2023 2:00" }
];

export default function Activities() {
  return (
    <div>
      <div className="section-header">
        <h2>Recent Activities</h2>
        <span className="view-all">View All &gt;</span>
      </div>

      <div className="grid">
        {activities.map((a, i) => (
          <div className="card" key={i}>
            <h4>{a.user} - {a.role}</h4>
            <p className="status">{a.action}</p>
            <p className="time">{a.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
