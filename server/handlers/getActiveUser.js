const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const getActiveUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI);
  try {
    await client.connect();
    const db = client.db("ImdbWorld");
    const foundActive = await db
      .collection("users")
      .findOne({ isActive: true });
    if (!foundActive) {
      return res.status(204).json({
        status: 204,
        message: `No user is active right now !!`,
      });
    }
    console.log(foundActive);
    return res.status(200).json({
      status: 200,
      data: foundActive,
      message: "Found active user!",
    });
  } catch (err) {
    console.log(err);
    return res
      .status(404)
      .json({ status: 404, message: "Unable to find active user !" });
  } finally {
    client.close();
    console.log("Disconnected");
  }
};

module.exports = getActiveUser;
