import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { loadTemplates, saveTemplates } from "../../data/templateStore";

export default function TemplateFormPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === "new";

  const [templateId, setTemplateId] = useState("");
  const [name, setName] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    if (!isNew) {
      const templates = loadTemplates();
      const t = templates.find((x) => x.id === id);
      if (t) {
        setTemplateId(t.id);
        setName(t.name);
        setSubject(t.subject);
        setBody(t.body);
      }
    } else {
      setTemplateId("");
      setName("");
      setSubject("");
      setBody("");
    }
  }, [id, isNew]);

  const handleSave = () => {
    if (!templateId.trim() || !name.trim() || !subject.trim() || !body.trim()) {
      alert("Please fill in Template ID, Name, Subject, and Body.");
      return;
    }

    const templates = loadTemplates();

    if (isNew) {
      const exists = templates.some((t) => t.id === templateId.trim());
      if (exists) {
        alert("Template ID already exists. Use a unique ID.");
        return;
      }

      const newTemplate = {
        id: templateId.trim(),
        name: name.trim(),
        subject,
        body,
      };

      saveTemplates([newTemplate, ...templates]);
      navigate(`/admin/templates/${newTemplate.id}`);
    } else {
      const updated = templates.map((t) =>
        t.id === id ? { ...t, name: name.trim(), subject, body } : t
      );
      saveTemplates(updated);
      navigate(`/admin/templates/${id}`);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>{isNew ? "Add Template" : "Edit Template"}</h2>

      <div style={{ display: "grid", gap: 12, maxWidth: 720 }}>
        <label>
          Template ID (no spaces)
          <input
            value={templateId}
            onChange={(e) => setTemplateId(e.target.value)}
            disabled={!isNew}
            placeholder="e.g. delivery_update"
            style={{ width: "100%", padding: 8 }}
          />
        </label>

        <label>
          Template Name
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Delivery Update"
            style={{ width: "100%", padding: 8 }}
          />
        </label>

        <label>
          Subject
          <input
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            placeholder="e.g. Your delivery update — #{orderId}"
            style={{ width: "100%", padding: 8 }}
          />
        </label>

        <label>
          Body
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={10}
            placeholder="Write your email body here..."
            style={{ width: "100%", padding: 8 }}
          />
        </label>

        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={handleSave}>Save</button>
          <Link to="/admin/templates">Cancel</Link>
        </div>
      </div>
    </div>
  );
}
