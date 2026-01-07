import { useState } from "react";

export default function EmailModal({ order, onClose }) {
  const [subject, setSubject] = useState(`Regarding your order ${order?.id}`);
  const [message, setMessage] = useState("");

  function handleSend() {
    // For now we are NOT sending a real email (backend will do that later).
    // This proves the feature works in frontend.
    alert(
      `Email sent!\n\nTo: ${order.email}\nSubject: ${subject}\nMessage: ${message}`
    );
    onClose();
  }

  return (
    <div className="modalBackdrop" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modalHeader">
          <h3>Send Email</h3>
          <button className="iconBtn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modalBody">
          <div className="row">
            <span className="label">Customer</span>
            <span className="value">{order.customer}</span>
          </div>

          <div className="row">
            <span className="label">To</span>
            <span className="value">{order.email}</span>
          </div>

          <label className="field">
            <span className="label">Subject</span>
            <input
              className="input"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter subject"
            />
          </label>

          <label className="field">
            <span className="label">Message</span>
            <textarea
              className="textarea"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Write your message..."
              rows={6}
            />
          </label>
        </div>

        <div className="modalActions">
          <button className="btn ghost" onClick={onClose}>
            Cancel
          </button>
          <button
            className="btn primary"
            onClick={handleSend}
            disabled={!subject.trim() || !message.trim()}
            title={
              !subject.trim() || !message.trim()
                ? "Please fill subject and message"
                : "Send Email"
            }
          >
            Send Email
          </button>
        </div>
      </div>
    </div>
  );
}
