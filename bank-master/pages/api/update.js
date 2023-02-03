//find user by id

//get all values to change from request body

//get match all values by looping over the values from request

//create dynamic logic to find values in database and update
// import clientPromise from "../../lib/mongodb";

// export default async function handler(req, res) {
//   try {
//     const client = await clientPromise;
//     const db = client.db("test");
//     const user = req.body;
//     console.log(`req.body values: ${JSON.stringify(user)}`);

//     const findUser = { id: user._id };
//     //if id is not found return (error)

//     //get all updater in an object with key: value pairs
//     const updater = req.body.updater;
//     console.log(`updater object: ${updater}`);

//     //get all keys
//     const queryValues = Object.values(updater);
//     console.log(queryValues);
//     const queryKeys = Object.keys(updater);
//     console.log(queryKeys);

//     const updaterValues = {
//       $set: { updater },
//       $currentDate: { lastModified: true },
//     };
//     console.log(updaterValues);

//     const updateProfile = await db
//       .collection("users")
//       .updateMany(findUser, updaterValues);
//     console.log(`profile updated${JSON.stringify(updateProfile)}`);
//     res.json(updateProfile);
//   } catch (e) {
//     console.error(e);
//   }
// }

// //expected req object as follow
// const updater = {
//   _id: _id,
//   updater: {},
// };

// import dbConnect from "../../services/dbConnect";
// import User from "../../models/user";
// import jwt from "jsonwebtoken";
// import { getCookie, setCookie } from "cookies-next";
// import { verifyPassword } from "../../lib/auth";

import clientPromise from "../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async (req, res) => {
  try {
    const client = await clientPromise;
    const db = client.db("test");
    const { username, email } = req.body.updater;

    const queryValue = {
      _id: new ObjectId(req.body._id),
    };

    const update = {
      ...(username && { username }),
      ...(email && { email }),
    };

    const result = await db
      .collection("users")
      .findOneAndUpdate(
        queryValue,
        { $set: update },
        { returnDocument: "after", projection: { password: 0 } }
      );
    console.log(JSON.stringify(result));
    res.json(result);
  } catch (e) {
    console.error(e);
  }
};
