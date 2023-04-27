import dotenv from "dotenv/config";
import { ethers } from "ethers";
import { assetsABI } from "../ABI/assetsABI.js";
import { logger } from "../logger.js";

export const initBalance = async (address) => {
  const alchemyUrl = process.env.ALCHEMY_URL;
  const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);
  const compAddress = "0x3587b2F7E0E2D6166d6C14230e7Fe160252B0ba4";
  const wbtcAddress = "0xAAD4992D949f9214458594dF92B44165Fb84dC19";
  const wethAddress = "0x42a71137C09AE83D8d05974960fd607d40033499";
  const linkAddress = "0xaf95Ff5fB592646D86BF240B3CaE0903b6E4dd38";
  const usdcProxyAddress = "0x07865c6E87B9F70255377e024ace6630C1Eaa37F";
  try {
    const compContract = new ethers.Contract(compAddress, assetsABI, provider);
    const wbtcContract = new ethers.Contract(wbtcAddress, assetsABI, provider);
    const wethContract = new ethers.Contract(wethAddress, assetsABI, provider);
    const linkContract = new ethers.Contract(linkAddress, assetsABI, provider);
    const usdcContract = new ethers.Contract(
      usdcProxyAddress,
      assetsABI,
      provider
    );
    const balanceArray = [];
    const compBalance = await compContract.balanceOf(address);
    const compBalanceInDecimal = parseInt(compBalance, 10);
    const _compBalance = compBalanceInDecimal / 10 ** 18;
    balanceArray.push(_compBalance);
    const wbtcBalance = await wbtcContract.balanceOf(address);
    const wbtcBalanceInDecimal = parseInt(wbtcBalance, 10);
    const _wbtcBalance = wbtcBalanceInDecimal / 10 ** 8;
    balanceArray.push(_wbtcBalance);
    const wethBalance = await wethContract.balanceOf(address);
    const wethBalanceInDecimal = parseInt(wethBalance, 10);
    const _wethBalance = wethBalanceInDecimal / 10 ** 18;
    balanceArray.push(_wethBalance);
    const linkBalance = await linkContract.balanceOf(address);
    const linkBalanceInDecimal = parseInt(linkBalance, 10);
    const _linkBalance = linkBalanceInDecimal / 10 ** 18;
    balanceArray.push(_linkBalance);
    const usdcBalance = await usdcContract.balanceOf(address);
    const usdcBalanceInDecimal = parseInt(usdcBalance, 10);
    const _usdcBalance = usdcBalanceInDecimal / 10 ** 6;
    balanceArray.push(_usdcBalance);

    const propertyNames = [
      "0x3587b2F7E0E2D6166d6C14230e7Fe160252B0ba4",
      "0xAAD4992D949f9214458594dF92B44165Fb84dC19",
      "0x42a71137C09AE83D8d05974960fd607d40033499",
      "0xaf95Ff5fB592646D86BF240B3CaE0903b6E4dd38",
      "0x07865c6E87B9F70255377e024ace6630C1Eaa37F",
    ];
    const responseArray = balanceArray.reduce((obj, value, index) => {
      if (typeof value == "object" || value.type == "BigNumber") {
        obj[propertyNames[index]] = parseInt(value, 10);
      } else {
        obj[propertyNames[index]] = value;
      }
      return obj;
    }, {});
    return responseArray;
  } catch (err) {
    logger.error(err);
    return "Transaction not found";
  }
};
