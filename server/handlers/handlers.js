const getMovie = require("./getMovie");
const addMovies = require("./addMovies");
const getActiveUser = require("./getActiveUser");
const setActiveUser = require("./setActiveUser");
const signOutActiveUser = require("./signOutActiveUser");
const addRating = require("./AddRating");
const removeRating = require("./removeRating");

module.exports = {
  getMovie,
  addMovies,
  getActiveUser,
  setActiveUser,
  signOutActiveUser,
  addRating,
  removeRating,
};
