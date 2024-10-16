//wishlistController
const Wishlist = require("../models/wishlistModel");
const User = require("../models/userModel");

const addToWishlist = async (req, res) => {
  const { productId } = req.body;
  // Assuming user ID is stored in req.user
  const userId = req.user.userId;

  try {
    // Check if the product is already in the wishlist
    const existingItem = await Wishlist.findOne({
      where: { userId, productId },
    });
    if (existingItem) {
      return res.status(400).json({ msg: "Product already in wishlist" });
    }

    // Add new item to the wishlist
    const newWishlistItem = await Wishlist.create({ userId, productId });
    res.status(201).json(newWishlistItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const getWishlist = async (req, res) => {
  // Assuming user ID is stored in req.user
  const userId = req.user.userId;
  try {
    const wishlist = await Wishlist.findAll({ where: { userId } });
    res.status(200).json(wishlist);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const getWishlistCount = async (req, res) => {
  // Assuming user ID is stored in req.user
  const userId = req.user.userId;
  try {
    const count = await Wishlist.count({ where: { userId } });
    res.status(200).json({ count });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const removeFromWishlist = async (req, res) => {
  const { id } = req.params;
  try {
    const wishlistItem = await Wishlist.findByPk(id);
    if (!wishlistItem)
      return res.status(404).json({ msg: "Wishlist item not found" });

    await wishlistItem.destroy();
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  addToWishlist,
  getWishlist,
  getWishlistCount,
  removeFromWishlist,
};
