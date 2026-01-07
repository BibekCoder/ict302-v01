const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const role = require("../middleware/roleMiddleware");
const controller = require("../controllers/emailLogs.controller");

router.get("/", auth, role(["admin", "support"]), controller.getAllEmailLogs);

module.exports = router;
