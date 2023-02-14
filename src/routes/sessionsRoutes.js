import { Router } from "express";

import { deleteSession } from "../controllers/sessionsController.js";
import { hasUser } from "../middlewares/verificationUser.js";

const sessionRoutes = Router();

sessionRoutes.delete("/session", hasUser, deleteSession);

export default sessionRoutes;
