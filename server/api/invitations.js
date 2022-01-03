const router = require("express").Router();

const {
  models: { User },
} = require("../db");

router.get("/", async (req, res, next) => {
  try {
    const { inviteId } = req.query;
    console.log(req.query);
    const user = await User.validateInvitation(inviteId);
    res.send(user);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
