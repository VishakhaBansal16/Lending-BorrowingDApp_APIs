import dotenv from "dotenv/config";
import { ethers } from "ethers";
import { LBDappABI } from "../ABI/LBDappImplABI.js";

export const initBorrowInfo = async (account) => {
  const alchemyUrl = process.env.ALCHEMY_URL;
  const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);

  const proxyAddress = "0x5D1fd78f04Ac6dAAdC640dE031bd0ec33A5ab511";

  const implementationContract = new ethers.Contract(
    proxyAddress,
    LBDappABI,
    provider
  );
  let responseObject;
  const resultantArray = [];
  const resultantObject = {};
  const array = await implementationContract.userBorrowInfo(account);
  //getting details of user like borrowAmount, lastAccureTime, interestAmount
  for (let i = 0; i <= 2; i++) {
    responseObject = array.reduce((obj, value) => {
      obj = parseInt(value, 10);
      return obj;
    }, {});
    resultantArray.push(responseObject);
  }
  resultantObject.borrowAmount = resultantArray[0];
  resultantObject.lastAccureTime = resultantArray[1];
  resultantObject.interestAmount = resultantArray[2];
  return resultantObject;
};
