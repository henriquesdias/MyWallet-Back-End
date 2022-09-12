import express from "express";
import { hasUser } from "../middlewares/verificationUser.js";
import {
  createRegistry,
  getRegistries,
  deleteRegistry,
  updateRegistry,
} from "../controllers/registryController.js";
import { schemaCreateRegistry } from "../middlewares/schemaCreateRegistry.js";

const registryRoutes = express.Router();
registryRoutes.post(
  "/registries",
  hasUser,
  schemaCreateRegistry,
  createRegistry
);
registryRoutes.get("/registries", hasUser, getRegistries);
registryRoutes.delete("/registries/:idRegistry", hasUser, deleteRegistry);
registryRoutes.put("/registries/:idRegistry", hasUser, updateRegistry);

export default registryRoutes;
