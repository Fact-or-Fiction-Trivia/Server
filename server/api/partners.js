/* eslint-disable no-unused-vars */
const router = require("express").Router();

const {
  Op,
  models: { User },
} = require("../db");

const requireToken = async (req, res, next) => {
  try {
    req.user = await User.findByToken(req.cookies.token);
    next();
  } catch (e) {
    next(e);
  }
};

router.get("/", requireToken, async (req, res, next) => {
  try {
    res.send(200);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
