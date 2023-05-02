import dotenv from "dotenv/config";
import { ethers } from "ethers";
import { logger } from "../logger.js";
import { assetsABI } from "../ABI/assetsABI.js";
export const initDecimals = async (asset) => {
  const alchemyUrl = process.env.ALCHEMY_URL;
  const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);
  try {
    const contract = new ethers.Contract(asset, assetsABI, provider);
    const decimals = await contract.decimals();
    return decimals;
  } catch (err) {
    logger.error(err);
    return "Invalid asset address";
  }
};
