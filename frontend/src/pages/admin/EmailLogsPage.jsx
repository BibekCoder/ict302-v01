import { useEffect, useState } from "react";
import { apiGet } from "../../api";

export default function EmailLogsPage() {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchLogs = async () => {
      setLoading(true);
      const data = await apiGet("/api/email-logs", token);

      if (Array.isArray(data)) {
        setLogs(data);
      } else {
        console.error("Email logs fetch failed:", data);
        setLogs([]);
      }

      setLoading(false);
    };

    fetchLogs();
  }, []);

  return (
    <div className="container">
      <div className="pageTitle">Email Logs</div>
      <div className="subtitle">
        Audit trail of all emails sent by the system.
      </div>

      <div className="templatesBox">
        <div
          className="templatesHeaderRow"
          style={{ gridTemplateColumns: "220px 1fr 220px 120px" }}
        >
          <div>Time</div>
          <div>Email Details</div>
          <div>Template</div>
          <div>Status</div>
        </div>

        {loading && (
          <div className="templateRow">
            <div style={{ padding: 16 }}>Loading email logs…</div>
          </div>
        )}

        {!loading && logs.length === 0 && (
          <div className="templateRow">
            <div style={{ padding: 16 }}>
              No email logs found. Send an email to see logs here.
            </div>
          </div>
        )}

        {!loading &&
          logs.map((log) => (
            <div
              key={log.logId}
              className="templateRow"
              style={{ gridTemplateColumns: "220px 1fr 220px 120px" }}
            >
              <div className="templateName" style={{ fontWeight: 700 }}>
                {new Date(log.sendAt).toLocaleString()}
              </div>

              <div style={{ fontSize: 18 }}>
                <div style={{ fontWeight: 800 }}>{log.to}</div>
                <div style={{ color: "#6b6b6b", marginTop: 4 }}>
                  {log.subject}
                </div>
                {log.error && (
                  <div style={{ color: "#b00020", marginTop: 6 }}>
                    {log.error}
                  </div>
                )}
              </div>

              <div style={{ textAlign: "right" }}>
                <span className="pill">
                  {log.templateName || "Manual"}
                </span>
              </div>

              <div style={{ textAlign: "right" }}>
                <span
                  className={`pill ${
                    log.status === "FAILED" ? "disabled" : ""
                  }`}
                >
                  {log.status}
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}

