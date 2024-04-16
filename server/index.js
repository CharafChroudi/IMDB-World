"use strict";
const express = require("express");
const morgan = require("morgan");

const authRouter = require("./handlers/oauth");
const requestRouter = require("./handlers/request");
const PORT = 8000;

const {
  addMovies,
  getActiveUser,
  setActiveUser,
  getMovie,
  signOutActiveUser,
  addRating,
  removeRating,
} = require("./handlers/handlers");

express()
  .use(morgan("tiny"))
  .use(express.json())

  .use(express.static("public"))
  .use("/oauth", authRouter)
  .use("/request", requestRouter)

  .get("/getMovie/:id", getMovie)
  .post("/addMovies", addMovies)
  .get("/activeUser", getActiveUser)
  .patch("/changeActiveUser", setActiveUser)
  .patch("/signOutUser", signOutActiveUser)
  .patch("/rating", addRating)
  .patch("/removeRating", removeRating)
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  .listen(PORT, () => console.log(`Listening on port ${PORT}`));
