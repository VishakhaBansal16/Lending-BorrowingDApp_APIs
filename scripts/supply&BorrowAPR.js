import dotenv from "dotenv/config";
import { ethers } from "ethers";
import { LBDappABI } from "../ABI/LBDappImplABI.js";
import { logger } from "../logger.js";

export const initSupplyBorrowAPR = async () => {
  const alchemyUrl = process.env.ALCHEMY_URL;
  const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);

  const proxyAddress = "0xCf8c523eED3a1c1ebDA2415B460e3B52D85e6b44";

  try {
    const implementationContract = new ethers.Contract(
      proxyAddress,
      LBDappABI,
      provider
    );

    const responseObject = {};
    const SECONDS_PER_YEAR = 60 * 60 * 24 * 365;
    const supplyAPR = await implementationContract.getSupplyApr();
    const supplyApr = supplyAPR * SECONDS_PER_YEAR * 100;
    responseObject.SupplyAPR = supplyApr;
    const borrowAPR = await implementationContract.getBorrowApr();
    const borrowApr = borrowAPR * SECONDS_PER_YEAR * 100;
    responseObject.BorrowAPR = borrowApr;
    return responseObject;
  } catch (err) {
    logger.error(err);
    return "Supply APR or borrow APR not found";
  }
};
