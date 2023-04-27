import dotenv from "dotenv/config";
import { ethers } from "ethers";
import { logger } from "../logger.js";

export const initTxnStatus = async (txHash) => {
  const alchemyUrl = process.env.ALCHEMY_URL;
  const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);
  try {
    const tx = await provider.getTransaction(txHash);
    if (!tx) {
      return "Transaction not found";
    }

    const TIMEOUT_MS = 60000; // 1 minute timeout
    const INTERVAL_MS = 3000; // 3 seconds interval
    let elapsedMs = 0;
    let receipt = null;

    while (receipt === null && elapsedMs < TIMEOUT_MS) {
      // Wait for 3 seconds before checking the status again
      await new Promise((resolve) => setTimeout(resolve, INTERVAL_MS));
      receipt = await provider.getTransactionReceipt(txHash);
      elapsedMs += INTERVAL_MS;
    }

    if (receipt === null) {
      throw new Error(
        `Timed out after ${TIMEOUT_MS}ms waiting for transaction receipt`
      );
    }

    const status =
      receipt.status === 1 ? "Transaction executed" : "Transaction cancelled";
    return status;
  } catch (err) {
    logger.error(err);
    return "Transaction not found";
  }
};
