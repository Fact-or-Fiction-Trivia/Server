//this is the access point for all things database related!
const { Op } = require("sequelize");
const db = require("./db");

const {
  User,
  Brokerage,
  Agent,
  TC,
  Broker,
  Client,
  Milestone,
  Property,
  Transaction,
  Deal,
  Partner,
} = require("./models");

User.hasMany(Broker);
User.hasMany(Agent);
User.hasMany(TC);
User.hasMany(Partner);

Brokerage.hasMany(Broker);
Brokerage.hasMany(Agent);

Agent.belongsToMany(Transaction, { through: "agent-transactions" });
Transaction.belongsToMany(Agent, { through: "agent-transactions" });

Transaction.belongsToMany(Transaction, {
  through: Deal,
  as: "transactionDeal",
});

Deal.hasMany(Milestone);

Transaction.belongsTo(Property);

Transaction.belongsToMany(Client, { through: "client-transactions" });
Client.belongsToMany(Transaction, { through: "client-transactions" });

Agent.belongsToMany(Client, { through: "agent-clients" });
Client.belongsToMany(Agent, { through: "agent-clients" });

Transaction.belongsToMany(TC, { through: "tc-transactions" });
TC.belongsToMany(Transaction, { through: "tc-transactions" });

Transaction.belongsToMany(Partner, { through: "partner-transactions" });
Partner.belongsToMany(Transaction, { through: "partner-transactions" });

module.exports = {
  db,
  Op,
  models: {
    User,
    Brokerage,
    Agent,
    TC,
    Broker,
    Client,
    Milestone,
    Property,
    Transaction,
    Deal,
    Partner,
  },
};
