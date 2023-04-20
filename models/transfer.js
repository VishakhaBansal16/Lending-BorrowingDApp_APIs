import mongoose from "mongoose";

const transferSchema = new mongoose.Schema({
  txnType: { type: String },
  from: { type: String },
  to: { type: String },
  amount: { type: Number },
  //txHash: { type: String },
});

export const Transfer = mongoose.model("Transfer", transferSchema);
