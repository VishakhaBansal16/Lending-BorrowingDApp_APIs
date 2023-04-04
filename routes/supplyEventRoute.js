import express from "express";
import { supplyAssetEvent } from "../controllers/supplyEventController.js";
export const supplyEvent_route = express.Router();

supplyEvent_route.route("/supplyAssetEvent").post(supplyAssetEvent);
