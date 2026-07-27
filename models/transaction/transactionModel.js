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

//delete

export const deleteTransactionById = (ids, userId) => {
  if (!ids || ids.length === 0) {
    throw new Error("No transaction found");
  }

  return transactionSchema.deleteMany({
    _id: { $in: ids },
    userId: userId,
  });
};

export const updateByTransactionId = (id, userId, data) => {
  if (!id) {
    throw new Error("No Transaction Found ");
  }

  return transactionSchema.updateOne(
    {
      _id: id,
      userId: userId,
    },
    { $set: data },
  );
};
