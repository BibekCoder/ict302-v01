import { Link } from "react-router-dom";
import templatesData from "../../data/emailTemplates.json";

function loadTemplates() {
  const saved = localStorage.getItem("emailTemplates");
  return saved ? JSON.parse(saved) : templatesData;
}

export default function TemplatesPage() {
  const templates = loadTemplates();

  return (
    <div style={{ padding: 20 }}>
      <h2>Email Templates (Admin)</h2>

      <div style={{ marginBottom: 12 }}>
        <Link to="/admin/templates/new">+ Add Template</Link>
      </div>

      <ul>
        {templates.map((t) => (
          <li key={t.id} style={{ marginBottom: 8 }}>
            <b>{t.name}</b> —{" "}
            <Link to={`/admin/templates/${t.id}`}>View</Link>{" "}
            | <Link to={`/admin/templates/${t.id}/edit`}>Edit</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
