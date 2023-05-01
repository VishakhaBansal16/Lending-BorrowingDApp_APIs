import dotenv from "dotenv/config";
import { ethers } from "ethers";
import { LBDappABI } from "../ABI/LBDappImplABI.js";
import { logger } from "../logger.js";
export const initBorrowableAmount = async (account) => {
  const alchemyUrl = process.env.ALCHEMY_URL;
  const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);
  const proxyContract = "0x2f5B9748001556E69C9248f1649FA71332d7FF31";

  try {
    const contract = new ethers.Contract(proxyContract, LBDappABI, provider);
    const amount = await contract.getBorrowableAmount(account);
    const borrowableAmount = parseInt(amount, 10);
    return borrowableAmount;
  } catch (err) {
    logger.error(err);
    return "Transaction object not found";
  }
};
