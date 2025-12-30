const nodemailer = require("nodemailer");
const pool = require("../config/db");
require("dotenv").config();

let transporterPromise = null;

// Create a reusable Ethereal transporter once
async function getTransporter() {
  if (!transporterPromise) {
    transporterPromise = (async () => {
      const testAccount = await nodemailer.createTestAccount();

      const transporter = nodemailer.createTransport({
        host: testAccount.smtp.host,
        port: testAccount.smtp.port,
        secure: testAccount.smtp.secure,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });

      console.log("✅ Ethereal account created:");
      console.log("   User:", testAccount.user);
      console.log("   Pass:", testAccount.pass);

      return transporter;
    })();
  }

  return transporterPromise;
}

async function logEmail({ to, subject, templateName, status, error, previewUrl }) {
  await pool.query(
    `INSERT INTO email_logs 
     (recipient_email, subject, template_name, status, error_message)
     VALUES (?, ?, ?, ?, ?)`,
    [to, subject, templateName || null, status, error || previewUrl || null]
  );
}

async function sendEmail({ to, subject, body, templateName }) {
  try {
    const transporter = await getTransporter();

    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM || "no-reply@sortem.com",
      to,
      subject,
      text: body,
    });

    const previewUrl = nodemailer.getTestMessageUrl(info);

    await logEmail({
      to,
      subject,
      templateName,
      status: "SENT",
      previewUrl,
    });

    return { success: true, previewUrl };
  } catch (err) {
    await logEmail({
      to,
      subject,
      templateName,
      status: "FAILED",
      error: err.message,
    });

    return { success: false, error: err.message };
  }
}

module.exports = { sendEmail };
