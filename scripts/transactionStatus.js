import dotenv from "dotenv/config";
import { ethers } from "ethers";
import { implementationABI } from "../implementationABI.js";

export const initTxnStatus = async (txHash) => {
  const alchemyUrl = process.env.ALCHEMY_URL;
  const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);

  const tx = await provider.getTransaction(txHash);
  if (!tx) {
    return "Transaction not found";
  }
  let receipt;
  while (receipt === null) {
    // Wait for 3 seconds before checking the status again
    await new Promise((resolve) => setTimeout(resolve, 3000));
    receipt = await provider.getTransactionReceipt(txHash);
  }
  const status =
    receipt.status === 1 ? "Transaction executed" : "Transaction cancelled";
  return status;
};
