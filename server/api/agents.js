/* eslint-disable no-unused-vars */
const router = require("express").Router();

const { OffcanvasTitle } = require("react-bootstrap");
const {
  Op,
  models: { User, Agent, Transaction, Client, Property },
} = require("../db");

const { requireToken, isAgentOfUser } = require("./middleware");

/**
 * GET /
 * All agents for logged in user
 */
router.get("/", requireToken, async (req, res, next) => {
  try {
    res.json(
      await User.findByPk(req.user.id, { include: [Agent] }).then(
        (user) => user.agents
      )
    );
  } catch (err) {
    next(err);
  }
});

/**
 * GET /:agentId
 * Agent by id for logged in user
 */
router.get("/:agentId", requireToken, isAgentOfUser, async (req, res, next) => {
  try {
    res.json(await Agent.findByPk(req.agentId));
  } catch (err) {
    next(err);
  }
});

/**
 * GET /:agentId/transactions
 * All transactions for a specific agent
 */
router.get(
  "/:agentId/transactions",
  requireToken,
  isAgentOfUser,
  async (req, res, next) => {
    try {
      res.json(
        await Agent.findByPk(req.agentId, {
          include: [{ model: Transaction, include: [Client, Property] }],
        }).then(async (agent) => agent.transactions)
      );
    } catch (err) {
      next(err);
    }
  }
);

/**
 * POST /
 * Create Agent for logged in user
 * Include brokerageId key in body to automatically add agent to Brokerage
 */
router.post("/", requireToken, async (req, res, next) => {
  try {
    const agent = await Agent.create(req.body);
    await req.user.addAgent(agent);
    await agent.reload();
    res.json(agent);
  } catch (err) {
    next(err);
  }
});

/**
 * PUT /
 * Update Agent for logged in user
 */
router.put("/:agentId", requireToken, isAgentOfUser, async (req, res, next) => {
  try {
    const agent = await Agent.update(req.body, {
      where: { id: req.agentId },
      returning: true,
    });
    const [numUpdated, updatedAgent] = agent;
    res.json(updatedAgent[0]);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
