import transactionSchema from "./transactionSchema.js";

//insert
export const insertTransaction = (transactionObj) => {
  return transactionSchema(transactionObj).save();
};

//get

export const getTransactionByUserId = (userId) => {
  if (!userId) {
    throw new Error("user id required");
  }
  return transactionSchema.find({ userId });
};
