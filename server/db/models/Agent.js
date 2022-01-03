const Sequelize = require("sequelize");
const db = require("../db");

const Agent = db.define("agent", {
  firstName: Sequelize.STRING,
  lastName: Sequelize.STRING,
  fullName: {
    type: Sequelize.VIRTUAL,
    get() {
      if (!this.firstName || !this.lastName) {
        return "No Name";
      }
      const [firstF, ...restF] = this.firstName;
      const [firstL, ...restL] = this.lastName;
      return `${firstF.toUpperCase() + restF.join("")} ${
        firstL.toUpperCase() + restL.join("")
      }`;
    },
  },
  email: {
    type: Sequelize.STRING,
    unique: false,
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
});

Agent.prototype.ownsTransaction = async function (transaction) {
  const isOwner = await this.hasTransaction(transaction);

  if (!isOwner)
    throw Error(
      `Agent with ID ${this.id} does not own Transaction with ID ${transaction.id}`
    );
};

Agent.prototype.ownsClient = async function (client) {
  const isOwner = await this.hasClient(client);
  if (!isOwner)
    throw Error(
      `Agent with ID ${this.id} does not own Client with ID ${client.id}`
    );
};

module.exports = Agent;
