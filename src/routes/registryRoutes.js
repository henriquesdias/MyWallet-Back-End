import { Router } from "express";

import { hasUser } from "../middlewares/verificationUser.js";
import { validateBody } from "../middlewares/validateBody.js";
import { registrySchema, registryUpdate } from "../schemas/registries.js";
import {
  createRegistry,
  getRegistries,
  deleteRegistry,
  updateRegistry,
} from "../controllers/registryController.js";

const registryRoutes = Router();

registryRoutes
  .post("/registries", hasUser, validateBody(registrySchema), createRegistry)
  .get("/registries", hasUser, getRegistries)
  .delete("/registries/:idRegistry", hasUser, deleteRegistry)
  .put(
    "/registries/:idRegistry",
    validateBody(registryUpdate),
    hasUser,
    updateRegistry
  );

export default registryRoutes;
