import dotenv from "dotenv/config";
import { ethers } from "ethers";
import { LBDappABI } from "../ABI/LBDappImplABI.js";

export const initWithdraw = async (asset, amount) => {
  const alchemyUrl = process.env.ALCHEMY_URL;
  const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);
  const proxyContractAddress = "0x5D1fd78f04Ac6dAAdC640dE031bd0ec33A5ab511";

  try {
    const implementationContract = new ethers.Contract(
      proxyContractAddress,
      LBDappABI,
      provider
    );
    if (asset == "0x4DAFE12E1293D889221B1980672FE260Ac9dDd28") {
      amount = amount * 10 ** 18;
    }
    if (asset == "0xDB3cB4f2688daAB3BFf59C24cC42D4B6285828e9") {
      amount = amount * 10 ** 6;
    }
    if (asset == "0xE1e67212B1A4BF629Bdf828e08A3745307537ccE") {
      amount = amount * 10 ** 18;
    }
    if (asset == "0x4B5A0F4E00bC0d6F16A593Cae27338972614E713") {
      amount = amount * 10 ** 8;
    }
    if (asset == "0xfec23a9E1DBA805ADCF55E0338Bf5E03488FC7Fb") {
      amount = amount * 10 ** 18;
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
      chainId: 80001,
      gasPrice: 1000000000,
      gasLimit: 200000,
      nonce: 0,
    };
    return transactionObject;
  } catch (err) {
    return "Transaction object not found";
  }
};
