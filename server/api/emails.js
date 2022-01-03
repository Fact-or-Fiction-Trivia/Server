/* eslint-disable no-unused-vars */
const router = require("express").Router();
const mailer = require("../../mailer/email");
const getBase = require("../utils/getBase");
const crypto = require("crypto");
const {
  models: { User, Permission },
} = require("../db");

const requireAdmin = async (req, res, next) => {
  try {
    req.user = await User.isAdmin(req.cookies.token, { include: [Permission] });
    next();
  } catch (e) {
    next(e);
  }
};

router.post("/invitations", requireAdmin, async (req, res, next) => {
  try {
    const { to } = req.body;
    // const invited = await User.findOrCreate()

    const [invited, created] = await User.findOrCreate({
      where: { email: to },
      defaults: {
        role: "User",
        status: "Pending",
        password: "Fuck",
      },
    });
    const inviteId = invited.generateInviteId();
    const text = `This link will expire in 10 minutes: ${getBase()}invite/id?inviteId=${inviteId}`;
    const message = await mailer({
      to,
      subject: "Press Vector Invitation",
      text,
    });
    res.send(message);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
