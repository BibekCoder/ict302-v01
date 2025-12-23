// controllers/orderController.js

const { Order } = require("../models"); 
// If your setup is different, see tips below 👇

/**
 * CREATE A NEW ORDER
 * POST /api/orders
 */
exports.createOrder = async (req, res) => {
  try {
    const {
      orderDate,
      totalPrice,
      customerAddress,
      customerEmail,
      customerName,
      productName,
      quantity,
      status,
      orderNotes,
    } = req.body;

    // Basic validation (important!)
    if (
      !orderDate ||
      !totalPrice ||
      !customerAddress ||
      !customerEmail ||
      !customerName ||
      !productName ||
      !quantity
    ) {
      return res.status(400).json({
        message: "Missing required fields",
      });
    }

    const newOrder = await Order.create({
      orderDate,
      totalPrice,
      customerAddress,
      customerEmail,
      customerName,
      productName,
      quantity,
      status,      // optional (defaults to 'pending')
      orderNotes,  // optional
    });

    res.status(201).json({
      message: "Order created successfully",
      order: newOrder,
    });
  } 
    catch (error) {
    console.error("Create order error:", error);
    res.status(500).json({
      message: "Failed to create order",
      error: error.message,
    });
  }
};

/**
 * GET ALL ORDERS
 * GET /api/orders
 */
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      order: [["orderDate", "DESC"]], // newest first
    });

    res.status(200).json({
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Get all orders error:", error);
    res.status(500).json({
      message: "Failed to fetch orders",
      error: error.message,
    });
  }
};

/**
 * GET ORDER BY ID
 * GET /api/orders/:id
 */
exports.getOrderById = async (req, res) => {
  try {
    const { id } = req.params;

    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    res.status(200).json(order);
  } catch (error) {
    console.error("Get order by ID error:", error);
    res.status(500).json({
      message: "Failed to fetch order",
      error: error.message,
    });
  }
};

/**
 * UPDATE ORDER STATUS
 * PUT /api/orders/:id
 */
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    // Allowed statuses
    const allowedStatuses = [
      "pending",
      "processing",
      "shipped",
      "delivered",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid order status",
      });
    }

    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({
        message: "Order not found",
      });
    }

    order.status = status;
    await order.save();

    res.status(200).json({
      message: "Order status updated",
      order,
    });
  } catch (error) {
    console.error("Update order status error:", error);
    res.status(500).json({
      message: "Failed to update order",
      error: error.message,
    });
  }
};
