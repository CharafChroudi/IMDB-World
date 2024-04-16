const { MongoClient } = require("mongodb");

require("dotenv").config();
const { MONGO_URI } = process.env;

const signOutActiveUser = async (req, res) => {
  const client = new MongoClient(MONGO_URI);
  const { email } = req.body;
  try {
    await client.connect();
    const db = client.db("ImdbWorld");
    const userToBeLoggedOut = await db
      .collection("users")
      .findOne({ email: email });
    if (!userToBeLoggedOut) {
      return res.status(204).json({
        status: 204,
        message: `No user is active right now to logout !!`,
      });
    }
    await db
      .collection("users")
      .updateOne(
        { email: userToBeLoggedOut.email },
        { $set: { isActive: false } }
      );
    return res.status(200).json({
      status: 200,
      message: "User successfully logged out!",
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

module.exports = signOutActiveUser;
