import mongoose from "mongoose";

const approvalSchema = new mongoose.Schema({
  txnType: { type: String },
  from: { type: String },
  to: { type: String },
  amount: { type: Number },
  txHash: { type: String },
});

export const Approval = mongoose.model("Approval", approvalSchema);
