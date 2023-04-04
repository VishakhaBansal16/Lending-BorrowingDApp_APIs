import dotenv from "dotenv/config";
import { ethers } from "ethers";
import express from "express";
import { implementationABI } from "../implementationABI.js";

export const initSupplyEvent = async (from, dst, amount) => {
  const alchemyUrl = process.env.ALCHEMY_URL;
  const provider = new ethers.providers.JsonRpcProvider(
    "https://rpc-mumbai.maticvigil.com/"
  );

  const implementationContractAddress =
    "0x6Cd33556D458aC78Cc17b55Eb75B17d23E4deE57";
  // Event names and types from contract ABI
  const eventName = "Supply";
  const eventTypes = ["address", "address", "uint256"];

  const implementationContract = new ethers.Contract(
    implementationContractAddress,
    implementationABI,
    provider
  );

  const eventFilter = implementationContract.filters[eventName](
    from,
    dst,
    utils.parseUnits(amount.toString())
  );
  implementationContract.once(eventFilter, (eventArgs) => {
    console.log("Event Args:", eventArgs);
  });

  return true;
};
