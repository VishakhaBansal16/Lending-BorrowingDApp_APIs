import dotenv from "dotenv/config";
import { ethers } from "ethers";
import { LBDappABI } from "../ABI/LBDappImplABI.js";

export const initRepayBorrow = async (baseAsset, amount) => {
  const alchemyUrl = process.env.ALCHEMY_URL;
  const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);
  const proxyContractAddress = "0x39872F03eCCF551eCe1E7049bAB7003E6cc22BcC";

  try {
    const implementationContract = new ethers.Contract(
      proxyContractAddress,
      LBDappABI,
      provider
    );
    if (baseAsset == "0x07865c6E87B9F70255377e024ace6630C1Eaa37F") {
      amount = amount * 10 ** 6;
    }
    const _amount = Number(amount).toLocaleString("fullwide", {
      useGrouping: false,
    });
    const methodName = "repayBorrow";
    const params = [baseAsset, _amount];

    const data = implementationContract.interface.encodeFunctionData(
      methodName,
      params
    );

    const transactionObject = {
      to: proxyContractAddress,
      data: data,
      chainId: 80001,
      gasPrice: 1000000000,
      gasLimit: 200000,
      nonce: 0,
    };
    return transactionObject;
  } catch (err) {
    return "Transaction object not found";
  }
};
