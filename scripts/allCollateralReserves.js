import dotenv from "dotenv/config";
import { ethers } from "ethers";
import { LBDappABI } from "../ABI/LBDappImplABI.js";
import { logger } from "../logger.js";
export const initAllCollateralReserves = async () => {
  const alchemyUrl = process.env.ALCHEMY_URL;
  const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);

  const proxyAddress = "0xCf8c523eED3a1c1ebDA2415B460e3B52D85e6b44";

  const compAddress = "0x3587b2F7E0E2D6166d6C14230e7Fe160252B0ba4";
  const wbtcAddress = "0xAAD4992D949f9214458594dF92B44165Fb84dC19";
  const wethAddress = "0x42a71137C09AE83D8d05974960fd607d40033499";
  const linkAddress = "0xaf95Ff5fB592646D86BF240B3CaE0903b6E4dd38";

  try {
    const Contract = new ethers.Contract(proxyAddress, LBDappABI, provider);
    const reservesArray = [];
    const compReserve = await Contract.getCollateralReserves(compAddress);
    const compReserveInInt = parseInt(compReserve, 10);
    const compReserveInDecimal = compReserveInInt / 10 ** 18;
    reservesArray.push(compReserveInDecimal);
    const wbtcReserve = await Contract.getCollateralReserves(wbtcAddress);
    const wbtcReserveInInt = parseInt(wbtcReserve, 10);
    const wbtcReserveInDecimal = wbtcReserveInInt / 10 ** 8;
    reservesArray.push(wbtcReserveInDecimal);
    const wethReserve = await Contract.getCollateralReserves(wethAddress);
    const wethReserveInInt = parseInt(wethReserve, 10);
    const wethReserveInDecimal = wethReserveInInt / 10 ** 18;
    reservesArray.push(wethReserveInDecimal);
    const linkReserve = await Contract.getCollateralReserves(linkAddress);
    const linkReserveInInt = parseInt(linkReserve, 10);
    const linkReserveInDecimal = linkReserveInInt / 10 ** 18;
    reservesArray.push(linkReserveInDecimal);

    const propertyNames = [
      "0x3587b2F7E0E2D6166d6C14230e7Fe160252B0ba4",
      "0xAAD4992D949f9214458594dF92B44165Fb84dC19",
      "0x42a71137C09AE83D8d05974960fd607d40033499",
      "0xaf95Ff5fB592646D86BF240B3CaE0903b6E4dd38",
    ];
    const responseArray = reservesArray.reduce((obj, value, index) => {
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
    return "Reserve not found";
  }
};
