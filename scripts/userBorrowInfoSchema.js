import dotenv from "dotenv/config";
import { ethers } from "ethers";
import { LBDappABI } from "../ABI/LBDappImplABI.js";

export const initBorrowInfoSchema = async (account) => {
  const alchemyUrl = process.env.ALCHEMY_URL;
  const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);

  const proxyAddress = "0x5D1fd78f04Ac6dAAdC640dE031bd0ec33A5ab511";

  const implementationContract = new ethers.Contract(
    proxyAddress,
    LBDappABI,
    provider
  );
  const propertyNames = ["borrowAmount", "lastAccureTime", "interestAmount"];
  let responseObject;
  const resultantArray = [];
  const resultantObject = {};
  const array = await implementationContract.userBorrowInfo(account);
  //getting details of user like borrowAmount, lastAccureTime, interestAmount
  responseObject = array.reduce((obj, value, index) => {
    obj[propertyNames[index]] = parseInt(value, 10);
    return obj;
  }, {});
  resultantArray.push(responseObject);

  resultantObject.borrowAmount = resultantArray[0].borrowAmount;
  resultantObject.lastAccureTime = resultantArray[0].lastAccureTime;
  resultantObject.interestAmount = resultantArray[0].interestAmount;
  return resultantObject;
};
