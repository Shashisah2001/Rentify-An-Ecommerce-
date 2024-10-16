//wishlistRoutes.js
const express = require("express");
const {
  addToWishlist,
  getWishlist,
  removeFromWishlist,
} = require("../controllers/wishlistController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/add", authMiddleware, addToWishlist);
router.get("/", authMiddleware, getWishlist);
router.delete("/:id", authMiddleware, removeFromWishlist);

module.exports = router;
