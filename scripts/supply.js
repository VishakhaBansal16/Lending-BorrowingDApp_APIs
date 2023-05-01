import dotenv from "dotenv/config";
import { ethers } from "ethers";
import { LBDappABI } from "../ABI/LBDappImplABI.js";
import { assetsABI } from "../ABI/assetsABI.js";
import { logger } from "../logger.js";

export const initSupply = async (asset, amount) => {
  const alchemyUrl = process.env.ALCHEMY_URL;
  const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);
  const proxyContract = "0x2f5B9748001556E69C9248f1649FA71332d7FF31";

  try {
    const contract = new ethers.Contract(asset, assetsABI, provider);
    const Contract = new ethers.Contract(proxyContract, LBDappABI, provider);
    const decimals = await contract.decimals();
    amount = amount * 10 ** decimals;
    const _amount = Number(amount).toLocaleString("fullwide", {
      useGrouping: false,
    });
    const methodName = "supply";
    const params = [asset, _amount];

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
