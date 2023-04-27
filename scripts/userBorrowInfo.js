import dotenv from "dotenv/config";
import { ethers } from "ethers";
import { LBDappABI } from "../ABI/LBDappImplABI.js";
import { logger } from "../logger.js";

export const initBorrowInfo = async (account) => {
  const alchemyUrl = process.env.ALCHEMY_URL;
  const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);

  const proxyAddress = "0x39872F03eCCF551eCe1E7049bAB7003E6cc22BcC";
  try {
    const implementationContract = new ethers.Contract(
      proxyAddress,
      LBDappABI,
      provider
    );
    const resultantArray = [];
    const resultantObject = {};
    const asset1 = "0xAAD4992D949f9214458594dF92B44165Fb84dC19";
    const array1 = await implementationContract.userBorrowInfo(asset1, account);
    resultantArray.push(array1[1]);

    const asset2 = "0x42a71137C09AE83D8d05974960fd607d40033499";
    const array2 = await implementationContract.userBorrowInfo(asset2, account);
    resultantArray.push(array2[1]);

    const asset3 = "0xaf95Ff5fB592646D86BF240B3CaE0903b6E4dd38";
    const array3 = await implementationContract.userBorrowInfo(asset3, account);
    resultantArray.push(array3[1]);

    resultantObject.wbtcBorrowAmount = resultantArray[0];
    resultantObject.wethBorrowAmount = resultantArray[1];
    resultantObject.linkBorrowAmount = resultantArray[2];
    return resultantObject;
  } catch (err) {
    logger.error(err);
    return "Info not found";
  }
};
