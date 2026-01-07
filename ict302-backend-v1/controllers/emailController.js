// controllers/emailController.js
const emailTemplates = require("../utils/emailTemplates");
const { sendEmail } = require("../services/emailService");
const { EmailLog } = require("../models");

// helper: log to DB but NEVER crash the request
async function safeCreateEmailLog(payload) {
  try {
    await EmailLog.create(payload);
  } catch (e) {
    // Do NOT crash sending; just print the real DB error in terminal
    console.error("EMAIL LOG INSERT FAILED:", e?.parent?.sqlMessage || e.message || e);
  }
}

exports.sendSingleEmail = async (req, res) => {
  const { to, templateName, data } = req.body;

  // Basic validation
  if (!to || !templateName || !data) {
    return res.status(400).json({
      message: "to, templateName, and data are required",
    });
  }

  // Validate template exists
  const templateFn = emailTemplates[templateName];
  if (!templateFn) {
    return res.status(400).json({
      message: "Invalid templateName",
      availableTemplates: Object.keys(emailTemplates),
    });
  }

  try {
    // Build email content
    const { subject, body } = templateFn(data);

    // Send email via service
    const result = await sendEmail({ to, subject, body, templateName });

    // If send failed, log FAILED (but don't crash)
    if (!result.success) {
      await safeCreateEmailLog({
        to,
        subject,
        templateName,
        status: "FAILED",
        error: result.error || "Unknown email service error",
        sendAt: new Date(),
      });

      return res.status(500).json({
        message: "Email failed",
        error: result.error,
      });
    }

    // Log SENT (but don't crash)
    await safeCreateEmailLog({
      to,
      subject,
      templateName,
      status: "SENT",
      error: null,
      sendAt: new Date(),
    });

    return res.json({
      message: "Email sent successfully",
      to,
      subject,
      templateName,
      sendAt: new Date(),
      previewUrl: result.previewUrl,
    });
  } catch (err) {
    console.error("SEND SINGLE EMAIL ERROR:", err);

    // Log unexpected error as FAILED (but don't crash)
    await safeCreateEmailLog({
      to,
      subject: "Unknown",
      templateName,
      status: "FAILED",
      error: err.message,
      sendAt: new Date(),
    });

    return res.status(500).json({
      message: "Unexpected error while sending email",
      error: err.message,
    });
  }
};

exports.sendBulkEmail = async (req, res) => {
  const { templateName, recipients } = req.body;

  // Validation
  if (!templateName || !Array.isArray(recipients) || recipients.length === 0) {
    return res.status(400).json({
      message: "templateName and recipients[] are required",
      example: {
        templateName: "followUpMessage",
        recipients: [
          {
            to: "someone@example.com",
            data: { customerName: "Aaron", orderId: 2001 },
          },
        ],
      },
    });
  }

  // Validate template exists
  const templateFn = emailTemplates[templateName];
  if (!templateFn) {
    return res.status(400).json({
      message: "Invalid templateName",
      availableTemplates: Object.keys(emailTemplates),
    });
  }

  const results = [];

  for (const r of recipients) {
    // Per-recipient validation
    if (!r || !r.to || !r.data) {
      results.push({
        to: r?.to || null,
        success: false,
        previewUrl: null,
        error: "Each recipient must include { to, data }",
      });
      continue;
    }

    try {
      const { subject, body } = templateFn(r.data);

      const result = await sendEmail({
        to: r.to,
        subject,
        body,
        templateName,
      });

      // Log each attempt (but don't crash)
      await safeCreateEmailLog({
        to: r.to,
        subject,
        templateName,
        status: result.success ? "SENT" : "FAILED",
        error: result.success ? null : (result.error || "Unknown email service error"),
        sendAt: new Date(),
      });

      results.push({
        to: r.to,
        success: result.success,
        previewUrl: result.previewUrl || null,
        error: result.error || null,
      });
    } catch (err) {
      console.error("SEND BULK EMAIL ERROR:", err);

      await safeCreateEmailLog({
        to: r.to,
        subject: "Unknown",
        templateName,
        status: "FAILED",
        error: err.message,
        sendAt: new Date(),
      });

      results.push({
        to: r.to,
        success: false,
        previewUrl: null,
        error: err.message,
      });
    }
  }

  return res.json({
    message: "Bulk email process completed",
    templateName,
    totalRecipients: recipients.length,
    results,
  });
};

