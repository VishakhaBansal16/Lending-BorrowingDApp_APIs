import dotenv from "dotenv/config";
import { ethers } from "ethers";
import { LBDappABI } from "../ABI/LBDappImplABI.js";
import { logger } from "../logger.js";

export const initSupplyBorrowAPR = async () => {
  const alchemyUrl = process.env.ALCHEMY_URL;
  const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);

  const proxyAddress = "0x2f5B9748001556E69C9248f1649FA71332d7FF31";

  try {
    const implementationContract = new ethers.Contract(
      proxyAddress,
      LBDappABI,
      provider
    );

    const responseObject = {};
    const supplyAPR = await implementationContract.getSupplyApr();
    const supplyApr = parseInt(supplyAPR, 10);
    responseObject.SupplyAPR = supplyApr;
    const borrowAPR = await implementationContract.getBorrowApr();
    const borrowApr = parseInt(borrowAPR, 10);
    responseObject.BorrowAPR = borrowApr;
    return responseObject;
  } catch (err) {
    logger.error(err);
    return "Supply APR or borrow APR not found";
  }
};
