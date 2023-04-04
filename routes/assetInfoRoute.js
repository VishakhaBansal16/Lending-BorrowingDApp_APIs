import express from "express";
import { assetInfo } from "../controllers/assetInfoController.js";
export const assetInfo_route = express.Router();

assetInfo_route.route("/assetInfo").get(assetInfo);
