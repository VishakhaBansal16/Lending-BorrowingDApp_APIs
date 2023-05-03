import dotenv from "dotenv/config";
import { ethers } from "ethers";
import { LBDappABI } from "../ABI/LBDappImplABI.js";
import { logger } from "../logger.js";
export const initBalanceOf = async (account) => {
  const alchemyUrl = process.env.ALCHEMY_URL;
  const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);

  const proxyAddress = "0x2f5B9748001556E69C9248f1649FA71332d7FF31";

  try {
    const contract = new ethers.Contract(proxyAddress, LBDappABI, provider);

    const balance = await contract.balanceOf(account);
    const balanceInInt = parseInt(balance, 10);
    return balanceInInt;
  } catch (err) {
    logger.error(err);
    return "Balance not found";
  }
};
