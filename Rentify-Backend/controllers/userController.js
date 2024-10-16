//userController.js
const User = require("../models/userModel");

// Get user profile
const getUserProfile = async (req, res) => {
  // Assuming user ID is stored in req.user by auth middleware
  const userId = req.user.userId;
  try {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ["password"] },
    });
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Update user profile
const updateUserProfile = async (req, res) => {
  // Assuming user ID is stored in req.user by auth middleware
  const userId = req.user.userId;
  // Assuming these fields can be updated
  const { username, email } = req.body;
  try {
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    user.username = username || user.username;
    user.email = email || user.email;
    await user.save();

    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

// Delete user profile
const deleteUser = async (req, res) => {
  // Assuming user ID is stored in req.user by auth middleware
  const userId = req.user.userId;
  try {
    const user = await User.findByPk(userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    await user.destroy();
    // 204 No Content response for a successful deletion
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { getUserProfile, updateUserProfile, deleteUser };
