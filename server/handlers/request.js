const express = require("express");

const router = express.Router();

const dotenv = require("dotenv");

dotenv.config();

const { OAuth2Client } = require("google-auth-library");

router.post("/googleSignIn", async (req, res) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Referrer-Policy", "no-referrer-when-downgrade");

  const redirectUrl = "http://localhost:3000/oauth";

  const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    redirectUrl
  );

  const authorizedUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope:
      "https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/userinfo.email openid",
    prompt: "consent",
  });
  res.json({ url: authorizedUrl });
});

module.exports = router;
