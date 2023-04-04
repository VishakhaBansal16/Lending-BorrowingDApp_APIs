import express from "express";
import { initializeStorage } from "../controllers/initializeStorageController.js";
export const storage_route = express.Router();

storage_route.route("/initializeStorage").get(initializeStorage);
