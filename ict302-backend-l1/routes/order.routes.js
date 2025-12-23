// routes/orderRoutes.js
const express = require("express");
const router = express.Router();

//const auth = require("../middleware/authMiddleware");
//onst role = require("../middleware/roleMiddleware");
const orderController = require("../controllers/order.controller");

// support + admin can access orders
//const  = [auth, role(["support", "admin"])];

// GET /api/orders
router.get("/orders",orderController.getAllOrders);

// GET /api/orders/:id
router.get("/orders/:id",orderController.getOrderById);

// POST /api/orders
router.post("/orders", orderController.createOrder);

// PUT /api/orders/:id
router.put("/orders/:id", orderController.updateOrderStatus);

module.exports = router;
 