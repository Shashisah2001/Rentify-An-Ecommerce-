// productRoutes.js
const express = require("express");
const multer = require("multer");
const {
  addProduct,
  getProducts,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Upload files to the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname); // Append timestamp to file name
  },
});

const upload = multer({ storage });

const router = express.Router();

// Use the upload middleware for adding and updating a product
router.post("/", upload.single("image"), addProduct); // Add image upload middleware here
router.get("/", getProducts);
router.put("/:id", upload.single("image"), updateProduct); // Add image upload middleware here too
router.delete("/:id", deleteProduct);

module.exports = router;
