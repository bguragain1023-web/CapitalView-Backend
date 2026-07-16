import express from "express";
import { getUserByEmail, insertUser } from "../models/user/UserModel.js";
import { comparePassssword, hashpassword } from "../utils/bcrypt.js";
import { signJWT } from "../utils/jwt.js";
import { auth } from "../middleware/authMiddleware.js";
import { insertTransaction } from "../models/transaction/transactionModel.js";

const router = express.Router();

// User signUP
router.post("/", async (req, res, next) => {
  try {
    req.body.password = hashpassword(req.body.password);

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

router.post("/login", async (req, res, next) => {
  try {
    // receive email and password
    const { email, password } = req.body;

    if (email && password) {
      // find user by email

      const user = await getUserByEmail(email);
      if (user?._id) {
        const isMatched = comparePassssword(password, user.password);
        if (isMatched) {
          // jwt and store the jwt in db  then return the user{} with jwt
          const accessJWT = signJWT({ email: email });

          user.password = undefined;
          res.json({
            status: "success",
            message: " loggin successful",
            user,
            accessJWT,
          });
          return;
        }
      }
    }

    res.status(401).json({
      error: "Invalid email or password",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

router.get("/", auth, (req, res, next) => {
  try {
    const user = req.userInfo;

    res.json({
      status: "success",
      message: "here is the user profile",
      user,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});

//add transaction
router.post("/transaction", auth, async (req, res, next) => {
  console.log("req.body:", req.body);
  try {
    const user = req.userInfo;
    const { _id } = user;
    if (user?._id) {
      const obj = {
        ...req.body,
        userId: _id,
      };

      const transaction = await insertTransaction(obj);

      transaction
        ? res.json({
            status: "success",
            message: " transaction added successfully",
          })
        : res.json({
            status: "error",
            message: "something went wrong while adding transaction",
          });
      return;
    }
    res.json({
      status: "error",
      message: "User not found",
    });
    //check every item is filled
    // check if the user is there
    // send userId and transaction data to the transaction table
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});
// user Profile

export default router;
