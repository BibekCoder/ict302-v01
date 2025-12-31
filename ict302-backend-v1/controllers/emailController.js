// controllers/emailController.js
const emailTemplates = require("../utils/emailTemplates");
const { sendEmail } = require("../services/emailService");

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
    // Build email content from template
    const { subject, body } = templateFn(data);

    // Send email via Ethereal service
    const result = await sendEmail({ to, subject, body, templateName });

    if (!result.success) {
      return res.status(500).json({
        message: "Email failed",
        error: result.error,
      });
    }

    return res.json({
      message: "Email sent successfully",
      to,
      subject,
      templateName,
      sendAt: new Date(),
      previewUrl: result.previewUrl, // Ethereal preview link
    });
  } catch (err) {
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

      results.push({
        to: r.to,
        success: result.success,
        previewUrl: result.previewUrl || null,
        error: result.error || null,
      });
    } catch (err) {
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
