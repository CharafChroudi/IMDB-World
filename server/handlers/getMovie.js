const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const getMovie = async (req, res) => {
  const client = new MongoClient(MONGO_URI);
  const { id } = req.params;
  try {
    await client.connect();
    const db = client.db("ImdbWorld");
    const query = { id: Number(id) };
    const foundMovie = await db.collection("movies").findOne(query);
    if (!foundMovie) {
        res.status(404).json({
          status: 404,
          message: `Unable to find a movie with id: ${id}.`,
        });
      } else {
        res.status(200).json({
          status: 200,
          data: foundMovie,
          message: "Found movie!",
        });
      }
  } catch (err) {
    console.log(err);
    res.status(404).json({
        status: 404,
        message: "Unable to find the movie you were looking for!",
      });
  } finally {
    client.close();
    console.log("Disconnected");
  }
};

module.exports = getMovie;
