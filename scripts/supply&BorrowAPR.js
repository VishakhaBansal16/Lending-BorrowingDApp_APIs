import dotenv from "dotenv/config";
import { ethers } from "ethers";
import { LBDappABI } from "../ABI/LBDappImplABI.js";

export const initSupplyBorrowAPR = async () => {
  const alchemyUrl = process.env.ALCHEMY_URL;
  const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);

  const proxyAddress = "0x39872F03eCCF551eCe1E7049bAB7003E6cc22BcC";

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
    return "Supply APR or borrow APR not found";
  }
};
