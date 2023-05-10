import dotenv from "dotenv/config";
import { ethers } from "ethers";
import { LBDappABI } from "../ABI/LBDappImplABI.js";
import { assetsABI } from "../ABI/assetsABI.js";
import { logger } from "../logger.js";
export const initCollateralReserves = async (asset) => {
  const alchemyUrl = process.env.ALCHEMY_URL;
  const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);

  const proxyAddress = "0xCf8c523eED3a1c1ebDA2415B460e3B52D85e6b44";

  try {
    const contract = new ethers.Contract(proxyAddress, LBDappABI, provider);
    const assetContract = new ethers.Contract(asset, assetsABI, provider);
    const decimals = await assetContract.decimals();
    const reserve = await contract.getCollateralReserves(asset);
    const reserveInInt = parseInt(reserve, 10);
    const exactReserve = reserveInInt / 10 ** decimals;
    return exactReserve;
  } catch (err) {
    logger.error(err);
    return "Reserve not found";
  }
};
