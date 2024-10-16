//wishlistModel.js
const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelizeDB");

const Wishlist = sequelize.define(
  "Wishlist",
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 1,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = Wishlist;
