/* eslint-disable no-unused-vars */
const router = require("express").Router();

const {
  Op,
  models: { User, Question, Tag },
} = require("../db");

const { requireToken, isAgentOfUser } = require("./middleware");

/**
 * GET /
 * All Questions
 */
router.get("/", async (req, res, next) => {
  try {
    res.json(await Question.findAll());
  } catch (err) {
    next(err);
  }
});

/**
 * GET /:questionId
 * Question with question ID
 */
router.get("/:questionId", async (req, res, next) => {
  try {
    const { questionId } = req.params;
    res.json(await Question.findByPk(questionId));
  } catch (err) {
    next(err);
  }
});

/**
 * GET /users
 * All questions created by User
 */
router.get("/users", requireToken, async (req, res, next) => {
  try {
    res.json(
      await User.findByPk(req.user.id, {
        include: [{ model: Question, include: [Tag] }],
      }).then((user) => user.questions)
    );
  } catch (err) {
    next(err);
  }
});

/**
 * POST /
 * Create Agent for logged in user
 * Include brokerageId key in body to automatically add agent to Brokerage
 */
router.post("/", requireToken, async (req, res, next) => {
  try {
    const question = await Agent.create(req.body);
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
