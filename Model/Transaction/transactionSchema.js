import mongoose, { mongo } from "mongoose";

const transactionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  }
})

// binds/define transactionSchema with transactions table in db
export default mongoose.model("transaction", transactionSchema)