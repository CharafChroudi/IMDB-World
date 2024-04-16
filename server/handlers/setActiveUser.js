const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const setActiveUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI);
  const user = req.body;
  try {
    await client.connect();
    const db = client.db("ImdbWorld");
    const userToBeActive = await db
      .collection("users")
      .findOne({ email: user.email });
    if (!userToBeActive) {
      return res.status(204).json({
        status: 204,
        message: `No user found to make active right now !!`,
      });
    }
    await db
      .collection("users")
      .updateOne({ email: userToBeActive.email }, { $set: { isActive: true } });
    return res.status(200).json({
      status: 200,
      message: "Active user is set!",
    });
  } catch (err) {
    console.log(err);
    return res
      .status(404)
      .json({ status: 404, message: "Unable to set active user !" });
  } finally {
    client.close();
    console.log("Disconnected");
  }
};

module.exports = setActiveUser;
