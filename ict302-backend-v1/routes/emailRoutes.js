const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const role = require("../middleware/roleMiddleware");
const emailController = require("../controllers/emailController");

router.post("/send", auth, role(["admin", "support"]), emailController.sendSingleEmail);
router.post("/send-bulk", auth, role(["admin", "support"]), emailController.sendBulkEmail);

module.exports = router;
