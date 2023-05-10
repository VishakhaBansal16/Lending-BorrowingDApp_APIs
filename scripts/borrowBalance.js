import dotenv from "dotenv/config";
import { ethers, BigNumber } from "ethers";
import { LBDappABI } from "../ABI/LBDappImplABI.js";
import { logger } from "../logger.js";
export const initBorrowBalance = async (account) => {
  try {
    const alchemyUrl = process.env.ALCHEMY_URL;
    const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);
    const proxyAddress = "0xCf8c523eED3a1c1ebDA2415B460e3B52D85e6b44";
    const contract = new ethers.Contract(proxyAddress, LBDappABI, provider);
    const balance = await contract.borrowBalanceOf(account);
    const balanceInInteger = parseInt(balance, 10);
    return balanceInInteger;
  } catch (err) {
    logger.error(err);
    return "Borrow balance not found";
  }
};
