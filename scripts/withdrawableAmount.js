import dotenv from "dotenv/config";
import { ethers } from "ethers";
import { LBDappABI } from "../ABI/LBDappImplABI.js";

export const initWithdrawableAmount = async (account, asset, amount) => {
  const alchemyUrl = process.env.ALCHEMY_URL;
  const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);
  const proxyContractAddress = "0x5D1fd78f04Ac6dAAdC640dE031bd0ec33A5ab511";

  try {
    const implementationContract = new ethers.Contract(
      proxyContractAddress,
      LBDappABI,
      provider
    );
    const withdrawAccess =
      await implementationContract.getWithdrawableExtraAmount(
        account,
        asset,
        amount
      );

    return withdrawAccess;
  } catch (err) {
    return "Transaction object not found";
  }
};
