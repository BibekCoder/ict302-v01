const express = require("express");
const app = express();
const cors = require("cors");

// Import Routes
const authRoutes = require("./routes/auth.routes");
const orderRoutes = require("./routes/order.routes");
const userMgmtRoutes = require("./routes/user-mgmt.routes");
const emailRoutes = require("./routes/emailRoutes");
// -----------------------------
// MIDDLEWARES
// -----------------------------

// Allows JSON request bodies
app.use(express.json());

// Allow requests from frontend (React, Vue, etc.)
app.use(cors(
  {
    origin:"http://localhost:5173",
    methods:["GET","POST","PUT","DELETE"],
    credentials:true,
  }
));


// ROUTES HOOKING
app.use("/api/auth", authRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/customers", require("./routes/customer.routes"));
app.use("/api/admin/users", userMgmtRoutes);
app.use("/api/emails", emailRoutes);
app.use("/api/email-logs", require("./routes/emailLogs.routes"));



 

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
