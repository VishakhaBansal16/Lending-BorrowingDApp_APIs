import dotenv from "dotenv/config";
import { ethers } from "ethers";
import { LBDappABI } from "../ABI/LBDappImplABI.js";
import { logger } from "../logger.js";
export const initAllAssetsInfo = async () => {
  const alchemyUrl = process.env.ALCHEMY_URL;
  const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);

  const proxyAddress = "0xCf8c523eED3a1c1ebDA2415B460e3B52D85e6b44";

  try {
    const implementationContract = new ethers.Contract(
      proxyAddress,
      LBDappABI,
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
  } catch (err) {
    logger.error(err);
    return "Assets info not found";
  }
};
