import mongoose from "mongoose";

const borrowSchema = new mongoose.Schema({
  asset: { type: String },
  amount: { type: Number },
  from: { type: String },
});

export const BorrowAsset = mongoose.model("BorrowAsset", borrowSchema);
