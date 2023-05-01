import dotenv from "dotenv/config";
import { ethers } from "ethers";
import { LBDappABI } from "../ABI/LBDappImplABI.js";
import { logger } from "../logger.js";
export const initPriceFeed = async () => {
  const alchemyUrl = process.env.ALCHEMY_URL;
  const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);

  const proxyAddress = "0x2f5B9748001556E69C9248f1649FA71332d7FF31";
  try {
    const contract = new ethers.Contract(proxyAddress, LBDappABI, provider);
    const result = [];

    //getting oracle price of all 4 listed assets
    for (let numAsset = 0; numAsset < 4; numAsset++) {
      const responseArray = await contract.getAssetInfo(numAsset);
      const priceFeed = responseArray[2];
      const price = await contract.getCompoundPrice(priceFeed);
      const priceInInteger = parseInt(price, 10);
      const decimalPrice = (priceInInteger / 10 ** 8).toFixed(8);
      result.push(decimalPrice);
    }

    return result;
  } catch (err) {
    logger.error(err);
    return "Prices not found";
  }
};
