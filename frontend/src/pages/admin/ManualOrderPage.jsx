import { useState } from "react";
import { apiPost } from "../../api";

export default function ManualOrderPage() {
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    customerName: "",
    customerEmail: "",
    customerPhone: "",
    customerAddress: "",
    productName: "",
    quantity: 1,
    totalPrice: 0,
    orderNotes: "",
  });

  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState(null);

  const setField = (k, v) => setForm((p) => ({ ...p, [k]: v }));

  const createOrder = async () => {
    setResult(null);

    if (!form.customerName || !form.customerEmail || !form.customerAddress || !form.productName) {
      setResult({ ok: false, message: "Please fill all required fields." });
      return;
    }

    setSaving(true);
    try {
      const res = await apiPost("/api/orders/manual", form, token);

      if (res?.message?.toLowerCase().includes("success")) {
        setResult({ ok: true, message: res.message });
        // clear form after success
        setForm({
          customerName: "",
          customerEmail: "",
          customerPhone: "",
          customerAddress: "",
          productName: "",
          quantity: 1,
          totalPrice: 0,
          orderNotes: "",
        });
      } else {
        setResult({ ok: false, message: res.message || "Failed", error: res.error || null });
      }
    } catch (err) {
      setResult({ ok: false, message: "Request failed.", error: err.message });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="container">
      <div className="pageTitle">Create Order</div>
      <div className="subtitle">Manually create an order and store it in the database.</div>

      <div className="templatesBox" style={{ padding: 18, maxWidth: 820 }}>
        <div style={{ display: "grid", gap: 12 }}>
          <input className="input" placeholder="Customer Name *" value={form.customerName}
            onChange={(e) => setField("customerName", e.target.value)} />

          <input className="input" placeholder="Customer Email *" value={form.customerEmail}
            onChange={(e) => setField("customerEmail", e.target.value)} />

          <input className="input" placeholder="Customer Phone" value={form.customerPhone}
            onChange={(e) => setField("customerPhone", e.target.value)} />

          <input className="input" placeholder="Customer Address *" value={form.customerAddress}
            onChange={(e) => setField("customerAddress", e.target.value)} />

          <input className="input" placeholder="Product Name *" value={form.productName}
            onChange={(e) => setField("productName", e.target.value)} />

          <input className="input" type="number" placeholder="Quantity *" value={form.quantity}
            onChange={(e) => setField("quantity", e.target.value)} />

          <input className="input" type="number" placeholder="Total Price *" value={form.totalPrice}
            onChange={(e) => setField("totalPrice", e.target.value)} />

          <textarea className="input" placeholder="Order Notes" rows={4} value={form.orderNotes}
            onChange={(e) => setField("orderNotes", e.target.value)} />

          <button className="primaryBtn" onClick={createOrder} disabled={saving}>
            {saving ? "Saving..." : "Create Order"}
          </button>

          {result && (
            <div className="templateRow" style={{ gridTemplateColumns: "1fr" }}>
              <div style={{ padding: 14 }}>
                <div style={{ fontWeight: 900 }}>{result.ok ? "✅ Success" : "❌ Failed"}</div>
                <div style={{ marginTop: 6 }}>{result.message}</div>
                {result.error && <div style={{ marginTop: 6, color: "#b00020" }}>{result.error}</div>}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
