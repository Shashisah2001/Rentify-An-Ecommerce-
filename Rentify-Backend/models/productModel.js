//productModel.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelizeDB");

const Product = sequelize.define(
  "Product",
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
        isFloat: true,
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: 0,
        isInt: true,
      },
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    timestamps: true,
  }
);

// Optional: Adding hooks for additional functionality
Product.beforeCreate((product) => {
  // Logic to execute before creating a product (Like:-setting default values)
  if (!product.description) {
    // Default description
    product.description = "No description provided.";
  }
});

module.exports = Product;
