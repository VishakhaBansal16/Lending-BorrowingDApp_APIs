import dotenv from "dotenv/config";
import { ethers } from "ethers";
import { LBDappABI } from "../ABI/LBDappImplABI.js";
import { logger } from "../logger.js";

export const initSupplyInfo = async (account) => {
  const alchemyUrl = process.env.ALCHEMY_URL;
  const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);

  const proxyAddress = "0x2f5B9748001556E69C9248f1649FA71332d7FF31";
  try {
    const implementationContract = new ethers.Contract(
      proxyAddress,
      LBDappABI,
      provider
    );

    const resultantArray = [];
    const resultantObject = {};

    const asset0 = "0x3587b2F7E0E2D6166d6C14230e7Fe160252B0ba4";
    const amount0 = await implementationContract.userCollateral(
      account,
      asset0
    );
    const supplyAmount0 = parseInt(amount0, 10);
    resultantArray.push(supplyAmount0);

    const asset1 = "0xAAD4992D949f9214458594dF92B44165Fb84dC19";
    const amount1 = await implementationContract.userCollateral(
      account,
      asset1
    );
    const supplyAmount1 = parseInt(amount1, 10);
    resultantArray.push(supplyAmount1);

    const asset2 = "0x42a71137C09AE83D8d05974960fd607d40033499";
    const amount2 = await implementationContract.userCollateral(
      account,
      asset2
    );
    const supplyAmount2 = parseInt(amount2, 10);
    resultantArray.push(supplyAmount2);

    const asset3 = "0xaf95Ff5fB592646D86BF240B3CaE0903b6E4dd38";
    const amount3 = await implementationContract.userCollateral(
      account,
      asset3
    );
    const supplyAmount3 = parseInt(amount3, 10);
    resultantArray.push(supplyAmount3);

    const amount4 = await implementationContract.balanceOf(account);
    const supplyAmount4 = parseInt(amount4, 10);
    resultantArray.push(supplyAmount4);

    resultantObject.compSupplyAmount = resultantArray[0];
    resultantObject.wbtcSupplyAmount = resultantArray[1];
    resultantObject.wethSupplyAmount = resultantArray[2];
    resultantObject.linkSupplyAmount = resultantArray[3];
    resultantObject.usdcSupplyAmount = resultantArray[4];
    return resultantObject;
  } catch (err) {
    logger.error(err);
    return "Info not found";
  }
};
