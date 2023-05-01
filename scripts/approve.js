import dotenv from "dotenv/config";
import { ethers } from "ethers";
import { assetsABI } from "../ABI/assetsABI.js";
import { logger } from "../logger.js";
export const initApprove = async (asset, value) => {
  const alchemyUrl = process.env.ALCHEMY_URL;
  const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);
  try {
    const contract = new ethers.Contract(asset, assetsABI, provider);
    const spender = "0x2f5B9748001556E69C9248f1649FA71332d7FF31"; //proxy contract address
    const decimals = await contract.decimals();
    value = value * 10 ** decimals;
    const _value = Number(value).toLocaleString("fullwide", {
      useGrouping: false,
    });
    const methodName = "approve";
    const params = [spender, _value];

    const data = contract.interface.encodeFunctionData(methodName, params);
    const transactionObject = {
      to: asset,
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
