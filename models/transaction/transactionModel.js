import transactionSchema from "./transactionSchema.js";

//insert
export const insertTransaction = (transactionObj) => {
  return transactionSchema(transactionObj).save();
};
