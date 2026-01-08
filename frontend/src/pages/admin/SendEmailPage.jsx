import { useEffect, useMemo, useState } from "react";
import { apiGet, apiPost } from "../../api";

export default function SendEmailPage() {
  const token = localStorage.getItem("token");

  const [mode, setMode] = useState("template"); // "template" or "custom"
  const [loadingTemplates, setLoadingTemplates] = useState(true);
  const [templates, setTemplates] = useState([]);

  // Orders dropdown (template mode only)
  const [loadingOrders, setLoadingOrders] = useState(true);
  const [orders, setOrders] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState("");

  const [to, setTo] = useState("");
  const [templateName, setTemplateName] = useState("");
  const [templateDataJson, setTemplateDataJson] = useState(
    JSON.stringify({ customerName: "", orderId: 0 }, null, 2)
  );

  const [customSubject, setCustomSubject] = useState("");
  const [customBody, setCustomBody] = useState("");

  const [sending, setSending] = useState(false);
  const [result, setResult] = useState(null);

  // Preview state (template mode)
  const [previewLoading, setPreviewLoading] = useState(false);
  const [previewError, setPreviewError] = useState(null);
  const [previewSubject, setPreviewSubject] = useState("");
  const [previewBody, setPreviewBody] = useState("");

  // Parse templateDataJson safely (internal)
  const parsedTemplateData = useMemo(() => {
    try {
      return JSON.parse(templateDataJson || "{}");
    } catch {
      return {};
    }
  }, [templateDataJson]);

  // Helpers: update internal JSON without showing it
  const patchTemplateData = (patch) => {
    const current = parsedTemplateData && typeof parsedTemplateData === "object" ? parsedTemplateData : {};
    const next = { ...current, ...patch };
    setTemplateDataJson(JSON.stringify(next, null, 2));
  };

  // Load templates
  useEffect(() => {
    const loadTemplates = async () => {
      setLoadingTemplates(true);
      setResult(null);
      try {
        const res = await apiGet("/api/templates/email", token);
        const names = res?.templates || [];
        setTemplates(names);
        setTemplateName(names[0] || "");
      } catch (err) {
        setTemplates([]);
      } finally {
        setLoadingTemplates(false);
      }
    };
    loadTemplates();
  }, []);

  // Load orders (even if custom mode, this is fine — we just won’t show/use it there)
  useEffect(() => {
    const loadOrders = async () => {
      setLoadingOrders(true);
      try {
        const res = await apiGet("/api/orders", token);
        const list = Array.isArray(res) ? res : res?.orders || [];
        setOrders(list);

        if (list.length > 0) {
          const first = list[0];
          const firstId = first?.orderId ? String(first.orderId) : "";
          setSelectedOrderId(firstId);
        }
      } catch (err) {
        setOrders([]);
      } finally {
        setLoadingOrders(false);
      }
    };
    loadOrders();
  }, []);

  // When order selected → ONLY in template mode: auto-fill "to" + internal template data
  useEffect(() => {
    if (mode !== "template") return;
    if (!selectedOrderId) return;

    const o = orders.find((x) => String(x.orderId) === String(selectedOrderId));
    if (!o) return;

    const customerEmail = o?.Customer?.customerEmail || o?.customerEmail || "";
    const customerName = o?.Customer?.customerName || o?.customerName || "";
    const orderId = o?.orderId || "";

    if (customerEmail) setTo(customerEmail);

    // shape internal template data based on templateName
    const base = { customerName, orderId };
    let smart = base;

    if (templateName === "orderShipped") smart = { ...base, trackingNumber: "" };
    if (templateName === "orderUpdated") smart = { ...base, status: "processing" };
    if (templateName === "supportMessage") smart = { message: "" };

    setTemplateDataJson(JSON.stringify(smart, null, 2));
  }, [selectedOrderId, orders, mode, templateName]);

  // When template changes (template mode): reshape internal JSON but keep customer/order if present
  useEffect(() => {
    if (mode !== "template") return;

    const customerName = parsedTemplateData.customerName || "";
    const orderId = parsedTemplateData.orderId || parsedTemplateData.orderNumber || "";

    let next = { customerName, orderId };

    if (templateName === "orderShipped") next = { ...next, trackingNumber: parsedTemplateData.trackingNumber || "" };
    if (templateName === "orderUpdated") next = { ...next, status: parsedTemplateData.status || "processing" };
    if (templateName === "supportMessage") next = { message: parsedTemplateData.message || "" };

    setTemplateDataJson(JSON.stringify(next, null, 2));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [templateName, mode]);

  const canSend = useMemo(() => {
    if (!to) return false;
    if (mode === "template") return !!templateName;
    return !!customSubject && !!customBody;
  }, [to, mode, templateName, customSubject, customBody]);

  // Live preview for template mode
  useEffect(() => {
    const runPreview = async () => {
      setPreviewError(null);
      setPreviewSubject("");
      setPreviewBody("");

      if (mode !== "template") return;
      if (!templateName) return;

      // If JSON is invalid (shouldn’t happen now), show error
      if (!parsedTemplateData || typeof parsedTemplateData !== "object") {
        setPreviewError("Template data is invalid.");
        return;
      }

      setPreviewLoading(true);
      try {
        const res = await apiPost(
          "/api/templates/email/preview",
          { templateName, data: parsedTemplateData },
          token
        );

        setPreviewSubject(res?.subject || "");
        setPreviewBody(res?.body || "");
      } catch (err) {
        setPreviewError(err.message);
      } finally {
        setPreviewLoading(false);
      }
    };

    runPreview();
  }, [mode, templateName, templateDataJson]); // templateDataJson changes via patchTemplateData

  const sendEmail = async () => {
    setResult(null);

    if (!canSend) {
      setResult({ ok: false, message: "Fill required fields before sending." });
      return;
    }

    setSending(true);

    try {
      if (mode === "template") {
        const res = await apiPost(
          "/api/emails/send",
          { to, templateName, data: parsedTemplateData },
          token
        );

        if (res?.message?.toLowerCase().includes("success")) {
          setResult({
            ok: true,
            message: res.message,
            previewUrl: res.previewUrl || null,
          });
        } else {
          setResult({ ok: false, message: res.message || "Email failed", error: res.error || null });
        }
      } else {
        const res = await apiPost(
          "/api/emails/send-custom",
          { to, subject: customSubject, body: customBody },
          token
        );

        if (res?.message?.toLowerCase().includes("success")) {
          setResult({
            ok: true,
            message: res.message,
            previewUrl: res.previewUrl || null,
          });
        } else {
          setResult({ ok: false, message: res.message || "Email failed", error: res.error || null });
        }
      }
    } catch (err) {
      setResult({ ok: false, message: "Request failed.", error: err.message });
    } finally {
      setSending(false);
    }
  };

  // Extra fields needed for some templates (shown as UI instead of JSON)
  const showTracking = mode === "template" && templateName === "orderShipped";
  const showStatus = mode === "template" && templateName === "orderUpdated";
  const showMessage = mode === "template" && templateName === "supportMessage";

  return (
    <div className="container">
      <div className="pageTitle">Send Email</div>
      <div className="subtitle">Send a template-based email or a custom message. Logged to Email Logs.</div>

      <div className="templatesBox" style={{ maxWidth: 820, padding: 18 }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 14 }}>
          <button
            className={mode === "template" ? "primaryBtn" : "secondaryBtn"}
            onClick={() => setMode("template")}
            type="button"
          >
            Use Template
          </button>
          <button
            className={mode === "custom" ? "primaryBtn" : "secondaryBtn"}
            onClick={() => setMode("custom")}
            type="button"
          >
            Custom Email
          </button>
        </div>

        <div style={{ display: "grid", gap: 12 }}>
          {/* ✅ Template mode ONLY: order dropdown */}
          {mode === "template" && (
            <>
              <div style={{ fontWeight: 900, fontSize: 16 }}>Choose Order (auto-fills customer email)</div>

              {loadingOrders ? (
                <div>Loading orders...</div>
              ) : (
                <select
                  className="input"
                  value={selectedOrderId}
                  onChange={(e) => setSelectedOrderId(e.target.value)}
                >
                  {orders.length === 0 && <option value="">(No orders found)</option>}
                  {orders.map((o) => {
                    const name = o?.Customer?.customerName || o?.customerName || "Customer";
                    const email = o?.Customer?.customerEmail || o?.customerEmail || "no-email";
                    return (
                      <option key={o.orderId} value={o.orderId}>
                        #{o.orderId} — {name} — {email}
                      </option>
                    );
                  })}
                </select>
              )}
            </>
          )}

          {/* ✅ Always show To box (custom wants ONLY this + subject/body) */}
          <input
            className="input"
            placeholder={mode === "custom" ? "Enter recipient email (to) *" : "Recipient email (to) *"}
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />

          {mode === "template" && (
            <>
              <div style={{ fontWeight: 900, fontSize: 16 }}>Template</div>

              {loadingTemplates ? (
                <div>Loading templates...</div>
              ) : (
                <select
                  className="input"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                >
                  {templates.length === 0 && <option value="">(No templates found)</option>}
                  {templates.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              )}

              {/* ✅ Replace JSON textarea with friendly fields */}
              {showTracking && (
                <>
                  <div style={{ fontWeight: 900, fontSize: 16 }}>Tracking Number</div>
                  <input
                    className="input"
                    placeholder="e.g., AUSPOST-XYZ123"
                    value={parsedTemplateData.trackingNumber || ""}
                    onChange={(e) => patchTemplateData({ trackingNumber: e.target.value })}
                  />
                </>
              )}

              {showStatus && (
                <>
                  <div style={{ fontWeight: 900, fontSize: 16 }}>Order Status</div>
                  <select
                    className="input"
                    value={parsedTemplateData.status || "processing"}
                    onChange={(e) => patchTemplateData({ status: e.target.value })}
                  >
                    <option value="pending">pending</option>
                    <option value="processing">processing</option>
                    <option value="shipped">shipped</option>
                    <option value="delivered">delivered</option>
                  </select>
                </>
              )}

              {showMessage && (
                <>
                  <div style={{ fontWeight: 900, fontSize: 16 }}>Support Message</div>
                  <textarea
                    className="input"
                    rows={6}
                    placeholder="Write the message to send..."
                    value={parsedTemplateData.message || ""}
                    onChange={(e) => patchTemplateData({ message: e.target.value })}
                  />
                </>
              )}

              {/* ✅ Preview */}
              <div style={{ fontWeight: 900, fontSize: 16 }}>Email Preview (Subject + Body)</div>
              <div className="templateRow" style={{ gridTemplateColumns: "1fr" }}>
                <div style={{ padding: 14 }}>
                  {previewLoading && <div>Building preview...</div>}
                  {previewError && <div style={{ color: "#b00020" }}>Preview error: {previewError}</div>}

                  <div style={{ fontWeight: 900, marginTop: 6 }}>Subject</div>
                  <div style={{ marginTop: 6 }}>{previewSubject || "—"}</div>

                  <div style={{ height: 10 }} />

                  <div style={{ fontWeight: 900 }}>Body</div>
                  <pre style={{ whiteSpace: "pre-wrap", marginTop: 6 }}>
                    {previewBody || "—"}
                  </pre>
                </div>
              </div>
            </>
          )}

          {/* ✅ Custom mode: ONLY email box + subject/body */}
          {mode === "custom" && (
            <>
              <div style={{ fontWeight: 900, fontSize: 16 }}>Subject *</div>
              <input
                className="input"
                placeholder="Subject"
                value={customSubject}
                onChange={(e) => setCustomSubject(e.target.value)}
              />

              <div style={{ fontWeight: 900, fontSize: 16 }}>Body *</div>
              <textarea
                className="input"
                rows={10}
                placeholder="Write your email message..."
                value={customBody}
                onChange={(e) => setCustomBody(e.target.value)}
              />
            </>
          )}

          <button className="primaryBtn" type="button" disabled={sending} onClick={sendEmail}>
            {sending ? "Sending..." : "Send Email"}
          </button>

          {result && (
            <div className="templateRow" style={{ gridTemplateColumns: "1fr" }}>
              <div style={{ padding: 14 }}>
                <div style={{ fontWeight: 900 }}>{result.ok ? "✅ Sent" : "❌ Error"}</div>
                <div style={{ marginTop: 6 }}>{result.message}</div>
                {result.error && <div style={{ marginTop: 6, color: "#b00020" }}>{result.error}</div>}

                {result.previewUrl && (
                  <div style={{ marginTop: 10 }}>
                    <span className="pill">Ethereal Preview:</span>{" "}
                    <a href={result.previewUrl} target="_blank" rel="noreferrer">
                      Open Preview
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

