import dotenv from "dotenv/config";
import { ethers } from "ethers";
import { LBDappABI } from "../ABI/LBDappImplABI.js";

export const initBorrowableAmount = async (account) => {
  const alchemyUrl = process.env.ALCHEMY_URL;
  const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);
  const proxyContractAddress = "0x39872F03eCCF551eCe1E7049bAB7003E6cc22BcC";

  try {
    const implementationContract = new ethers.Contract(
      proxyContractAddress,
      LBDappABI,
      provider
    );
    const amount = await implementationContract.getBorrowableAmount(account);
    const borrowableAmount = parseInt(amount, 10);

    return borrowableAmount;
  } catch (err) {
    return "Transaction object not found";
  }
};
