import dotenv from "dotenv/config";
import { ethers } from "ethers";
import { assetsABI } from "../ABI/assetsABI.js";
import { logger } from "../logger.js";
export const initAllowance = async (owner, asset) => {
  const alchemyUrl = process.env.ALCHEMY_URL;
  const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);

  try {
    const contract = new ethers.Contract(asset, assetsABI, provider);
    const spender = "0x2f5B9748001556E69C9248f1649FA71332d7FF31"; //proxy contract address
    const allowance = await contract.allowance(owner, spender);
    const allowanceInInteger = parseInt(allowance, 10);
    const decimals = await contract.decimals();
    const _allowance = allowanceInInteger / 10 ** decimals;
    return _allowance;
  } catch (err) {
    logger.error(err);
    return "Allowance not found";
  }
};
