import dotenv from "dotenv/config";
import { ethers } from "ethers";
import { LBDappABI } from "../ABI/LBDappImplABI.js";
import { logger } from "../logger.js";
export const initPriceFeed = async () => {
  const alchemyUrl = process.env.ALCHEMY_URL;
  const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);

  const proxyAddress = "0xCf8c523eED3a1c1ebDA2415B460e3B52D85e6b44";
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
