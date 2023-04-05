import dotenv from "dotenv/config";
import { ethers } from "ethers";
import { ERC20ABI } from "../ERC20ABI.js";

export const initBalance = async (address) => {
  const alchemyUrl = process.env.ALCHEMY_URL;
  const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);
  const ERC20ContractAddress = "0xffF22A7c1568f712D729CeA601873b69784c7639";
  try {
    const contract = new ethers.Contract(
      ERC20ContractAddress,
      ERC20ABI,
      provider
    );
    const balance = await contract.balanceOf(address);
    const balanceInDecimal = parseInt(balance, 10);
    return balanceInDecimal;
  } catch (err) {
    return "Transaction not found";
  }
};
