import dotenv from "dotenv/config";
import { ethers } from "ethers";
import { LBDappABI } from "../ABI/LBDappImplABI.js";
import { assetsABI } from "../ABI/assetsABI.js";
import { logger } from "../logger.js";
export const initQuoteCollateral = async (asset, baseAmount) => {
  const alchemyUrl = process.env.ALCHEMY_URL;
  const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);

  const proxyAddress = "0xCf8c523eED3a1c1ebDA2415B460e3B52D85e6b44";

  try {
    const contract = new ethers.Contract(proxyAddress, LBDappABI, provider);
    const _baseAmount = baseAmount * 10 ** 6;
    const amount = await contract.quoteCollateral(asset, _baseAmount);
    const amountInInt = parseInt(amount, 10);
    const assetContract = new ethers.Contract(asset, assetsABI, provider);
    const decimals = await assetContract.decimals();
    const exactAmount = amountInInt / 10 ** decimals;
    return exactAmount;
  } catch (err) {
    logger.error(err);
    return "Amount not found";
  }
};
