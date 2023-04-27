import dotenv from "dotenv/config";
import { ethers } from "ethers";
import { assetsABI } from "../ABI/assetsABI.js";
import { logger } from "../logger.js";
export const initAllowance = async (owner, asset) => {
  const alchemyUrl = process.env.ALCHEMY_URL;
  const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);

  try {
    const contract = new ethers.Contract(asset, assetsABI, provider);
    const spender = "0x39872F03eCCF551eCe1E7049bAB7003E6cc22BcC"; //proxy contract address
    const allowance = await contract.allowance(owner, spender);
    const allowanceInDecimal = parseInt(allowance, 10);
    return allowanceInDecimal;
  } catch (err) {
    logger.error(err);
    return "Allowance not found";
  }
};
