import dotenv from "dotenv/config";
import { ethers, BigNumber } from "ethers";
import { LBDappABI } from "../ABI/LBDappImplABI.js";

export const initPriceFeed = async () => {
  const alchemyUrl = process.env.ALCHEMY_URL;
  const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);

  const proxyAddress = "0x5D1fd78f04Ac6dAAdC640dE031bd0ec33A5ab511";

  // try {
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
    const price = await implementationContract.getPrice(priceFeed); // 99980000

    const priceInInteger = parseInt(price, 10);

    if (numAsset == 0) {
      decimalPrice = (priceInInteger / 10 ** 8).toFixed(8);
    }
    if (numAsset == 1) {
      decimalPrice = (priceInInteger / 10 ** 12).toFixed(12);
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
