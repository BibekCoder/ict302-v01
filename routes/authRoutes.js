// routes/authRoutes.js
const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

const { users } = require("../data/users");

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Find user with matching email & password
  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  // Create token with id, role and email
  const token = jwt.sign(
    {
      id: user.id,
      role: user.role,
      email: user.email
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({
    message: "Login successful",
    token,
    role: user.role
  });
});

module.exports = router;
    