const router = require("express").Router();

const {
  models: { User, Permission },
} = require("../db");
module.exports = router;

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
    const permissions = await Permission.findAll();
    res.json(permissions);
  } catch (err) {
    next(err);
  }
});
router.get("/me", requireToken, async (req, res, next) => {
  try {
    const permissions = req.user;
    // await Permission.findAll();
    console.log(permissions);
    res.json(permissions);
  } catch (err) {
    next(err);
  }
});
router.put("/:userId", requireToken, async (req, res, next) => {
  try {
    console.log("BODY", req.body);
    const permissions = req.body;
    const { userId } = req.params;
    const user = await User.findByPk(userId);
    Object.values(permissions).forEach((value) => {
      const { checked, id } = value;
      if (checked) {
        user.addPermission(id);
      } else {
        user.removePermission(id);
      }
    });
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
});
