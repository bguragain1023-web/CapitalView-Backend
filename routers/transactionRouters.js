import express from "express";
import { auth } from "../middleware/authMiddleware.js";
import {
  deleteTransactionById,
  getTransactionByUserId,
  insertTransaction,
  updateByTransactionId,
} from "../models/transaction/transactionModel.js";

const router = express.Router();

//add transaction
router.post("/", async (req, res, next) => {
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
  } catch (error) {
    next(error);
  }
});

// fetch Transaction
router.get("/", async (req, res, next) => {
  try {
    const { _id } = req.userInfo;

    const transaction = (await getTransactionByUserId(_id)) || [];

    res.json({
      status: "success",
      message: "here is your transaction",
      transaction,
    });
  } catch (error) {
    next(error);
  }
});

//Delete Transaction

router.delete("/", async (req, res, next) => {
  try {
    const ids = req.body;
    const { _id } = req.userInfo;

    const result = await deleteTransactionById(ids, _id);

    if (result.deletedCount === 0) {
      return res.status(404).json({
        status: "error",
        message: "No matching transaction found",
      });
    }
    res.json({
      status: "success",
      message: `${result.deletedCount} transaction(s) has been deleted`,
    });
  } catch (error) {
    next(error);
  }
});

//Update Transaction

router.patch("/:id", async (req, res, next) => {
  try {
    //get user id

    const userId = req.userInfo._id;

    const { id } = req.params;
    const result = await updateByTransactionId(id, userId, req.body);
    if (result.matchedCount === 0) {
      return res.status(404).json({
        status: "error",
        message: "Transaction not found ",
      });
    }

    //get transaction id
    // call update model
    //return success
    res.json({
      status: "success",
      message: "Transaction updated",
    });
  } catch (error) {
    next(error);
  }
});

export default router;
