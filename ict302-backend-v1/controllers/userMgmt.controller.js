const bcrypt = require("bcryptjs");
const { User } = require("../models");

exports.listUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: ["userId", "userName", "email", "role"],
      order: [["userId", "ASC"]],
    });
    res.json({ users });
  } catch (err) {
    res.status(500).json({ message: "Failed to list users", error: err.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { userName, email, password, role } = req.body;

    if (!userName || !email || !password) {
      return res.status(400).json({ message: "userName, email, password required" });
    }

    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(409).json({ message: "User already exists" });

    const password_hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      userName,
      email,
      password_hash,
      role: role || "support",
    });

    res.status(201).json({
      message: "User created successfully",
      user: { userId: user.userId, userName: user.userName, email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to create user", error: err.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { userName, email, role, password } = req.body;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    // If email changed, prevent duplicates
    if (email && email !== user.email) {
      const existing = await User.findOne({ where: { email } });
      if (existing) return res.status(409).json({ message: "Email already in use" });
    }

    if (userName !== undefined) user.userName = userName;
    if (email !== undefined) user.email = email;
    if (role !== undefined) user.role = role;

    if (password && password.trim().length > 0) {
      user.password_hash = await bcrypt.hash(password, 10);
    }

    await user.save();

    res.json({
      message: "User updated successfully",
      user: { userId: user.userId, userName: user.userName, email: user.email, role: user.role },
    });
  } catch (err) {
    res.status(500).json({ message: "Failed to update user", error: err.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByPk(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    await user.destroy();
    res.json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete user", error: err.message });
  }
};
