import dotenv from "dotenv/config";
import { ethers } from "ethers";
import { LBDappABI } from "../ABI/LBDappImplABI.js";
import { logger } from "../logger.js";

export const initWithdraw = async (asset, amount) => {
  const alchemyUrl = process.env.ALCHEMY_URL;
  const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);
  const proxyContractAddress = "0x39872F03eCCF551eCe1E7049bAB7003E6cc22BcC";

  try {
    const implementationContract = new ethers.Contract(
      proxyContractAddress,
      LBDappABI,
      provider
    );
    if (asset == "0x3587b2F7E0E2D6166d6C14230e7Fe160252B0ba4") {
      amount = amount * 10 ** 18;
    }
    if (asset == "0xAAD4992D949f9214458594dF92B44165Fb84dC19") {
      amount = amount * 10 ** 8;
    }
    if (asset == "0x42a71137C09AE83D8d05974960fd607d40033499") {
      amount = amount * 10 ** 18;
    }
    if (asset == "0xaf95Ff5fB592646D86BF240B3CaE0903b6E4dd38") {
      amount = amount * 10 ** 18;
    }
    if (asset == "0x07865c6E87B9F70255377e024ace6630C1Eaa37F") {
      amount = amount * 10 ** 6;
    }
    const _amount = Number(amount).toLocaleString("fullwide", {
      useGrouping: false,
    });
    const methodName = "withdraw";
    const params = [asset, _amount];

    const data = implementationContract.interface.encodeFunctionData(
      methodName,
      params
    );

    const transactionObject = {
      to: proxyContractAddress,
      data: data,
      chainId: 5,
      gasPrice: 1000000000,
      gasLimit: 200000,
      nonce: 0,
    };
    return transactionObject;
  } catch (err) {
    logger.error(err);
    return "Transaction object not found";
  }
};
