import SystemSettingsLayout from "./SystemSettingsLayout";

export default function PaymentTaxesPage() {
  return (
    <SystemSettingsLayout activeKey="payment">
      <div>
        <div className="pageTitle" style={{ fontSize: 38 }}>Payment & Taxes</div>
        <div className="subtitle">Payment and tax settings (demo).</div>

        <div className="templatesBox" style={{ maxWidth: 760 }}>
          <div style={{ fontSize: 22, fontWeight: 900, marginBottom: 12 }}>Configuration</div>
          <div style={{ display: "grid", gap: 10, fontSize: 18 }}>
            <div><b>Payment provider:</b> Stripe (demo)</div>
            <div><b>GST:</b> Enabled</div>
            <div><b>Tax region:</b> Australia</div>
          </div>
        </div>
      </div>
    </SystemSettingsLayout>
  );
}
