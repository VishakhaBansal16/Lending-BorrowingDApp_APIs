import express from "express";
import { borrowedAsset } from "../controllers/borrowedAssetController.js";
export const borrowedAsset_route = express.Router();

borrowedAsset_route.route("/borrowedAsset").post(borrowedAsset);
