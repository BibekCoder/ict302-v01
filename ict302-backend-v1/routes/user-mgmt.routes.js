const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const role = require("../middleware/roleMiddleware");
const userMgmtController = require("../controllers/userMgmt.controller");

// Admin only
router.get("/", auth, role(["admin"]), userMgmtController.listUsers);
router.post("/", auth, role(["admin"]), userMgmtController.createUser);
router.put("/:id", auth, role(["admin"]), userMgmtController.updateUser);
router.delete("/:id", auth, role(["admin"]), userMgmtController.deleteUser);

module.exports = router;
