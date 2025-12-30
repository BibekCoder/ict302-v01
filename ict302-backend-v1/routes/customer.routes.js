const express = require("express");
const router = express.Router();
const customerController = require("../controllers/customer.controller");

// POST /api/customers
router.post("/", customerController.createCustomer);



// GET /api/customers
router.get("/", customerController.getAllCustomers);

// GET /api/customers/:id
router.get("/:id", customerController.getCustomerById);

router.put("/:id", customerController.updateCustomer);

router.delete("/:id", customerController.deleteCustomer);   

module.exports = router;