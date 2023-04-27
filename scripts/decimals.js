import dotenv from "dotenv/config";
import { ethers } from "ethers";
export const initDecimals = async (asset) => {
  const compAddress = "0x3587b2F7E0E2D6166d6C14230e7Fe160252B0ba4";
  const wbtcAddress = "0xAAD4992D949f9214458594dF92B44165Fb84dC19";
  const wethAddress = "0x42a71137C09AE83D8d05974960fd607d40033499";
  const linkAddress = "0xaf95Ff5fB592646D86BF240B3CaE0903b6E4dd38";
  const usdcAddress = "0x07865c6E87B9F70255377e024ace6630C1Eaa37F";
  try {
    if (asset == compAddress) {
      return 18;
    }
    if (asset == wbtcAddress) {
      return 8;
    }
    if (asset == wethAddress) {
      return 18;
    }
    if (asset == linkAddress) {
      return 18;
    }
    if (asset == usdcAddress) {
      return 6;
    }
  } catch (err) {
    return "Asset aaddress is invalid";
  }
};
