import dotenv from "dotenv/config";
import { ethers } from "ethers";
import { LBDappABI } from "../ABI/LBDappImplABI.js";
import { logger } from "../logger.js";
export const initAssetInfo = async (address) => {
  const alchemyUrl = process.env.ALCHEMY_URL;
  const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);

  const proxyAddress = "0xCf8c523eED3a1c1ebDA2415B460e3B52D85e6b44";

  try {
    const contract = new ethers.Contract(proxyAddress, LBDappABI, provider);

    const responseArray = await contract.getAssetInfoByAddress(address);

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
    logger.error(err);
    return "Asset info not found";
  }
};
