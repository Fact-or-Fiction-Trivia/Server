const router = require("express").Router();

const {
  models: { User, Keyword, Article },
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
    const keywords = await Keyword.findAll({
      order: [["updatedAt", "DESC"]],
      include: [Article],
    });
    res.json(keywords);
  } catch (err) {
    next(err);
  }
});
router.post("/", requireToken, async (req, res, next) => {
  try {
    const { content, type } = req.body;
    await Keyword.create({ content, type }, { returning: true });
    const keywords = await Keyword.findAll({
      order: [["updatedAt", "DESC"]],
      include: [Article],
    });
    res.json(keywords);
  } catch (err) {
    next(err);
  }
});

router.delete("/:keywordId", requireToken, async (req, res, next) => {
  try {
    const { keywordId } = req.params;
    await Keyword.destroy({ where: { id: keywordId } });
    const keywords = await Keyword.findAll({
      order: [["updatedAt", "DESC"]],
      include: [Article],
    });
    res.json(keywords);
  } catch (err) {
    next(err);
  }
});

router.put("/:keywordId", requireToken, async (req, res, next) => {
  try {
    const { keywordId } = req.params;
    const { content, type } = req.body;
    await Keyword.update({ content, type }, { where: { id: keywordId } });
    const keywords = await Keyword.findAll({
      order: [["updatedAt", "DESC"]],
      include: [Article],
    });
    res.json(keywords);
  } catch (err) {
    next(err);
  }
});
