// routes/userManagementRoutes.js
const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const role = require("../middleware/roleMiddleware");
const userMgmtController = require("../controllers/user-management.controller");

// All routes here are admin-only
const adminOnly = [auth, role(["admin"])];

//  GET /api/admin/users  -> list all users
router.get("/",...adminOnly, userMgmtController.getAllUsers);

//  GET /api/admin/users/:id  -> get single user by id
router.get("/:id",...adminOnly, userMgmtController.getUserById);

//  POST /api/admin/users  -> create a new user
router.post("/",...adminOnly, userMgmtController.createUser);

//  PUT /api/admin/users/:id  -> update existing user
router.put("/:id",...adminOnly, userMgmtController.updateUser);

//  DELETE /api/admin/users/:id  -> "deactivate" user
router.delete("/:id",...adminOnly, userMgmtController.deleteUser);

module.exports = router;