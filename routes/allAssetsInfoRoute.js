import express from "express";
import { allAssetsInfo } from "../controllers/allAssetsInfoController.js";
export const allAssetsInfo_route = express.Router();

allAssetsInfo_route.route("/allAssetsInfo").get(allAssetsInfo);
