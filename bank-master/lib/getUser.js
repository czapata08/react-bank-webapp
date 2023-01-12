import { getCookie } from "cookies-next";
import jwt from "jsonwebtoken";
import User from "../models/user";

export default async function getUser(req, res) {
  const token = getCookie("token", { req, res });

  try {
    const data = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log(`data from getUser: ${JSON.stringify(data)}`);
    let user = await User.findById(data.userId);
    user = JSON.parse(JSON.stringify(user));
    console.log("valid");
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}

//We will use the getUser function to verify the user. It takes in the req and res object
// and fetches the cookie.
//Then it verifies the token using the jwt.verify method.
//Then it fetches the user from the database using its id.
