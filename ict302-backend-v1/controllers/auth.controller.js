const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken"); //JWT LIBRARY
const { User } = require("../models");

exports.register = async (req, res) => {
  try {
    const { userName,email, password, role } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser)
      return res.status(409).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      password_hash: hashedPassword,
      role: role || "support",
      userName,
    });

    //TOKEN IS GENERATED HERE
    const token = jwt.sign(
      { userId: user.userId, email: user.email, role: user.role,userName:user.userName },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
    });
  } catch (err) {
  console.error("REGISTER ERROR:", err);
  res.status(500).json({
    message: err.message || "Server error",
  });
}
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ where: { email } });
    if (!user)
      return res.status(401).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid email or password" });

    const token = jwt.sign(
      { userId: user.userId, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      role: user.role,
    });
  } catch (err) {
    console.error("LOGIN ERROR:", err);
    res.status(500).json({
      message: err.message || "Server error",
    });
  }
};

