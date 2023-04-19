import mongoose from "mongoose";

const tokenInfoSchema = new mongoose.Schema({
  asset: { type: String },
  account: { type: String },
  depositAmount: { type: Number },
  supplyAmount: { type: Number },
  lastAccureTime: { type: Number },
});

export const TokenInfo = mongoose.model("TokenInfo", tokenInfoSchema);
