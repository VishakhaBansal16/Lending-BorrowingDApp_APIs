import dotenv from "dotenv/config";
import { ethers } from "ethers";
import { LBDappABI } from "../ABI/LBDappImplABI.js";

export const initSupplyInfo = async (asset, account) => {
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
  const result = [];
  const array = await implementationContract.userTokenInfo(asset, account);
  //getting details of user like depositAmount, supplyAmount, lastAccureTime
  responseObject = array.reduce((obj, value, index) => {
    obj[propertyNames[index]] = parseInt(value, 10);

    return obj;
  }, {});
  result.push(responseObject);
  return result;
};
