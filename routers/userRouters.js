import express from "express";
import { insertUser } from "../models/user/UserModel.js";
import { hasspassword } from "../utils/bcrypt.js";

const router = express.Router();

// User signUP
router.post("/", async (req, res, next) => {
  try {
    //getthe userObj
    //data verifiacation
    //encrypt the password

    req.body.password = hasspassword(req.body.password);

    const user = await insertUser(req.body);
    user?._id
      ? res.json({
          status: "success",
          message: "Your account has been created, please login now",
        })
      : res.json({
          status: "error",
          message:
            "There has been an error creating your account, please try again later",
        });
  } catch (error) {
    let msg = error.message;
    if (msg.includes("E11000 duplicate key error collection:")) {
      msg = "Email already existed!! Try with new email";
    }
    res.json({
      status: "error",
      message: msg,
    });
  }
});
//user Login

// user Profile

export default router;
