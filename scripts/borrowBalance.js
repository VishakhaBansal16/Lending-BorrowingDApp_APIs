import dotenv from "dotenv/config";
import { ethers, BigNumber } from "ethers";
import { LBDappABI } from "../ABI/LBDappImplABI.js";
import { logger } from "../logger.js";
export const initBorrowBalance = async (account) => {
  try {
    const alchemyUrl = process.env.ALCHEMY_URL;
    const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);
    const proxyAddress = "0x2f5B9748001556E69C9248f1649FA71332d7FF31";
    const contract = new ethers.Contract(proxyAddress, LBDappABI, provider);
    const balance = await contract.borrowBalanceOf(account);
    const balanceInInteger = parseInt(balance, 10);
    return balanceInInteger;
  } catch (err) {
    logger.error(err);
    return "Borrow balance not found";
  }
};
