//userRoutes.js
const express = require("express");
const {
  getUserProfile,
  updateUserProfile,
  deleteUser,
} = require("../controllers/userController");
// Assuming authentication is needed
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

// Route to get the authenticated user's profile
router.get("/profile", authMiddleware, getUserProfile);

// Route to update the authenticated user's profile
router.put("/profile", authMiddleware, updateUserProfile);

// Route to delete the authenticated user's account
router.delete("/profile", authMiddleware, deleteUser);

module.exports = router;
