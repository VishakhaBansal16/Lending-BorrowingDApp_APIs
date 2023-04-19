import dotenv from "dotenv/config";
import { ethers } from "ethers";
import { LBDappABI } from "../ABI/LBDappImplABI.js";

export const initTokenInfoSchema = async (asset, account) => {
  const alchemyUrl = process.env.ALCHEMY_URL;
  const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);

  const proxyAddress = "0x5D1fd78f04Ac6dAAdC640dE031bd0ec33A5ab511";

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
