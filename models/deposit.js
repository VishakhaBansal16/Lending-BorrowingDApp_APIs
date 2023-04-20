import mongoose from "mongoose";

const depositSchema = new mongoose.Schema({
  txnType: { type: String },
  to: { type: String },
  amount: { type: Number },
  //txHash: { type: String },
});

export const Deposit = mongoose.model("Deposit", depositSchema);
