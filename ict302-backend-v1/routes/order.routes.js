// routes/orderRoutes.js
const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth.middleware");
const role = require("../middleware/roleMiddleware");
const orderController = require("../controllers/order.controller");

// support + admin can access orders
//const  = [auth, role(["support", "admin"])];

// GET /api/orders
router.get("/",auth,role(["support", "admin"],["founder"]),orderController.getAllOrders);

// GET /api/orders/:id
router.get("/:id",auth,role(["support", "admin"],["founder"]),orderController.getOrderById);

// POST /api/orders
router.post("/",auth,role(["support","admin"]),orderController.createOrder);

// PUT /api/orders/:id
router.put("/:id", auth, role(["support"]), orderController.updateOrderStatus);

router.post("/new_customer",orderController.createOrderWithCustomer);
module.exports = router;
router.post("/manual", auth, role(["admin", "support"]), orderController.createManualOrder);
router.get("/recent", auth, role(["admin", "support"]), orderController.getRecentOrders);
 