import mongoose from "mongoose";

const borrowInfoSchema = new mongoose.Schema({
  account: { type: String },
  wbtcBorrowAmount: { type: Number },
  wethBorrowAmount: { type: Number },
  linkBorrowAmount: { type: Number },
});

export const BorrowInfo = mongoose.model("BorrowInfo", borrowInfoSchema);
