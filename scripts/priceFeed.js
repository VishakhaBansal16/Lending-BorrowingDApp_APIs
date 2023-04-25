import dotenv from "dotenv/config";
import { ethers, BigNumber } from "ethers";
import { LBDappABI } from "../ABI/LBDappImplABI.js";

export const initPriceFeed = async () => {
  const alchemyUrl = process.env.ALCHEMY_URL;
  const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);

  const proxyAddress = "0x39872F03eCCF551eCe1E7049bAB7003E6cc22BcC";

  const implementationContract = new ethers.Contract(
    proxyAddress,
    LBDappABI,
    provider
  );

  const result = [];
  let decimalPrice;
  //getting oracle price of all 4 listed assets
  for (let numAsset = 0; numAsset < 4; numAsset++) {
    const responseArray = await implementationContract.getAssetInfo(numAsset);
    const priceFeed = responseArray[2];
    const price = await implementationContract.getCompoundPrice(priceFeed);

    const priceInInteger = parseInt(price, 10);

    if (numAsset == 0) {
      decimalPrice = (priceInInteger / 10 ** 8).toFixed(8);
    }
    if (numAsset == 1) {
      decimalPrice = (priceInInteger / 10 ** 8).toFixed(8);
    }
    if (numAsset == 2) {
      decimalPrice = (priceInInteger / 10 ** 8).toFixed(8);
    }
    if (numAsset == 3) {
      decimalPrice = (priceInInteger / 10 ** 8).toFixed(8);
    }
    result.push(decimalPrice);
  }
  return result;
};
