const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const removeRating = async (req, res) => {
  const client = new MongoClient(MONGO_URI);
  const { user } = req.body;
  try {
    await client.connect();
    const db = client.db("ImdbWorld");

    const foundUser = await db
      .collection("users")
      .findOne({ email: user.email });

    await db
      .collection("users")
      .updateOne({ email: foundUser.email }, { $set: { userRatings: user.ratings } });

    res.status(200).json({
      status: 200,
      message: "rating have been removed from the user ratings list in db",
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: 404,
      message: "Error encountered while removing the rating in the database !",
    });
  } finally {
    client.close();
    console.log("Disconnected");
  }
};

module.exports = removeRating;
