const express = require("express");

const { MongoClient } = require("mongodb");

const router = express.Router();

const dotenv = require("dotenv");

dotenv.config();

const { MONGO_URI } = process.env;

const { OAuth2Client } = require("google-auth-library");

const getUserData = async (access_token) => {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
  );
  const data = await response.json();
  return data;
};

router.get("/", async (req, res) => {
  const client = new MongoClient(MONGO_URI);
  const code = req.query.code;
  try {
    await client.connect();
    console.log("connected to MongoDB");
    const db = client.db("ImdbWorld");
    const redirectUrl = "http://localhost:3000/oauth";
    const oAuth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      redirectUrl
    );
    const response = await oAuth2Client.getToken(code);
    console.log(response);
    await oAuth2Client.setCredentials(response.tokens);
    console.log("Token acquired");

    const user = oAuth2Client.credentials;
    const userData = await getUserData(user.access_token);
    console.log(userData);
    const userToBeAdded = {
      ...userData,
      isActive: true,
      userRatings: [],
    };
    const existingUser = await db
      .collection("users")
      .findOne({ email: userToBeAdded.email });
    if (existingUser) {
      return res.status(200).json({
        status: 200,
        data: existingUser,
        message: "User already exists",
      });
    } else {
      await db.collection("users").insertOne(userToBeAdded);
      const addedUser = await db
        .collection("users")
        .findOne({ email: userToBeAdded.email });
      return res.status(200).json({
        status: 200,
        data: addedUser,
        message: "New user signed up",
      });
    }
  } catch (err) {
    console.log("Error signing in with google");
    res.status(500).json({
      status: 500,
      message: "Internal server error",
    });
  } finally {
    await client.close();
  }
});

module.exports = router;
