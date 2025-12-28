import SystemSettingsLayout from "./SystemSettingsLayout";

export default function ShippingPage() {
  return (
    <SystemSettingsLayout activeKey="shipping">
      <div>
        <div className="pageTitle" style={{ fontSize: 38 }}>Shipping</div>
        <div className="subtitle">Shipping options and carriers (demo).</div>

        <div className="templatesBox" style={{ maxWidth: 760 }}>
          <div style={{ fontSize: 22, fontWeight: 900, marginBottom: 12 }}>Carrier</div>
          <div style={{ display: "grid", gap: 10, fontSize: 18 }}>
            <div><b>Carrier:</b> AusPost (demo)</div>
            <div><b>Delivery estimate:</b> 2–5 business days</div>
            <div><b>Tracking:</b> Enabled</div>
          </div>
        </div>
      </div>
    </SystemSettingsLayout>
  );
}
