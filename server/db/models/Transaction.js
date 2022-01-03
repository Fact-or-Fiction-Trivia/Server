const Sequelize = require("sequelize");
const db = require("../db");

const Transaction = db.define("transaction", {
  status: {
    type: Sequelize.ENUM("Active", "Under Contract", "Withdrawn", "Closed"),
    allowNull: false,
    defaultValue: "Active",
  },
  affiliation: {
    type: Sequelize.ENUM("Buyer", "Seller", "Both"),
    allowNull: false,
    defaultValue: "Buyer",
  },
});

module.exports = Transaction;
