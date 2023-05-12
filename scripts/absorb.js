import dotenv from "dotenv/config";
import { ethers } from "ethers";
import { LBDappABI } from "../ABI/LBDappImplABI.js";
import { logger } from "../logger.js";

export const initAbsorb = async (absorber, accounts) => {
  const alchemyUrl = process.env.ALCHEMY_URL;
  const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);
  const proxyContract = "0xCf8c523eED3a1c1ebDA2415B460e3B52D85e6b44";

  try {
    const Contract = new ethers.Contract(proxyContract, LBDappABI, provider);
    const methodName = "absorb";
    const params = [absorber, accounts];

    const data = Contract.interface.encodeFunctionData(methodName, params);

    const transactionObject = {
      to: proxyContract,
      data: data,
      chainId: 5,
      gasPrice: 1000000000,
      gasLimit: 200000,
      nonce: 0,
    };

    return transactionObject;
  } catch (err) {
    logger.error(err);
    return "Transaction object not found";
  }
};
