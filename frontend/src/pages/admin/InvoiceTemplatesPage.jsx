import { useNavigate } from "react-router-dom";

export default function InvoiceTemplatesPage() {
  const navigate = useNavigate();

  return (
    <>
      <div style={{ padding: "22px 24px 10px" }}>
        <span
          style={{ fontSize: 40, fontWeight: 900, cursor: "pointer", marginRight: 16 }}
          onClick={() => navigate("/admin/settings/templates")}
        >
          ←
        </span>

        <span style={{ fontSize: 46, fontWeight: 900, verticalAlign: "middle" }}>
          Invoice Templates
        </span>

        <div style={{ marginLeft: 56, color: "#6b6b6b", marginTop: 6 }}>
          Manage your invoice templates used for billing documents.
        </div>
      </div>

      <div className="protoGrey">
        <div className="protoGrid">
          <div className="protoTemplatesBox">
            <div className="protoTemplatesHeader" style={{ gridTemplateColumns: "1fr 140px 140px" }}>
              <div>Templates</div><div>Status</div><div></div>
            </div>

            {[
              { name: "Standard Invoice", status: "Default" },
              { name: "NDIS Invoice", status: "Default" },
              { name: "Tax Invoice", status: "Disabled" },
            ].map((t) => (
              <div key={t.name} className="protoRow" style={{ gridTemplateColumns: "1fr 140px 140px" }}>
                <div className="protoName">{t.name}</div>
                <div><span className={`protoPill ${t.status === "Disabled" ? "disabled" : ""}`}>{t.status}</span></div>
                <div style={{ textAlign: "right" }}>
                  <button className="protoEditBtn" onClick={() => alert("Edit invoice template (demo) ✅")}>Edit</button>
                </div>
              </div>
            ))}
          </div>

          <div className="protoEditor">
            <div className="protoEditorTitle">Invoice Layout</div>
            <div className="protoEditorInner">
              <div className="protoToolbar" style={{ justifyContent: "space-between" }}>
                <span>Header</span><span>Items</span><span>Totals</span><span>Footer</span>
              </div>

              <textarea
                className="protoTextarea"
                defaultValue={
`Invoice template editor (demo).

You can show a real WYSIWYG editor later.
For now this demonstrates navigation + UI structure.`
                }
              />
            </div>

            <div className="protoActions">
              <button className="protoBtn save" onClick={() => alert("Saved ✅")}>Save</button>
              <button className="protoBtn preview" onClick={() => alert("Preview ✅")}>Preview</button>
              <button className="protoBtn reset" onClick={() => alert("Reset ✅")}>Reset</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
