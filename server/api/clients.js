/* eslint-disable no-unused-vars */
const router = require("express").Router();

const {
  Op,
  models: { User, Agent, Transaction, Client, Property },
} = require("../db");

const {
  requireToken,
  isAgentOfUser,
  isClientOfAgent,
} = require("./middleware");

/**
 * GET /:clientId
 * Individual Client
 */
router.get("/:clientId", requireToken, async (req, res, next) => {
  try {
    const { clientId } = req.params;
    res.json(await Client.findByPk(clientId));
  } catch (err) {
    next(err);
  }
});

/**
 * GET /agents/:agentId
 * All Clients of Agent
 */
router.get(
  "/agents/:agentId",
  requireToken,
  isAgentOfUser,
  async (req, res, next) => {
    try {
      res.json(
        await Agent.findByPk(req.agentId, { include: [Client] }).then(
          ({ clients }) => clients
        )
      );
    } catch (err) {
      next(err);
    }
  }
);

/**
 * GET /agents-client/:agentId/:clientId
 * Specific Client of Agent
 */
router.get(
  "/agents-client/:agentId/:clientId",
  requireToken,
  isAgentOfUser,
  isClientOfAgent,
  async (req, res, next) => {
    try {
      res.json(await Client.findByPk(req.clientId));
    } catch (err) {
      next(err);
    }
  }
);

/**
 * GET /:agentId/transactions
 * All transactions for a specific agent
 */
router.get("/:clientId/transactions", requireToken, async (req, res, next) => {
  try {
    const { clientId } = req.params;
    res.json(
      await Client.findByPk(clientId, {
        include: [{ model: Transaction, include: [Agent, Property] }],
      }).then(({ transactions }) => transactions)
    );
  } catch (err) {
    next(err);
  }
});

/**
 * POST /
 * Create Client for Agent
 */
router.post(
  "/:agentId",
  requireToken,
  isAgentOfUser,
  async (req, res, next) => {
    try {
      const client = await Client.create(req.body);
      const agent = await Agent.findByPk(req.agentId);
      await agent.addClient(client);
      res.json(client);
    } catch (err) {
      next(err);
    }
  }
);

/**
 * PUT /
 * Update Agent for logged in user
 */
router.put(
  "/agents-client/:agentId/:clientId",
  requireToken,
  isAgentOfUser,
  isClientOfAgent,
  async (req, res, next) => {
    try {
      const client = await Client.update(req.body, {
        where: { id: req.clientId },
        returning: true,
      });
      const [numUpdated, updatedClient] = client;
      res.json(updatedClient[0]);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
