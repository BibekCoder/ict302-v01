import { Link, useParams } from "react-router-dom";
import templatesData from "../../data/emailTemplates.json";

function loadTemplates() {
  const saved = localStorage.getItem("emailTemplates");
  return saved ? JSON.parse(saved) : templatesData;
}

export default function TemplateViewPage() {
  const { id } = useParams();
  const templates = loadTemplates();

  const template = templates.find((t) => t.id === id);

  if (!template) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Template not found</h2>
        <Link to="/admin/templates">Back</Link>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>{template.name}</h2>

      <p><b>Subject:</b> {template.subject}</p>

      <p><b>Body:</b></p>
      <pre style={{ whiteSpace: "pre-wrap", background: "#f4f4f4", padding: 12 }}>
        {template.body}
      </pre>

      <div style={{ marginTop: 12 }}>
        <Link to="/admin/templates">Back</Link>{" "}
        | <Link to={`/admin/templates/${template.id}/edit`}>Edit</Link>
      </div>
    </div>
  );
}
