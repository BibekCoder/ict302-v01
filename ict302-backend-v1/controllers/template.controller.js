const emailTemplates = require("../utils/emailTemplates");

exports.listEmailTemplates = (req, res) => {
  return res.json({ templates: Object.keys(emailTemplates) });
};

exports.previewEmailTemplate = (req, res) => {
  const { templateName, data } = req.body;

  if (!templateName) {
    return res.status(400).json({ message: "templateName is required" });
  }

  const templateFn = emailTemplates[templateName];
  if (!templateFn) {
    return res.status(400).json({
      message: "Invalid templateName",
      availableTemplates: Object.keys(emailTemplates),
    });
  }

  try {
    const safeData = data && typeof data === "object" ? data : {};
    const { subject, body } = templateFn(safeData);
    return res.json({ templateName, subject, body });
  } catch (err) {
    return res.status(500).json({
      message: "Failed to preview template",
      error: err.message,
    });
  }
};
