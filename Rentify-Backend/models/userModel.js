//userModel.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelizeDB");

const User = sequelize.define(
  "User",
  {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
    },
    cart: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [], // Initialize as an empty array
    },
    wishlist: {
      type: DataTypes.JSON,
      allowNull: false,
      defaultValue: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = User;
