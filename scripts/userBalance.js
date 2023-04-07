import dotenv from "dotenv/config";
import { ethers } from "ethers";
import { DAI_ABI } from "../ABI/DAI_ABI.js";
import { WETH_ABI } from "../ABI/WETH_ABI.js";
import { WBTC_ABI } from "../ABI/WBTC_ABI.js";
import { WMATIC_ABI } from "../ABI/WMATIC_ABI.js";
import { usdcImplementationABI } from "../ABI/usdcImplementationABI.js";

export const initBalance = async (address) => {
  const alchemyUrl = process.env.ALCHEMY_URL;
  const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);
  const daiAddress = "0x4DAFE12E1293D889221B1980672FE260Ac9dDd28";
  const wethAddress = "0xE1e67212B1A4BF629Bdf828e08A3745307537ccE";
  const wbtcAddress = "0x4B5A0F4E00bC0d6F16A593Cae27338972614E713";
  const wmaticAddress = "0xfec23a9E1DBA805ADCF55E0338Bf5E03488FC7Fb";
  const usdcProxyAddress = "0xDB3cB4f2688daAB3BFf59C24cC42D4B6285828e9";
  try {
    const daiContract = new ethers.Contract(daiAddress, DAI_ABI, provider);
    const wethContract = new ethers.Contract(wethAddress, WETH_ABI, provider);
    const wbtcContract = new ethers.Contract(wbtcAddress, WBTC_ABI, provider);
    const wmaticContract = new ethers.Contract(
      wmaticAddress,
      WMATIC_ABI,
      provider
    );
    const usdcContract = new ethers.Contract(
      usdcProxyAddress,
      usdcImplementationABI,
      provider
    );
    const balanceArray = [];
    const daiBalance = await daiContract.balanceOf(address);
    const daiBalanceInDecimal = parseInt(daiBalance, 10);
    balanceArray.push(daiBalanceInDecimal); //adding a named element
    const wethBalance = await wethContract.balanceOf(address);
    const wethBalanceInDecimal = parseInt(wethBalance, 10);
    balanceArray.push(wethBalanceInDecimal);
    const wbtcBalance = await wbtcContract.balanceOf(address);
    const wbtcBalanceInDecimal = parseInt(wbtcBalance, 10);
    balanceArray.push(wbtcBalanceInDecimal);
    const wmaticBalance = await wmaticContract.balanceOf(address);
    const wmaticBalanceInDecimal = parseInt(wmaticBalance, 10);
    balanceArray.push(wmaticBalanceInDecimal);
    const usdcBalance = await usdcContract.balanceOf(address);
    const usdcBalanceInDecimal = parseInt(usdcBalance, 10);
    balanceArray.push(usdcBalanceInDecimal);

    const propertyNames = [
      "0x4DAFE12E1293D889221B1980672FE260Ac9dDd28",
      "0xE1e67212B1A4BF629Bdf828e08A3745307537ccE",
      "0x4B5A0F4E00bC0d6F16A593Cae27338972614E713",
      "0xfec23a9E1DBA805ADCF55E0338Bf5E03488FC7Fb",
      "0xDB3cB4f2688daAB3BFf59C24cC42D4B6285828e9",
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
    return "Transaction not found";
  }
};
