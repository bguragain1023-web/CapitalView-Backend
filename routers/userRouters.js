import express from "express";
import { insertUser } from "../models/user/UserModel.js";

const router = express.Router();

// User signUP
router.post("/", async (req, res, next) => {
  try {
    //getthe userObj
    //data verifiacation
    //encrypt the password
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
    res.json({
      status: "error",
      message: error.message,
    });
  }
});
//user Login

// user Profile

export default router;
