import dotenv from "dotenv/config";
import { ethers } from "ethers";
import { assetsABI } from "../ABI/assetsABI.js";
import { LBDappABI } from "../ABI/LBDappImplABI.js";
import { logger } from "../logger.js";

export const initWithdrawableAmount = async (account, asset, amount) => {
  const alchemyUrl = process.env.ALCHEMY_URL;
  const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);
  const proxyContractAddress = "0xCf8c523eED3a1c1ebDA2415B460e3B52D85e6b44";

  try {
    const contract = new ethers.Contract(asset, assetsABI, provider);
    const Contract = new ethers.Contract(
      proxyContractAddress,
      LBDappABI,
      provider
    );

    const decimals = await contract.decimals();
    amount = amount * 10 ** decimals;
    const _amount = Number(amount).toLocaleString("fullwide", {
      useGrouping: false,
    }); // to convert bigNumber value into number

    const withdrawAccess = await Contract.canWithdrawExtraCollateral(
      account,
      asset,
      _amount
    );

    return withdrawAccess;
  } catch (err) {
    logger.error(err);
    return "Transaction object not found";
  }
};
