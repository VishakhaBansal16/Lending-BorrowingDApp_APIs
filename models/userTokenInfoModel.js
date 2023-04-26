import mongoose from "mongoose";

const tokenInfoSchema = new mongoose.Schema({
  account: { type: String },
  compSupplyAmount: { type: Number },
  wbtcSupplyAmount: { type: Number },
  wethSupplyAmount: { type: Number },
  linkSupplyAmount: { type: Number },
});

export const TokenInfo = mongoose.model("TokenInfo", tokenInfoSchema);
