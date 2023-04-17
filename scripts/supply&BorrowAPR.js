import dotenv from "dotenv/config";
import { ethers } from "ethers";
import { LBDappABI } from "../ABI/LBDappImplABI.js";

export const initSupplyBorrowAPR = async () => {
  const alchemyUrl = process.env.ALCHEMY_URL;
  const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);

  const proxyAddress = "0xF09F0369aB0a875254fB565E52226c88f10Bc839";

  try {
    const implementationContract = new ethers.Contract(
      proxyAddress,
      implementationABI,
      provider
    );
    const utilization = await implementationContract.getUtilization();
    const responseObject = {};
    const SecondsPerYear = 60 * 60 * 24 * 365;
    const supplyRate = await implementationContract.getSupplyRate(utilization);
    const supplyAPR = (supplyRate / (10 ^ 18)) * SecondsPerYear * 100;
    responseObject.SupplyAPR = supplyAPR;
    const borrowRate = await implementationContract.getBorrowRate(utilization);
    const borrowAPR = (borrowRate / (10 ^ 18)) * SecondsPerYear * 100;
    responseObject.BorrowAPR = borrowAPR;
    return responseObject;
  } catch (err) {
    return "Supply APR or borrow APR not found";
  }
};
