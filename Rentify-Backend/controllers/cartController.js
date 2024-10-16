//cartController.js
const User = require("../models/UserModel");

const addToCart = async (req, res) => {
  const { productId } = req.body;
  try {
    const user = await User.findByPk(req.user.userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    // Initialize cart as an array if it's not already
    if (!Array.isArray(user.cart)) {
      user.cart = [];
    }

    if (!user.cart.includes(productId)) {
      // Add productId to the cart
      user.cart.push(productId);
    } else {
      return res.status(400).json({ msg: "Product already in cart" });
    }

    await user.save();
    res.status(200).json(user.cart);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const removeFromCart = async (req, res) => {
  const { productId } = req.body;
  try {
    const user = await User.findByPk(req.user.userId);
    if (!user) return res.status(404).json({ msg: "User not found" });

    if (Array.isArray(user.cart)) {
      // Remove productId from the cart
      user.cart = user.cart.filter((id) => id !== productId);
      await user.save();
      return res.status(200).json(user.cart);
    } else {
      return res.status(400).json({ msg: "Cart is not an array" });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { addToCart, removeFromCart };
