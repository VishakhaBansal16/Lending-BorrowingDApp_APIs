import dotenv from "dotenv/config";
import { ethers } from "ethers";
import { LBDappABI } from "../ABI/LBDappImplABI.js";

export const initSupplyInfo = async (account) => {
  const alchemyUrl = process.env.ALCHEMY_URL;
  const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);

  const proxyAddress = "0x39872F03eCCF551eCe1E7049bAB7003E6cc22BcC";

  const implementationContract = new ethers.Contract(
    proxyAddress,
    LBDappABI,
    provider
  );

  const resultantArray = [];
  const resultantObject = {};
  const asset1 = "0xAAD4992D949f9214458594dF92B44165Fb84dC19";
  const array1 = await implementationContract.userTokenInfo(asset1, account);
  const supplyAmount1 = parseInt(array1[1], 10);
  resultantArray.push(supplyAmount1);

  const asset2 = "0x42a71137C09AE83D8d05974960fd607d40033499";
  const array2 = await implementationContract.userTokenInfo(asset2, account);
  const supplyAmount2 = parseInt(array2[1], 10);
  resultantArray.push(supplyAmount2);

  const asset3 = "0xaf95Ff5fB592646D86BF240B3CaE0903b6E4dd38";
  const array3 = await implementationContract.userTokenInfo(asset3, account);
  const supplyAmount3 = parseInt(array3[1], 10);
  resultantArray.push(supplyAmount3);

  resultantObject.wbtcSupplyAmount = resultantArray[0];
  resultantObject.wethSupplyAmount = resultantArray[1];
  resultantObject.linkSupplyAmount = resultantArray[2];
  return resultantObject;
};
