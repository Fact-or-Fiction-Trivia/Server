//this is the access point for all things database related!
const { Op } = require("sequelize");
const db = require("./db");

const { User } = require("./models");

module.exports = {
  db,
  Op,
  models: {
    User,
  },
};
