import dbConnect from "../../services/dbConnect";
import User from "../../models/user";
import { UnorderedBulkOperation } from "mongodb";
// import jwt from "jsonwebtoken";
// import { getCookie, setCookie } from "cookies-next";
// import { verifyPassword } from "../../lib/auth";

export default async function handler(req, res) {
  await dbConnect();
  const { _id, deposit } = req.body;

  //find reciever acc number and get balance and update to new balance
  if (req.method === "POST") {
    console.log(
      `id: ${_id} --- depositAmount${deposit} --- typeofDeposit: ${typeof deposit}`
    );
    User.updateOne(
      {
        id: _id,
      },

      {
        $set: { balance: Number(deposit) },
      },

      {
        returnDocument: "after",
        projection: { password: 0 },
      },
      function (err, docs) {
        if (err) {
          res(err);
          console.log(err);
        } else {
          res(docs);
          console.log("Updated Docs : ", docs);
        }
      }
    );
  }
}
