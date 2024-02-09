import transactionSchema from "./transactionSchema.js";

// get all transactions for a legged in user [current user]
export const getTransactions = (userId) => {
  return transactionSchema.find({ userId })
}

// Create a transaction
export const createTransaction = (transObj) => {
  return transactionSchema(transObj).save()
}

//delete selected Ids

export const deleteSelectedIds = (selectedIds = []) => {
  return transactionSchema.deleteMany({ "_id": { $in: selectedIds } });
}