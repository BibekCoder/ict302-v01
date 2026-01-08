import { sendSingleEmail } from "../api/email";
import { useState,useEffect } from "react";
import emailTemplates from "../utils/emailTemplates";




export default function EmailModal({ order, onClose }) {
 const [subject, setSubject] = useState("");
 const [isSending, setIsSending] = useState(false);
  //const [message, setMessage] = useState("");
  const [templateName, setTemplateName] = useState("orderConfirmation");
  const [preview, setPreview] = useState("");

  useEffect(() => {
  if (!templateName) return;

  const templateFn = emailTemplates[templateName];
  if (!templateFn) return;

  const result = templateFn({
    customerName: order.customer,
    orderId: order.id.replace("#", ""),
  });

  setSubject(result.subject);
  setPreview(result.body);
}, [templateName, order]);


  async function handleSend() {
    if (isSending) return;
     try {
      setIsSending(true);
    const token = localStorage.getItem("token");

    await sendSingleEmail(
      {
        to: order.email,
        templateName: "followUpMessage",
        data: {
          customerName: order.customer,
          orderId: order.id.replace("#", ""),
        },
      },
      token
    );

    alert("Email sent successfully");
    onClose();
  } catch (err) {
    alert(err.message || "Failed to send email");
  }finally{
    setIsSending(false);
  }

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
            <span className="label">Template</span>
            <select
              className="input"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              placeholder="Enter templateName"
            >
               {Object.keys(emailTemplates).map((key) => (
              <option key={key} value={key}>
                {key}
                </option>
              ))}

            </select>
          </label>
          
          
        <div className="modalBody">
          <div className="row">
            <span className="label">Subject</span>
            <span className="value">{subject || "No subject" }</span>
          </div>
        </div>

          <label className="field">
            <span className="label">Message</span>
            <textarea
              className="textarea"
              value={preview}
              readOnly
            />
          </label>
        </div>

        <div className="modalActions">
          <button className="btn ghost" onClick={onClose}>
            Cancel
          </button>

          <button
          disabled={isSending}
            className="btn primary"
            onClick={handleSend}
            style={{ opacity: isSending ? 0.6 : 1 }}
          >
            {isSending? "Sending email...": "Send Email"}
          </button>
        </div>
      </div>
    </div>
  );
}
