const Sequelize = require("sequelize");
const db = require("../db");

const Brokerage = db.define("brokerage", {
  companyName: Sequelize.STRING,
  streetOne: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false,
  },
  streetTwo: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: true,
  },
  city: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false,
  },
  state: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false,
  },
  zip: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false,
  },
  country: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: false,
  },
  address: {
    type: Sequelize.VIRTUAL,
    get() {
      return (
        this.streetOne +
        this.streetTwo +
        this.city +
        this.state +
        this.zip +
        this.country
      );
    },
  },
  email: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  phone: {
    type: Sequelize.STRING(10),
    allowNull: true,
    validate: {
      is: ["^[0-9]*$", "i"],
    },
  },
  phoneFormat: {
    type: Sequelize.VIRTUAL,
    get() {
      if (!this.phone) {
        return "No Phone Number";
      }
      return `(${this.phone.substring(0, 3)}) ${
        this.phone.substring(3, 6) + "-" + this.phone.substring(6)
      }`;
    },
  },
  licenseNumber: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  supervisorName: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
  supervisorLicenseNumber: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false,
  },
});

module.exports = Brokerage;
