const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const addMovies = async (req, res) => {
  const client = new MongoClient(MONGO_URI);
  const moviesToAdd = req.body;
  try {
    await client.connect();
    const db = client.db("ImdbWorld");

    const existingMovies = await db.collection("movies").find().toArray();
    const existingTitles = existingMovies.map((movie) => movie.title);

    const newMovies = moviesToAdd.filter(
      (movie) => !existingTitles.includes(movie.title)
    );

    if (newMovies.length > 0) {
      await db.collection("movies").insertMany(newMovies);
    }
    const AllMovies = await db.collection("movies").find().toArray();
    res.status(201).json({
      status: 201,
      message: "movies have been added to db",
      data: AllMovies,
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: 404,
      message: "Error encountered while adding movies in the database !",
    });
  } finally {
    client.close();
    console.log("Disconnected");
  }
};

module.exports = addMovies;
