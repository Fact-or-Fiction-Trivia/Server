const router = require("express").Router();

const {
  Op,
  models: { User, Article, Keyword },
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
    const data = await Article.findAndCountAll({
      include: [Keyword],
      order: [["created_at", "DESC"]],
      limit:
        "limit" in req.query
          ? typeof req.query.limit === "undefined"
            ? 20
            : parseInt(req.query.limit)
          : 20,
      offset:
        "offset" in req.query
          ? typeof req.query.offset === "undefined"
            ? 0
            : parseInt(req.query.offset)
          : 0,
    });
    res.send(data);
  } catch (e) {
    next(e);
  }
});

router.get("/:searchTerm", requireToken, async (req, res, next) => {
  try {
    const { searchTerm } = req.params;
    const data = await Article.findAll({
      where: {
        [Op.or]: {
          title: {
            [Op.regexp]: `(?i)${searchTerm}`,
          },
          ticker: {
            [Op.regexp]: `(?i)${searchTerm}`,
          },
        },
      },
      include: [Keyword],
      order: [["created_at", "DESC"]],
    });
    res.send(data);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
