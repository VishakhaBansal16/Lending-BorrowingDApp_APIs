import dotenv from "dotenv/config";
import { ethers } from "ethers";
import { LBDappABI } from "../ABI/LBDappImplABI.js";
import { assetsABI } from "../ABI/assetsABI.js";
import { logger } from "../logger.js";

export const initBuyCollateral = async (
  asset,
  minAmount,
  baseAmount,
  recipient
) => {
  const alchemyUrl = process.env.ALCHEMY_URL;
  const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);
  const proxyContract = "0xCf8c523eED3a1c1ebDA2415B460e3B52D85e6b44";

  try {
    const contract = new ethers.Contract(asset, assetsABI, provider);
    const Contract = new ethers.Contract(proxyContract, LBDappABI, provider);
    const decimals = await contract.decimals();
    minAmount = minAmount * 10 ** decimals;
    const _minAmount = Number(minAmount).toLocaleString("fullwide", {
      useGrouping: false,
    });
    baseAmount = baseAmount * 10 ** 6;
    const _baseAmount = Number(baseAmount).toLocaleString("fullwide", {
      useGrouping: false,
    });
    const methodName = "buyCollateral";
    const params = [asset, _minAmount, _baseAmount, recipient];

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
