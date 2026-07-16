import transactionSchema from "./transactionSchema.js";

export const insertTransaction = (transactionObj) => {
  return transactionSchema(transactionObj).save();
};
