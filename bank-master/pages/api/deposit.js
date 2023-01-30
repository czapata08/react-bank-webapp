import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";
export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("test");

    const data = await db.collection("users").findOneAndUpdate(
      {
        _id: new ObjectId(req.body._id),
      },
      {
        $set: { "accounts.balance": req.body.deposit + req.body.balance },
        $currentDate: { lastModified: true },
      },
      {
        returnDocument: "after",
        projection: { password: 0 },
      }
    );
    res.json(data);
    console.log(`result= ${JSON.stringify(data)}`);
  } catch (e) {
    console.error(e);
  }
};
