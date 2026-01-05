const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const adminOnly = [authMiddleware, roleMiddleware(["admin"])];


const authController = require("../controllers/auth.controller");

// Register user 
router.post( "/register", authController.register);
router.post( "/login", authController.login);
module.exports = router;

