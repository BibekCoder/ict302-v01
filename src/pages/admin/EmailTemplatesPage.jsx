import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { loadTemplates, saveTemplates, resetTemplates } from "../../data/templateStore";

export default function EmailTemplatesPage() {
  const navigate = useNavigate();

  const initial = useMemo(() => loadTemplates(), []);
  const [templates, setTemplates] = useState(initial);

  const [selectedId, setSelectedId] = useState(initial[0]?.id || "");
  const selected = templates.find((t) => t.id === selectedId);

  const [subject, setSubject] = useState(selected?.subject || "");
  const [body, setBody] = useState(selected?.body || "");

  const pick = (id) => {
    setSelectedId(id);
    const t = templates.find((x) => x.id === id);
    setSubject(t?.subject || "");
    setBody(t?.body || "");
  };

  const handleSave = () => {
    const updated = templates.map((t) =>
      t.id === selectedId ? { ...t, subject, body } : t
    );
    setTemplates(updated);
    saveTemplates(updated);
    alert("Saved ✅");
  };

  const handlePreview = () => {
    alert(`Subject:\n${subject}\n\nBody:\n${body}`);
  };

  const handleReset = () => {
    if (!confirm("Reset all templates to default?")) return;
    resetTemplates();
    const fresh = loadTemplates();
    setTemplates(fresh);
    setSelectedId(fresh[0]?.id || "");
    setSubject(fresh[0]?.subject || "");
    setBody(fresh[0]?.body || "");
  };

  return (
    <>
      {/* White header area */}
      <div style={{ padding: "22px 24px 10px" }}>
        <span
          style={{
            fontSize: 40,
            fontWeight: 900,
            cursor: "pointer",
            marginRight: 16,
          }}
          onClick={() => navigate("/admin/settings/templates")}
        >
          ←
        </span>

        <span style={{ fontSize: 46, fontWeight: 900, verticalAlign: "middle" }}>
          Email Templates
        </span>

        <div style={{ marginLeft: 56, color: "#6b6b6b", marginTop: 6 }}>
          Manage your email templates used for system notifications.
        </div>
      </div>

      {/* Grey workspace like prototype */}
      <div className="protoGrey">
        <div className="protoGrid">
          {/* Left templates box */}
          <div className="protoTemplatesBox">
            <div className="protoTemplatesHeader">
              <div>Templates</div>
              <div>Status</div>
              <div></div>
            </div>

            {templates.map((t) => (
              <div key={t.id} className="protoRow">
                <div className="protoName">{t.name}</div>

                <div>
                  <span className={`protoPill ${t.status === "Disabled" ? "disabled" : ""}`}>
                    {t.status}
                  </span>
                </div>

                <div style={{ textAlign: "right" }}>
                  <button
                    className="protoEditBtn"
                    onClick={() => {
                      pick(t.id);
                      if (t.name === "Welcome") handlePreview();
                    }}
                  >
                    {t.name === "Welcome" ? "Preview" : "Edit"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right editor box */}
          <div className="protoEditor">
            <div className="protoEditorTitle">Subject</div>

            <div className="protoEditorInner">
              <input
                className="protoInput"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />

              <div className="protoToolbar">
                <b>Bold</b>
                <i>Italic</i>
                <span style={{ textDecoration: "underline" }}>Underline</span>
                <span>Font</span>
              </div>

              <textarea
                className="protoTextarea"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </div>

            <div className="protoActions">
              <button className="protoBtn save" onClick={handleSave}>Save</button>
              <button className="protoBtn preview" onClick={handlePreview}>Preview</button>
              <button className="protoBtn reset" onClick={handleReset}>Reset</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
