import dotenv from "dotenv/config";
import { ethers } from "ethers";
import { WMATIC_ABI } from "./ABI/WMATIC_ABI.js";
import { Deposit } from "./models/deposit.js";
import { Approval } from "./models/approval.js";
import { Transfer } from "./models/transfer.js";
import { db } from "./db/database.js";
import mongoose from "mongoose";
const alchemyUrl = process.env.ALCHEMY_URL;
const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);

const address = "0xfec23a9E1DBA805ADCF55E0338Bf5E03488FC7Fb";

const contract = new ethers.Contract(address, WMATIC_ABI, provider);

// contract.on("Deposit", async (dst, wad, event) => {
//   console.log({
//     txnType: event,
//     to: dst,
//     amount: wad,
//   });

//   // Create txn details entry in database
//   const details = await Deposit.create({
//     txnType: event,
//     to: dst,
//     amount: wad,
//   });
//   console.log(details);
// });

contract.on("Approval", async (src, guy, wad, event) => {
  const amountInDecimals = parseInt(wad, 10);
  console.log({
    Type: event.event,
    _from: src,
    _to: guy,
    _amount: amountInDecimals,
    _txHash: event.transactionHash,
  });

  // Create txn details entry in database
  const details1 = await Approval.create({
    txnType: event.event,
    from: src,
    to: guy,
    amount: amountInDecimals,
    txHash: event.transactionHash,
  });
  console.log(details1);
});

// contract.on("Transfer", async (src, dst, wad, event) => {
//   console.log({
//     txnType: event,
//     from: src,
//     to: dst,
//     amount: wad,
//   });

//   // Create txn details entry in database
//   const details2 = await Transfer.create({
//     txnType: event,
//     from: src,
//     to: dst,
//     amount: wad,
//   });
//   console.log(details2);
// });
