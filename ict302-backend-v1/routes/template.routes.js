const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const role = require("../middleware/roleMiddleware");
const templateController = require("../controllers/template.controller");

router.get("/email", auth, role(["admin", "support"]), templateController.listEmailTemplates);
router.post("/email/preview", auth, role(["admin", "support"]), templateController.previewEmailTemplate);

module.exports = router;
