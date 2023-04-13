import dotenv from "dotenv/config";
import { ethers } from "ethers";
import { implementationABI } from "../ABI/implementationABI.js";

export const initAssetInfo = async (address) => {
  const alchemyUrl = process.env.ALCHEMY_URL;
  const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);

  const proxyAddress = "0xF09F0369aB0a875254fB565E52226c88f10Bc839";

  try {
    const implementationContract = new ethers.Contract(
      proxyAddress,
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
