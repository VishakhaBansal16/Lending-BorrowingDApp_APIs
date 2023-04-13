import { initPriceFeed } from "../scripts/priceFeed.js";

export const priceFeed = async (req, res) => {
  try {
    const result = await initPriceFeed();

    if (!result) {
      res.send("Page not found");
    }

    res.send(result);
  } catch (err) {
    res.send("Price not found");
  }
};
