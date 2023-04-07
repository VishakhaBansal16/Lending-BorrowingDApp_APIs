import mongoose from "mongoose";

const supplySchema = new mongoose.Schema({
  asset: { type: String },
  amount: { type: Number },
  from: { type: String },
  txHash: { type: String },
});

export const SupplyAsset = mongoose.model("SupplyAsset", supplySchema);
