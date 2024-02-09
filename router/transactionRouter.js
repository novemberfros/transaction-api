import express from "express"
import { createTransaction, deleteSelectedIds, getTransactions } from "../Model/Transaction/transactionModel.js"
import { buildErrorResponse, buildSuccessResponse } from "../utility/responseHelper.js"
import { userAuth } from "../middleware/authMiddleware.js"

const transactionRouter = express.Router()

// get all transaction
transactionRouter.get("/", userAuth, async(req,res) => {
  try {
    //call the query
    const result = await getTransactions(req.userId)

    result
      ? buildSuccessResponse(res, result)
      : buildErrorResponse(res, "Cannot fetch transactions")
  } catch (error) {
    buildErrorResponse(res, error.message)
  }
})

// create a  transaction
transactionRouter.post("/", userAuth, async(req,res) => {
  try {
    //call the query
    const transactionObj = {
      ...req.body,
      userId: req.userId
    }
    const result = await createTransaction(transactionObj)

    result?._id
      ? buildSuccessResponse(res, result, "Transaction Created!")
      : buildErrorResponse(res, "Cannot create transaction")
  } catch (error) {
    buildErrorResponse(res, error.message)
  }
})

// delete a  transaction
transactionRouter.delete("/", userAuth, async(req,res) => {
  try {
    //call the query
    const { selectedIds } = req.body
    const result = await deleteSelectedIds(selectedIds)

    result?.acknowledged
      ? buildSuccessResponse(res, result.deletedCount, "Transaction Deleted!")
      : buildErrorResponse(res, "Cannot delete transaction")
  } catch (error) {
    buildErrorResponse(res, error.message)
  }
})

export default transactionRouter