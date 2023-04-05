import dotenv from "dotenv/config";
import { ethers } from "ethers";
import { implementationABI } from "../implementationABI.js";

export const initBorrow = async (asset, amount) => {
  const alchemyUrl = process.env.ALCHEMY_URL;
  const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);
  const proxyContractAddress = "0xF09F0369aB0a875254fB565E52226c88f10Bc839";
  const implementationContractAddress =
    "0x6Cd33556D458aC78Cc17b55Eb75B17d23E4deE57";
  try {
    const implementationContract = new ethers.Contract(
      implementationContractAddress,
      implementationABI,
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
