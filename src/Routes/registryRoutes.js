import express from "express";
import { hasUser } from "../middlewares/verificationUser.js";
import {
  createRegistry,
  getRegistries,
} from "../controllers/registryController.js";

const registryRoutes = express.Router();

registryRoutes.post("/registries", hasUser, createRegistry);
registryRoutes.get("/registries", hasUser, getRegistries);
export default registryRoutes;
