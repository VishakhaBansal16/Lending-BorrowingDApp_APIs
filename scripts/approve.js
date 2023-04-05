import dotenv from "dotenv/config";
import { ethers } from "ethers";
import { ERC20ABI } from "../ERC20ABI.js";

export const initApprove = async (spender, value) => {
  const alchemyUrl = process.env.ALCHEMY_URL;
  const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);
  const ERC20ContractAddress = "0xffF22A7c1568f712D729CeA601873b69784c7639";
  //try {
  const contract = new ethers.Contract(
    ERC20ContractAddress,
    ERC20ABI,
    provider
  );
  const methodName = "approve";
  const params = [spender, value];

  const data = contract.interface.encodeFunctionData(methodName, params);

  const transactionObject = {
    to: ERC20ContractAddress,
    data: data,
    chainId: 80001,
    gasPrice: 1000000000,
    gasLimit: 200000,
    nonce: 0,
  };

  return transactionObject;
};
