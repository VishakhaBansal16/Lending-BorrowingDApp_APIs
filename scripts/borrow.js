import dotenv from "dotenv/config";
import { ethers } from "ethers";
import { LBDappABI } from "../ABI/LBDappImplABI.js";

export const initBorrow = async (asset, amount) => {
  const alchemyUrl = process.env.ALCHEMY_URL;
  const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);
  const proxyContractAddress = "0x96D64580f36138379903F3371f7b4c469Eb53E95";

  try {
    const implementationContract = new ethers.Contract(
      proxyContractAddress,
      LBDappABI,
      provider
    );
    const methodName = "withdraw";
    const params = [asset, amount];

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
