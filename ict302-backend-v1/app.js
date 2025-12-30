const express = require("express");
const app = express();
const cors = require("cors");

// Import Routes
const authRoutes = require("./routes/auth.routes");
const orderRoutes = require("./routes/order.routes");
const userMgmtRoutes = require("./routes/user-mgmt.routes");

// -----------------------------
// MIDDLEWARES
// -----------------------------

// Allows JSON request bodies
app.use(express.json());

// Allow requests from frontend (React, Vue, etc.)
app.use(cors());


// ROUTES HOOKING
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/customers", require("./routes/customer.routes"));
app.use("/api/admin/users", userMgmtRoutes);


 

// Health check endpoint
app.get("/", (req, res) => {
  res.send("Backend is running 🚀 Horray");
});

// -----------------------------
// ERROR HANDLER (optional basic)
// -----------------------------

app.use((err, req, res, next) => {
  console.error("❌ ERROR:", err.stack);
  res.status(500).json({ message: "Something went wrong" });
});

module.exports = app;
