// controllers/order.controller.js

const { Order, Customer } = require("../models");

/**
 * CREATE A NEW ORDER
 * POST /api/orders
 */
exports.createOrder = async (req, res) => {
  try {
    const {
      customerId,
      productName,
      quantity,
      totalPrice,
      orderNotes,
      orderDate,
      status,
    } = req.body;

    if (!orderDate || !totalPrice || !productName || !quantity) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newOrder = await Order.create({
      orderDate,
      totalPrice,
      customerId,
      productName,
      quantity,
      status,
      orderNotes,
    });

    return res.status(201).json({
      message: "Order created successfully",
      order: newOrder,
    });
  } catch (error) {
    console.error("Create order error:", error);
    return res.status(500).json({
      message: "Failed to create order",
      error: error.message,
    });
  }
};

/**
 * CREATE ORDER + CREATE CUSTOMER
 * POST /api/orders/new-customer
 */
exports.createOrderWithCustomer = async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      productName,
      quantity,
      totalPrice,
      orderNotes,
    } = req.body;

    if (!customerName || !customerEmail || !productName || !quantity || !totalPrice) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const customer = await Customer.create({
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
    });

    const order = await Order.create({
      productName,
      quantity,
      totalPrice,
      orderDate: new Date(),
      customerId: customer.customerId,
      orderNotes,
    });

    return res.status(201).json({
      message: "Order with new customer created successfully",
      customer,
      order,
    });
  } catch (error) {
    console.error("Create order with customer error:", error);
    return res.status(500).json({
      message: "Failed to create order with customer",
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
      include: [
        {
          model: Customer,
          attributes: [
            "customerId",
            "customerName",
            "customerEmail",
            "customerPhone",
            "customerAddress",
            "planManagerName",
            "planManagerEmail",
            "planManagerPhone",
            "emailRecipient1",
            "emailRecipient2",
            "emailRecipient3",
          ],
        },
      ],
      order: [["orderDate", "DESC"]],
    });

    return res.status(200).json({
      count: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Get all orders error:", error);
    return res.status(500).json({
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

    const order = await Order.findByPk(id, {
      include: [
        {
          model: Customer,
          attributes: [
            "customerId",
            "customerName",
            "customerEmail",
            "customerPhone",
            "customerAddress",
            "planManagerName",
            "planManagerEmail",
            "planManagerPhone",
            "emailRecipient1",
            "emailRecipient2",
            "emailRecipient3",
          ],
        },
      ],
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json(order);
  } catch (error) {
    console.error("Get order by ID error:", error);
    return res.status(500).json({
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

    const allowedStatuses = ["pending", "processing", "shipped", "delivered"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid order status" });
    }

    const order = await Order.findByPk(id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    order.status = status;
    await order.save();

    return res.status(200).json({
      message: "Order status updated",
      order,
    });
  } catch (error) {
    console.error("Update order status error:", error);
    return res.status(500).json({
      message: "Failed to update order",
      error: error.message,
    });
  }
};

/**
 * MANUAL ORDER CREATION (Frontend form)
 * POST /api/orders/manual
 */
exports.createManualOrder = async (req, res) => {
  try {
    const {
      customerName,
      customerEmail,
      customerPhone,
      customerAddress,
      productName,
      quantity,
      totalPrice,
      orderNotes,
    } = req.body;

    if (!customerName || !customerEmail || !customerAddress || !productName || !quantity || !totalPrice) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Find customer by email, else create
    let customer = await Customer.findOne({ where: { customerEmail } });

    if (!customer) {
      customer = await Customer.create({
        customerName,
        customerEmail,
        customerPhone: customerPhone || null,
        customerAddress,
      });
    }

    // Create order linked to customer
    const order = await Order.create({
      customerId: customer.customerId,
      productName,
      quantity: Number(quantity),
      totalPrice: Number(totalPrice),
      orderNotes: orderNotes || null,
      orderDate: new Date(),
      status: "pending",
    });

    return res.status(201).json({
      message: "Order created successfully",
      order,
      customer,
    });
  } catch (error) {
    console.error("CREATE MANUAL ORDER ERROR:", error);
    return res.status(500).json({
      message: "Failed to create order",
      error: error.message,
    });
  }
};

/**
 * RECENT ORDERS (for dashboard)
 * GET /api/orders/recent?limit=5
 */
exports.getRecentOrders = async (req, res) => {
  try {
    const limit = Number(req.query.limit || 5);

    const orders = await Order.findAll({
      include: [{ model: Customer, required: false }],
      order: [["orderDate", "DESC"]],
      limit,
    });

    return res.json({ orders });
  } catch (error) {
    console.error("GET RECENT ORDERS ERROR:", error);
    return res.status(500).json({
      message: "Failed to fetch recent orders",
      error: error.message,
    });
  }
};
