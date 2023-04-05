import dotenv from "dotenv/config";
import { ethers } from "ethers";
import { implementationABI } from "../implementationABI.js";

export const initAllAssetsInfo = async () => {
  const alchemyUrl = process.env.ALCHEMY_URL;
  const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);

  const implementationContractAddress =
    "0x6Cd33556D458aC78Cc17b55Eb75B17d23E4deE57";

  const implementationContract = new ethers.Contract(
    implementationContractAddress,
    implementationABI,
    provider
  );

  const propertyNames = [
    "offset",
    "asset",
    "priceFeed",
    "scale",
    "borrowCollateralFactor",
    "liquidateCollateralFactor",
    "liquidationFactor",
    "supplyCap",
  ];
  let responseObject;
  const result = [];
  //getting details of all 4 listed assets
  for (let numAsset = 0; numAsset < 4; numAsset++) {
    const responseArray = await implementationContract.getAssetInfo(numAsset);
    responseObject = responseArray.reduce((obj, value, index) => {
      if (typeof value == "object" || value.type == "BigNumber") {
        obj[propertyNames[index]] = parseInt(value, 10);
      } else {
        obj[propertyNames[index]] = value;
      }
      return obj;
    }, {});
    result.push(responseObject);
  }

  return result;
};
