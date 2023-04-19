import mongoose from "mongoose";

const borrowInfoSchema = new mongoose.Schema({
  account: { type: String },
  borrowAmount: { type: Number },
  lastAccureTime: { type: Number },
  interestAmount: { type: Number },
});

export const BorrowInfo = mongoose.model("BorrowInfo", borrowInfoSchema);
