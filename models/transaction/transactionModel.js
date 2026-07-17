import transactionSchema from "./transactionSchema.js";

//insert
export const insertTransaction = (transactionObj) => {
  return transactionSchema(transactionObj).save();
};

//get

export const getTransactionByUserId = (userId) => {
  return transactionSchema.find({ userId });
};
