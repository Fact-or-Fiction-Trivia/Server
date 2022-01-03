const router = require("express").Router();

router.use("/feed", require("./feed"));
router.use("/users", require("./users"));
router.use("/permissions", require("./permissions"));
router.use("/keywords", require("./keywords"));
router.use("/emails", require("./emails"));
router.use("/invitations", require("./invitations"));
router.use("/articles", require("./articles"));
router.use("/transactions", require("./transactions"));
router.use("/agents", require("./agents"));
router.use("/clients", require("./clients"));

router.use((req, res, next) => {
  const err = new Error("API route not found!");
  err.status = 404;
  next(err);
});

module.exports = router;
