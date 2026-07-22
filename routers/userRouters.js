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
    if (error.message.includes("E11000 duplicate key error collection")) {
      error.message = "Email already existed!! Try with new email";
    }
    error.statusCode = 200;

    next(error);
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
    next(error);
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
    next(error);
  }
});

// user Profile

export default router;
