//cartRoutes.js
const express = require("express");
const { addToCart, removeFromCart } = require("../controllers/cartController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/add", authMiddleware, addToCart);
router.delete("/remove", authMiddleware, removeFromCart);

module.exports = router;
