import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";
export default async (req, res) => {
  const { senderId, recieverId, transferAmount } = req.body;
  try {
    const client = await clientPromise;
    const db = client.db("test");

    const reciever = await db.collection("users").findOneAndUpdate(
      { _id: ObjectId(recieverId) },
      {
        $inc: { "accounts.balance": +transferAmount },
        $currentDate: { lastModified: true },
      },
      {
        returnDocument: "after",
        projection: { password: 0 },
      }
    );
    console.log(reciever);

    const sender = await db.collection("users").findOneAndUpdate(
      { _id: ObjectId(senderId) },
      {
        $inc: { "accounts.balance": -transferAmount },
        $currentDate: { lastModified: true },
      },
      {
        returnDocument: "after",
        projection: { password: 0 },
      }
    );
    console.log(sender);

    if (!reciever)
      return res.status(422).json({ message: "reciever not found" });

    if (!sender) return res.status(422).json({ message: "error with sender" });

    res.json(sender);
    console.log(`result= ${JSON.stringify(sender)}`);
  } catch (e) {
    console.error(e);
  }
};
