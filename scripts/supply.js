import dotenv from "dotenv/config";
import { ethers } from "ethers";
import { implementationABI } from "../implementationABI.js";

export const initSupply = async (asset, amount, from) => {
  const alchemyUrl = process.env.ALCHEMY_URL;
  const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);
  const proxyContractAddress = "0xF09F0369aB0a875254fB565E52226c88f10Bc839";
  const implementationContractAddress =
    "0x6Cd33556D458aC78Cc17b55Eb75B17d23E4deE57";

  const implementationContract = new ethers.Contract(
    implementationContractAddress,
    implementationABI,
    provider
  );
  const methodName = "supply";
  const params = [asset, amount];

  const data = implementationContract.interface.encodeFunctionData(
    methodName,
    params
  );

  const transactionObject = {
    to: proxyContractAddress,
    data: data,
    chainId: 80001,
    gasPrice: ethers.utils.parseUnits("10", "gwei"),
    gasLimit: 200000,
    nonce: await provider.getTransactionCount(from),
  };

  const serializedTransaction =
    ethers.utils.serializeTransaction(transactionObject);

  return serializedTransaction;
};
