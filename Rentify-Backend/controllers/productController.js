// productController.js
const Product = require("../models/productModel");

const addProduct = async (req, res) => {
  const { name, price, description, stock } = req.body;
  const image = req.file ? req.file.filename : null; // Get the filename from the uploaded file

  try {
    const newProduct = await Product.create({
      name,
      price,
      description,
      image, // Store the image filename in the database
      stock,
    });
    res.status(201).json(newProduct);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, description, stock } = req.body;
  const image = req.file ? req.file.filename : null; // Get the filename from the uploaded file

  try {
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ msg: "Product not found" });

    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image; // Update image if uploaded
    product.stock = stock;
    await product.save();
    res.status(200).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findByPk(id);
    if (!product) return res.status(404).json({ msg: "Product not found" });

    await product.destroy();
    res.status(204).send();
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = { addProduct, getProducts, updateProduct, deleteProduct };
