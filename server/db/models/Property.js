const Sequelize = require("sequelize");
const db = require("../db");

const Property = db.define("property", {
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
  mlsNumber: {
    type: Sequelize.INTEGER,
    unique: true,
    allowNull: false,
  },
  taxAccountNumber: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: true,
  },
  lotSize: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: true,
  },
  listPrice: {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: 0,
    allowNull: false,
  },
  listPriceFormatted: {
    type: Sequelize.VIRTUAL,
    get() {
      const rawValue = this.getDataValue("listPrice");

      const dollars = (rawValue / 100).toFixed(2);

      return `$${dollars}`;
    },
  },
  origPrice: {
    type: Sequelize.DECIMAL(10, 2),
    defaultValue: 0,
    allowNull: false,
  },
  origPriceFormatted: {
    type: Sequelize.VIRTUAL,
    get() {
      const rawValue = this.getDataValue("origPrice");

      const dollars = (rawValue / 100).toFixed(2);

      return `$${dollars}`;
    },
  },
  squareFootage: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: true,
  },
  yearBuilt: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: true,
  },
  legalDescription: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: true,
  },
  schoolDistrict: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: true,
  },
  middleSchool: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: true,
  },
  elementarySchool: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: true,
  },
  highSchool: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: true,
  },
  stories: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: true,
  },
  bedrooms: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: true,
  },
  baths: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: true,
  },
  acres: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: true,
  },
  utilityDist: {
    type: Sequelize.ENUM("Yes", "No"),
    unique: false,
    allowNull: true,
    defaultValue: "No",
  },
  roof: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: true,
  },
  exteriorConstr: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: true,
  },
  exterior: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: true,
  },
  restrictions: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: true,
    defaultValue: "No Restrictions",
  },
  hoaName: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: true,
    defaultValue: "No",
  },
  buyerAgentComp: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: true,
  },
  foundation: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: true,
  },
  waterSewer: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: true,
  },
  financeCnsdr: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: true,
  },
  taxWOExemptions: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: true,
  },
  exemptions: {
    type: Sequelize.STRING,
    unique: false,
    allowNull: true,
  },
  taxRate: {
    type: Sequelize.DECIMAL,
    unique: false,
    allowNull: true,
  },
});

module.exports = Property;
