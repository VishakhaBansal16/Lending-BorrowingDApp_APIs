import dotenv from "dotenv/config";
import { ethers } from "ethers";
import { LBDappABI } from "../ABI/LBDappImplABI.js";

export const initSupplyInfo = async (asset, account) => {
  const alchemyUrl = process.env.ALCHEMY_URL;
  const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);

  const proxyAddress = "0x39872F03eCCF551eCe1E7049bAB7003E6cc22BcC";

  const implementationContract = new ethers.Contract(
    proxyAddress,
    LBDappABI,
    provider
  );
  const propertyNames = ["depositAmount", "supplyAmount", "lastAccureTime"];
  let responseObject;
  const resultantArray = [];
  const resultantObject = {};
  const array = await implementationContract.userTokenInfo(asset, account);

  //getting details of user like depositAmount, supplyAmount, lastAccureTime
  responseObject = array.reduce((obj, value, index) => {
    obj[propertyNames[index]] = parseInt(value, 10);
    return obj;
  }, {});
  resultantArray.push(responseObject);
  resultantObject.depositAmount = resultantArray[0].depositAmount;
  resultantObject.supplyAmount = resultantArray[0].supplyAmount;
  resultantObject.lastAccureTime = resultantArray[0].lastAccureTime;
  return resultantObject;
};
