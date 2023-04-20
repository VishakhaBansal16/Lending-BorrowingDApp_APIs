import dotenv from "dotenv/config";
import { ethers, BigNumber } from "ethers";
import { LBDappABI } from "../ABI/LBDappImplABI.js";

export const initBorrowBalance = async (account) => {
  const alchemyUrl = process.env.ALCHEMY_URL;
  const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);

  const proxyAddress = "0x5D1fd78f04Ac6dAAdC640dE031bd0ec33A5ab511";

  const implementationContract = new ethers.Contract(
    proxyAddress,
    LBDappABI,
    provider
  );

  const balance = await implementationContract.getBorrowBalanceOf(account);

  const balanceInInteger = parseInt(balance, 10);

  return balanceInInteger;
};
