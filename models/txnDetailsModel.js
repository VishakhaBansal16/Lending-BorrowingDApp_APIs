import mongoose from "mongoose";

const txnDetailsSchema = new mongoose.Schema({
  txnType: { type: String },
  asset: { type: String },
  amount: { type: Number },
  from: { type: String },
  txHash: { type: String },
});

export const TxnDetails = mongoose.model("TxnDetails", txnDetailsSchema);
