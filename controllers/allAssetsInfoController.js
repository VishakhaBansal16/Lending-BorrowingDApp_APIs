import { initAllAssetsInfo } from "../scripts/allAssetsInfo.js";

export const allAssetsInfo = async (req, res) => {
  try {
    const result = await initAllAssetsInfo();

    if (!result) {
      res.send("Page not found");
    }

    res.send(result);
  } catch (err) {
    res.send("Info not found");
  }
};
