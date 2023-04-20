import dotenv from "dotenv/config";
import { ethers } from "ethers";
import LBDappABI from "../ABI/LBDappImplABI.js";
import { TxnDetails } from "../models/txnDetailsModel.js";
const alchemyUrl = process.env.ALCHEMY_URL;
const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);

const proxyAddress = "0x5D1fd78f04Ac6dAAdC640dE031bd0ec33A5ab511";

const implementationContract = new ethers.Contract(
  proxyAddress,
  LBDappABI,
  provider
);

implementationContract.on("supplyToken", (user, asset, amount, event) => {
  console.log({
    txntype: event,
    asset: asset,
    amount: amount,
    from: user,
  });

  // Create txn details entry in database
  const details = TxnDetails.create({
    txntype: event,
    asset: asset,
    amount: amount,
    from: user,
  });
});
