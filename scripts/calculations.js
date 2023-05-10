import dotenv from "dotenv/config";
import { ethers } from "ethers";
import { LBDappABI } from "../ABI/LBDappImplABI.js";
import { assetsABI } from "../ABI/assetsABI.js";
import { logger } from "../logger.js";
import { TokenInfo } from "../models/userSupplyInfoModel.js";

const alchemyUrl = process.env.ALCHEMY_URL;
const provider = new ethers.providers.JsonRpcProvider(alchemyUrl);

const proxyAddress = "0x2f5B9748001556E69C9248f1649FA71332d7FF31";
const contract = new ethers.Contract(proxyAddress, LBDappABI, provider);
const oraclePrices = [];
//getting oracle price of all 4 listed assets
for (let numAsset = 0; numAsset < 4; numAsset++) {
  const responseArray = await contract.getAssetInfo(numAsset);
  const priceFeed = responseArray[2];
  const price = await contract.getCompoundPrice(priceFeed);
  const priceInInteger = parseInt(price, 10);
  oraclePrices.push(priceInInteger);
}

const propertyNames = [
  "offset",
  "asset",
  "priceFeed",
  "scale",
  "borrowCollateralFactor",
  "liquidateCollateralFactor",
  "liquidationFactor",
  "supplyCap",
];
let responseObject;
const infos = [];
//getting info of all 4 listed assets
for (let numAsset = 0; numAsset < 4; numAsset++) {
  const responseArray = await contract.getAssetInfo(numAsset);
  responseObject = responseArray.reduce((obj, value, index) => {
    if (typeof value == "object" || value.type == "BigNumber") {
      obj[propertyNames[index]] = parseInt(value, 10);
    } else {
      obj[propertyNames[index]] = value;
    }
    return obj;
  }, {});
  infos.push(responseObject);
}
const supplyAmount = [];
let totalSuppliedCollateralInUsd = 0;
let totalBorrowCapacityInUsd = 0;

const getWithdrawableCollateral = async (account, asset, amount) => {
  const assetContract = new ethers.Contract(asset, assetsABI, provider);
  const decimals = await assetContract.decimals();
  const amountInDecimals = amount * 10 ** decimals;
  const suppliedAssetAmount = await contract.userCollateral(account, asset);
  if (amountInDecimals > suppliedAssetAmount) {
    return "false";
  }
  const supplyAmount = [];
  const asset0 = "0x3587b2F7E0E2D6166d6C14230e7Fe160252B0ba4";
  const amount0 = await contract.userCollateral(account, asset0);
  const supplyAmount0 = parseInt(amount0, 10);
  supplyAmount.push(supplyAmount0);

  const asset1 = "0xAAD4992D949f9214458594dF92B44165Fb84dC19";
  const amount1 = await contract.userCollateral(account, asset1);
  const supplyAmount1 = parseInt(amount1, 10);
  supplyAmount.push(supplyAmount1);

  const asset2 = "0x42a71137C09AE83D8d05974960fd607d40033499";
  const amount2 = await contract.userCollateral(account, asset2);
  const supplyAmount2 = parseInt(amount2, 10);
  supplyAmount.push(supplyAmount2);

  const asset3 = "0xaf95Ff5fB592646D86BF240B3CaE0903b6E4dd38";
  const amount3 = await contract.userCollateral(account, asset3);
  const supplyAmount3 = parseInt(amount3, 10);
  supplyAmount.push(supplyAmount3);

  const amount4 = await contract.balanceOf(account);
  const supplyAmount4 = parseInt(amount4, 10);
  supplyAmount.push(supplyAmount4);

  for (let i = 0; i < 4; i++) {
    const supply = supplyAmount[i] / infos[i].scale;
    const price = (oraclePrices[i] / 10 ** 8).toFixed(8);
    totalSuppliedCollateralInUsd += supply * price;
    totalBorrowCapacityInUsd +=
      supply * price * (infos[i].borrowCollateralFactor / 10 ** 18);
  }
  const usdcSuppliedAmount = await contract.balanceOf(account);
  const _usdcSuppliedAmount = usdcSuppliedAmount / 10 ** 6;
  totalBorrowCapacityInUsd = totalBorrowCapacityInUsd + _usdcSuppliedAmount;
  console.log("Total Borrow Capacity in Usd", totalBorrowCapacityInUsd);
  const basePrice = 1;

  const borrowBalance = await contract.borrowBalanceOf(account);
  const borrowedInUsd = (borrowBalance / 10 ** 6) * basePrice;
  const borrowableAmountInUsd = totalBorrowCapacityInUsd - borrowedInUsd;
  console.log("Borrowable Amount In Usd", borrowableAmountInUsd);

  const info = await contract.getAssetInfoByAddress(asset);
  const priceFeed = info[2];
  const assetPrice = await contract.getCompoundPrice(priceFeed);
  const _price = parseInt(assetPrice, 10);
  const price_ = (_price / 10 ** 8).toFixed(8);
  const withdrawableAmount = amount / 10 ** decimals;
  const withdrawableAmountInUsd = withdrawableAmount * price_;
  const borrowCollateralFactor = parseInt(info[4], 10);
  const _withdrawableAmountInUsd =
    (withdrawableAmountInUsd * borrowCollateralFactor) / 10 ** 18;
  console.log(
    "Withdrawable collateral amount in usd",
    _withdrawableAmountInUsd
  );
  if (_withdrawableAmountInUsd <= borrowableAmountInUsd) {
    return "true";
  } else {
    return "false";
  }
};

const result = await getWithdrawableCollateral(
  "0xD04c0B4ab8C97c3F3Ee3630E617a93d7BD3C535E",
  "0xAAD4992D949f9214458594dF92B44165Fb84dC19",
  "0.1"
);
console.log(result);
