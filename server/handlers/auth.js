const router = require("express").Router();

const passport = require("passport");

router.get("/login/success", (req, res) => {
  if (req.user) {
    res
      .status(200)
      .json({ status: 200, message: "successfully logged in", user: req.user });
  }
  res.status(403).json({
    status: 403,
    message: "Not authorized",
  });
});

router.get("/login/failed", (req, res) => {
  res.status(401).json({
    status: 401,
    message: "failed to login",
  });
});
router.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.CLIENT_URL,
    failureRedirect: "/login/failed",
  })
);

router.get("/google", passport.authenticate("google", ["profile", "email"]));

router.get("/logout", (req, res) => {
  req.logout();
  req.redirect(process.env.CLIENT_URL);
});

module.exports = router;
