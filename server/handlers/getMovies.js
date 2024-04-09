const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const getMovies = async (req, res) => {
  const client = new MongoClient(MONGO_URI);

  try {
    await client.connect();
    console.log("Connected");
    if (!foundProducts) {
      res.status(404).json({
        status: 404,
        message: `Unable to find the products !!`,
      });
    }
    res.status(200).json({
      status: 200,
      data: foundProducts,
      message: "Found items!",
    });
  } catch (err) {
    console.log(err);
    res
      .status(404)
      .json({ status: 404, message: "Unable to find the items !" });
  } finally {
    client.close();
    console.log("Disconnected");
  }
};

module.exports = getMovies;
