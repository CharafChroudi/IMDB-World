const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const addRating = async (req, res) => {
  const client = new MongoClient(MONGO_URI);
  const { user } = req.body;
  console.log(user);
  try {
    await client.connect();
    const db = client.db("ImdbWorld");

    const foundUser = await db
      .collection("users")
      .findOne({ email: user.email });

    await db
      .collection("users")
      .updateOne({ email: foundUser.email }, { $set: { userRatings: user.ratings } });

    res.status(201).json({
      status: 201,
      message: "rating have been added to user ratings list in db",
    });
  } catch (err) {
    console.log(err);
    res.status(404).json({
      status: 404,
      message: "Error encountered while adding the rating in the database !",
    });
  } finally {
    client.close();
    console.log("Disconnected");
  }
};

module.exports = addRating;
