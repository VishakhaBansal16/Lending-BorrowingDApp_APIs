import express from "express";
import { priceFeed } from "../controllers/priceFeedController.js";
export const price_route = express.Router();
price_route.route("/priceFeed").get(priceFeed);
