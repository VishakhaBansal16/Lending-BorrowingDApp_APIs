import dotenv from "dotenv/config";
import { ethers } from "ethers";
import { LBDappABI } from "./ABI/LBDappImplABI.js";
import { TxnDetails } from "./models/txnDetailsModel.js";
import { TokenInfo } from "./models/userSupplyInfoModel.js";
import { initSupplyInfo } from "./scripts/userSupplyInfo.js";
const alchemyUrl = process.env.ALCHEMY_URL;
const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);

const address = "0x2f5B9748001556E69C9248f1649FA71332d7FF31";

const contract = new ethers.Contract(address, LBDappABI, provider);
export const events = async () => {
  contract.on("SupplyCollateral", async (user, asset, amount, event) => {
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
          usdcSupplyAmount: result.usdcSupplyAmount,
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
        usdcSupplyAmount: result.usdcSupplyAmount,
      });
      console.log(info);
    }
  });

  contract.on("SupplyBase", async (user, amount, event) => {
    const _amount = parseInt(amount, 10);
    const details = await TxnDetails.create({
      txnType: event.event,
      asset: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
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
          usdcSupplyAmount: result.usdcSupplyAmount,
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
        usdcSupplyAmount: result.usdcSupplyAmount,
      });
      console.log(info);
    }
  });

  contract.on("WithdrawCollateral", async (user, asset, amount, event) => {
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
          usdcSupplyAmount: result.usdcSupplyAmount,
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
        usdcSupplyAmount: result.usdcSupplyAmount,
      });
      console.log(info);
    }
  });

  contract.on("WithdrawBase", async (user, amount, event) => {
    const _amount = parseInt(amount, 10);
    const details = await TxnDetails.create({
      txnType: event.event,
      asset: "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
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
          usdcSupplyAmount: result.usdcSupplyAmount,
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
        usdcSupplyAmount: result.usdcSupplyAmount,
      });
      console.log(info);
    }
  });
};
