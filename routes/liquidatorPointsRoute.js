import express from "express";
import { liquidatorPoints } from "../controllers/liquidatorPointsController.js";
export const liquidatorPoints_route = express.Router();

liquidatorPoints_route.route("/liquidatorPoints").get(liquidatorPoints);
