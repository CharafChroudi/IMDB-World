"use strict";
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const passport = require("passport");
const cookieSession = require("cookie-session");

const passportSetup = require("./passport");
const authRoute = require("./handlers/auth");

const { getMovies } = require("./handlers/handlers");
express()
  .use(morgan("tiny"))
  .use(express.json())

  .use(express.static("public"))

  .use(
    cookieSession({
      name: "session",
      keys: ["Charaf"],
      maxAge: 24 * 60 * 60 * 100,
    })
  )
  .use(passport.initialize())
  .use(passport.session())
  .use(
    cors({
      origin: "http://localhost:3000/",
      methods: "GET,POST,PUT,DELETE",
      credentials: true,
    })
  )
  .use("/auth", authRoute)
  .get("/movies", getMovies)

  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  .listen(8000, () => console.log(`Listening on port 8000`));
