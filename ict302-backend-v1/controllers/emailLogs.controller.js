const { EmailLog } = require("../models");

exports.getAllEmailLogs = async (req, res) => {
  try {
    const logs = await EmailLog.findAll({
      order: [["sendAt", "DESC"]],
    });
    return res.json(logs);
  } catch (err) {
    console.error("EMAIL LOG FETCH ERROR:", err);
    return res.status(500).json({
      message: "Failed to fetch email logs",
      error: err.message,
    });
  }
};
