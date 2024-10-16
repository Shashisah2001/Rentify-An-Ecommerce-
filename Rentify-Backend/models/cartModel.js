//cartModel
const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelizeDB");

const Cart = sequelize.define(
  "Cart",
  {
    productId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    userId: {
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

module.exports = Cart;
