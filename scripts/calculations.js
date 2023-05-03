const borrowedUsdc = await contract.borrowBalanceOf(account);//borrowed amount + interest amount
const leftUsdcToBorrow = await contract.getBorrowableAmount(
  account
);
const totalBorrowableUsdc = borrowedUsdc + leftUsdcToBorrow;
const percentage = (leftUsdcToBorrow / totalBorrowableUsdc) * 100;
const totalCollateralSupplied = await contract.userCollateral(account, asset);
const leftCollateral = (percentage * totalCollateralSupplied) / 100;







it('Calculates the borrow capacity of an account that has supplied collateral using JS', async () => {
    const provider = new ethers.providers.JsonRpcProvider(jsonRpcUrl);
    const comet = new ethers.Contract(cometAddress, cometAbi, provider);
  
    const myAddress = addresses[0];
  
    const numAssets = await comet.callStatic.numAssets();
  
    const promisesAssets = [];
    for (let i = 0; i < numAssets; i++) {
      promisesAssets.push(comet.callStatic.getAssetInfo(i));
    }
  
    const infos = await Promise.all(promisesAssets);
    
    const promisesCollaterals = [];
    const promisesDecimals = [];
    const promisesPrices = [];
    for (let i = 0; i < numAssets; i++) {
      const { asset, priceFeed } = infos[i];
      promisesCollaterals.push(comet.callStatic.collateralBalanceOf(myAddress, asset));
      promisesPrices.push(comet.callStatic.getPrice(priceFeed));
    }
  
    const collateralBalances = await Promise.all(promisesCollaterals);
    const collateralPrices = await Promise.all(promisesPrices);
  
    const baseTokenPriceFeed = await comet.callStatic.baseTokenPriceFeed();
    const basePrice = +(await comet.callStatic.getPrice(baseTokenPriceFeed)).toString() / 1e8;
    const baseDecimals = +(await comet.callStatic.decimals()).toString();
  
    let collateralValueUsd = 0;
    let totalBorrowCapacityUsd = 0;
    for (let i = 0; i < numAssets; i++) {
      const balance = +(collateralBalances[i].toString()) / +(infos[i].scale).toString();
      const price = +collateralPrices[i].toString() / 1e8;
      collateralValueUsd += balance * price;
      totalBorrowCapacityUsd += balance * price * (+infos[i].borrowCollateralFactor.toString() / 1e18);
    }
  
    const borrowBalance = +(await comet.callStatic.borrowBalanceOf(myAddress)).toString();
    const borrowedInUsd = borrowBalance / Math.pow(10, baseDecimals) * basePrice;
  
    const borrowCapacityUsd = totalBorrowCapacityUsd - borrowedInUsd;
  
    console.log('\tMaximum borrowable amount (USD)', borrowCapacityUsd);
    console.log('\tAlready Borrowed amount (USD)', borrowedInUsd);
  
    const borrowCapacityBase = borrowCapacityUsd / basePrice;
    const borrowedInBase = borrowedInUsd / basePrice
    console.log('\tMaximum borrowable amount (base)', borrowCapacityBase);
    console.log('\tAlready Borrowed amount (base)', borrowedInBase);