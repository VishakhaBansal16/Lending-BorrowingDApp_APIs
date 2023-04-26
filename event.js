import dotenv from "dotenv/config";
import { ethers } from "ethers";
import { LBDappABI } from "./ABI/LBDappImplABI.js";
import { TxnDetails } from "./models/txnDetailsModel.js";
import { TokenInfo } from "./models/userTokenInfoModel.js";
import { BorrowInfo } from "./models/userBorrowInfoModel.js";
import { initSupplyInfo } from "./scripts/userSupplyInfo.js";
import { initBorrowInfo } from "./scripts/userBorrowInfo.js";
const alchemyUrl = process.env.ALCHEMY_URL;
const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);

const address = "0x39872F03eCCF551eCe1E7049bAB7003E6cc22BcC";

const contract = new ethers.Contract(address, LBDappABI, provider);
export const events = async () => {
  contract.on("supplyToken", async (user, asset, amount, event) => {
    const _amount = parseInt(amount, 10);
    const details = await TxnDetails.create({
      txnType: event.event,
      asset: asset,
      amount: _amount,
      from: user,
      txHash: event.transactionHash,
    });
    console.log(details);
    const result = await initSupplyInfo(user);
    const filter = { account: user };
    const tokenInfo = await TokenInfo.findOne(filter);
    if (tokenInfo) {
      const update = {
        $set: {
          compSupplyAmount: result.compSupplyAmount,
          wbtcSupplyAmount: result.wbtcSupplyAmount,
          wethSupplyAmount: result.wethSupplyAmount,
          linkSupplyAmount: result.linkSupplyAmount,
        },
      };
      const _result = await TokenInfo.updateOne(filter, update);
      console.log(_result);
    } else {
      const info = await TokenInfo.create({
        account: user,
        compSupplyAmount: result.compSupplyAmount,
        wbtcSupplyAmount: result.wbtcSupplyAmount,
        wethSupplyAmount: result.wethSupplyAmount,
        linkSupplyAmount: result.linkSupplyAmount,
      });
      console.log(info);
    }
  });

  contract.on("supplyWithdraw", async (user, asset, amount, event) => {
    const _amount = parseInt(amount, 10);
    const details = await TxnDetails.create({
      txnType: event.event,
      asset: asset,
      amount: _amount,
      from: user,
      txHash: event.transactionHash,
    });
    console.log(details);
    const result = await initSupplyInfo(user);
    const filter = { account: user };
    const tokenInfo = await TokenInfo.findOne(filter);
    if (tokenInfo) {
      const update = {
        $set: {
          compSupplyAmount: result.compSupplyAmount,
          wbtcSupplyAmount: result.wbtcSupplyAmount,
          wethSupplyAmount: result.wethSupplyAmount,
          linkSupplyAmount: result.linkSupplyAmount,
        },
      };
      const _result = await TokenInfo.updateOne(filter, update);
      console.log(_result);
    } else {
      const info = await TokenInfo.create({
        account: user,
        compSupplyAmount: result.compSupplyAmount,
        wbtcSupplyAmount: result.wbtcSupplyAmount,
        wethSupplyAmount: result.wethSupplyAmount,
        linkSupplyAmount: result.linkSupplyAmount,
      });
      console.log(info);
    }
  });

  contract.on("borrowToken", async (user, asset, amount, event) => {
    const _amount = parseInt(amount, 10);
    const details = await TxnDetails.create({
      txnType: event.event,
      asset: asset,
      amount: _amount,
      from: user,
      txHash: event.transactionHash,
    });
    console.log(details);
    const result = await initBorrowInfo(user);
    const filter = { account: user };
    const borrowInfo = await BorowInfo.findOne(filter);
    if (borrowInfo) {
      const update = {
        $set: {
          wbtcBorrowAmount: result.wbtcBorrowAmount,
          wethBorrowAmount: result.wethBorrowAmount,
          linkBorrowAmount: result.linkBorrowAmount,
        },
      };
      const _result = await TokenInfo.updateOne(filter, update);
      console.log(_result);
    } else {
      const info = await BorrowInfo.create({
        account: user,
        wbtcBorrowAmount: result.wbtcBorrowAmount,
        wethBorrowAmount: result.wethBorrowAmount,
        linkBorrowAmount: result.linkBorrowAmount,
      });
      console.log(info);
    }
  });

  contract.on("repayBorrowed", async (user, asset, amount, event) => {
    const _amount = parseInt(amount, 10);
    const details = await TxnDetails.create({
      txnType: event.event,
      asset: asset,
      amount: _amount,
      from: user,
      txHash: event.transactionHash,
    });
    console.log(details);

    const result = await initBorrowInfo(user);
    const filter = { account: user };
    const borrowInfo = await BorowInfo.findOne(filter);
    if (borrowInfo) {
      const update = {
        $set: {
          wbtcBorrowAmount: result.wbtcBorrowAmount,
          wethBorrowAmount: result.wethBorrowAmount,
          linkBorrowAmount: result.linkBorrowAmount,
        },
      };
      const _result = await TokenInfo.updateOne(filter, update);
      console.log(_result);
    } else {
      const info = await BorrowInfo.create({
        account: user,
        wbtcBorrowAmount: result.wbtcBorrowAmount,
        wethBorrowAmount: result.wethBorrowAmount,
        linkBorrowAmount: result.linkBorrowAmount,
      });
      console.log(info);
    }
  });

  contract.on("depositToken", async (user, asset, amount, event) => {
    const _amount = parseInt(amount, 10);
    const details = await TxnDetails.create({
      txnType: event.event,
      asset: asset,
      amount: _amount,
      from: user,
      txHash: event.transactionHash,
    });
    console.log(details);
  });

  contract.on("withdrawToken", async (user, asset, amount, event) => {
    const _amount = parseInt(amount, 10);
    const details = await TxnDetails.create({
      txnType: event.event,
      asset: asset,
      amount: _amount,
      from: user,
      txHash: event.transactionHash,
    });
    console.log(details);
  });
};
