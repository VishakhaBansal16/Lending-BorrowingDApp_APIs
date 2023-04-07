import dotenv from "dotenv/config";
import { ethers } from "ethers";
import { DAI_ABI } from "../ABI/DAI_ABI.js";
import { WETH_ABI } from "../ABI/WETH_ABI.js";
import { WBTC_ABI } from "../ABI/WBTC_ABI.js";
import { WMATIC_ABI } from "../ABI/WMATIC_ABI.js";
import { usdcImplementationABI } from "../ABI/usdcImplementationABI.js";

export const initAllowance = async (owner, asset) => {
  const alchemyUrl = process.env.ALCHEMY_URL;
  const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);
  const daiAddress = "0x4DAFE12E1293D889221B1980672FE260Ac9dDd28";
  const wethAddress = "0xE1e67212B1A4BF629Bdf828e08A3745307537ccE";
  const wbtcAddress = "0x4B5A0F4E00bC0d6F16A593Cae27338972614E713";
  const wmaticAddress = "0xfec23a9E1DBA805ADCF55E0338Bf5E03488FC7Fb";
  const usdcProxyAddress = "0xDB3cB4f2688daAB3BFf59C24cC42D4B6285828e9";
  const usdcImplementationAddress =
    "0x984682e62f2D277969c381815F607bCBf1511bDD";
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
    const spender = "0x6Cd33556D458aC78Cc17b55Eb75B17d23E4deE57"; //implementation contract address

    if (asset === daiAddress) {
      const allowance = await daiContract.allowance(owner, spender);
      const allowanceInDecimal = parseInt(allowance, 10);
      return allowanceInDecimal;
    } else if (asset === wethAddress) {
      const allowance = await wethContract.allowance(owner, spender);
      const allowanceInDecimal = parseInt(allowance, 10);
      return allowanceInDecimal;
    } else if (asset === wbtcAddress) {
      const allowance = await wbtcContract.allowance(owner, spender);
      const allowanceInDecimal = parseInt(allowance, 10);
      return allowanceInDecimal;
    } else if (asset === wmaticAddress) {
      const allowance = await wmaticContract.allowance(owner, spender);
      const allowanceInDecimal = parseInt(allowance, 10);
      return allowanceInDecimal;
    } else if (asset === usdcProxyAddress) {
      const allowance = await usdcContract.allowance(owner, spender);
      const allowanceInDecimal = parseInt(allowance, 10);
      return allowanceInDecimal;
    } else {
      return "Invalid asset address";
    }
  } catch (err) {
    return "Allowance not found";
  }
};
