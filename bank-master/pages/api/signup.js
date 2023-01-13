import dbConnect from "../../public/services/dbConnect";
import User from "../../models/user";
import jwt from "jsonwebtoken";
import cookie from "cookie";
import { setCookies } from "cookies-next";
import bcrypt from "bcryptjs";
const db = require("../../models");
//role collection
const Role = db.role;

export default async function handler(req, res) {
  await dbConnect();

  //define all skema variables
  const { name, email, password } = req.body;

  if (req.method === "POST") {
    const userExist = await User.findOne({ email });

    if (userExist)
      return res.status(422).json({ message: "Email already in use!" });

    const accountNumber = Math.trunc(Number(Math.random() * 9090909009));

    const accObject = {
      name: "Checking",
      accountNumber: "0001" + accountNumber,
      balance: 100,
    };

    const user = new User({
      name: name,
      email: email,
      password: bcrypt.hashSync(password, 8),
      accounts: accObject,
    });
    await user.save();

    const token = jwt.sign({ userId: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map((role) => role._id);
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      () =>
        Role.findOne({ name: "user" }, (err, role) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = [role._id];
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
            console.log(`user sucessfully pushed to db with role`);
            res.send({ message: "User was registered successfully!" });
          });
        });
    }

    setCookies("token", token, {
      req,
      res,
      maxAge: 60 * 60 * 24, // 1 day
      path: "/",
    });

    res.status(201).json(user);
  } else {
    res.status(424).json({ message: "Invalid method!" });
  }
}
