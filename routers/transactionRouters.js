import express from "express";
import { auth } from "../middleware/authMiddleware.js";
import {
  getTransactionByUserId,
  insertTransaction,
} from "../models/transaction/transactionModel.js";

const router = express.Router();

//add transaction
router.post("/", async (req, res, next) => {
  console.log(req.body);
  try {
    const { _id } = req.userInfo;

    if (_id) {
      const obj = {
        ...req.body,
        userId: _id,
      };

      const transaction = await insertTransaction(obj);

      transaction?._id
        ? res.json({
            status: "success",
            message: " New transaction added successfully",
          })
        : res.json({
            status: "error",
            message:
              "Something went wrong while adding transaction!! Try again later",
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

//get transaction

router.get("/", async (req, res, next) => {
  try {
    const { _id } = req.userInfo;
    console.log("id is :", _id);

    const transaction = await getTransactionByUserId(_id);
    console.log("answer", transaction);

    res.json({
      status: "success",
      message: "here is your transaction",
      transaction,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
});
export default router;
