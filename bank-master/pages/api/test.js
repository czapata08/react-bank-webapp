import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";
export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("test");

    const queryValue = {
      _id: new ObjectId(req.body._id),
    };

    const update = {
      $set: { "accounts.balance": req.body.deposit },
      $currentDate: { lastModified: true },
    };

    const data = await db.collection("users").updateOne(queryValue, update);
    console.log(data);
    console.log(`success data was submitted`);
    res.json(data);
  } catch (e) {
    console.error(e);
  }
};
