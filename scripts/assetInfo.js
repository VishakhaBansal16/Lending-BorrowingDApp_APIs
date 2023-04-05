import dotenv from "dotenv/config";
import { ethers } from "ethers";
import { implementationABI } from "../implementationABI.js";

export const initAssetInfo = async (address) => {
  const alchemyUrl = process.env.ALCHEMY_URL;
  const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);

  const implementationContractAddress =
    "0x6Cd33556D458aC78Cc17b55Eb75B17d23E4deE57";
  try {
    const implementationContract = new ethers.Contract(
      implementationContractAddress,
      implementationABI,
      provider
    );

    const responseArray = await implementationContract.getAssetInfoByAddress(
      address
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
    const responseObject = responseArray.reduce((obj, value, index) => {
      if (typeof value == "object" || value.type == "BigNumber") {
        obj[propertyNames[index]] = parseInt(value, 10);
      } else {
        obj[propertyNames[index]] = value;
      }
      return obj;
    }, {});

    return responseObject;
  } catch (err) {
    return "Asset info not found";
  }
};
