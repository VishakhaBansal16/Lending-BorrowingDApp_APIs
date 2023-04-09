import express from "express";
import { suppliedAsset } from "../controllers/suppliedAssetController.js";
export const suppliedAsset_route = express.Router();

suppliedAsset_route.route("/suppliedAsset").post(suppliedAsset);
