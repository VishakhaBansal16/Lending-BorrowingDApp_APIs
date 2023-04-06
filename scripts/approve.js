import dotenv from "dotenv/config";
import { ethers } from "ethers";
import { DAI_ABI } from "../ABI/DAI_ABI.js";
import { WETH_ABI } from "../ABI/WETH_ABI.js";
import { WBTC_ABI } from "../ABI/WBTC_ABI.js";
import { WMATIC_ABI } from "../ABI/WMATIC_ABI.js";

export const initApprove = async (asset, value) => {
  const alchemyUrl = process.env.ALCHEMY_URL;
  const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);
  const daiAddress = "0x4DAFE12E1293D889221B1980672FE260Ac9dDd28";
  const wethAddress = "0xE1e67212B1A4BF629Bdf828e08A3745307537ccE";
  const wbtcAddress = "0x4B5A0F4E00bC0d6F16A593Cae27338972614E713";
  const wmaticAddress = "0xfec23a9E1DBA805ADCF55E0338Bf5E03488FC7Fb";
  try {
    const daiContract = new ethers.Contract(daiAddress, DAI_ABI, provider);
    const wethContract = new ethers.Contract(wethAddress, WETH_ABI, provider);
    const wbtcContract = new ethers.Contract(wbtcAddress, WBTC_ABI, provider);
    const wmaticContract = new ethers.Contract(
      wmaticAddress,
      WMATIC_ABI,
      provider
    );
    const spender = "0x6Cd33556D458aC78Cc17b55Eb75B17d23E4deE57"; //implementation contract address
    const methodName = "approve";
    const params = [spender, value];

    if (asset === daiAddress) {
      const data = daiContract.interface.encodeFunctionData(methodName, params);
      const transactionObject = {
        to: daiAddress,
        data: data,
        chainId: 80001,
        gasPrice: 1000000000,
        gasLimit: 200000,
        nonce: 0,
      };
      return transactionObject;
    } else if (asset === wethAddress) {
      const data = wethContract.interface.encodeFunctionData(
        methodName,
        params
      );
      const transactionObject = {
        to: wethAddress,
        data: data,
        chainId: 80001,
        gasPrice: 1000000000,
        gasLimit: 200000,
        nonce: 0,
      };
      return transactionObject;
    } else if (asset === wbtcAddress) {
      const data = wbtcContract.interface.encodeFunctionData(
        methodName,
        params
      );
      const transactionObject = {
        to: wbtcAddress,
        data: data,
        chainId: 80001,
        gasPrice: 1000000000,
        gasLimit: 200000,
        nonce: 0,
      };
      return transactionObject;
    } else if (asset === wmaticAddress) {
      const data = wmaticContract.interface.encodeFunctionData(
        methodName,
        params
      );
      const transactionObject = {
        to: wmaticAddress,
        data: data,
        chainId: 80001,
        gasPrice: 1000000000,
        gasLimit: 200000,
        nonce: 0,
      };
      return transactionObject;
    } else {
      return "Invalid asset address";
    }
  } catch (err) {
    return "Transaction object not found";
  }
};
