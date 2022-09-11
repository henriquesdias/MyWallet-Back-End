import { deleteSession } from "../controllers/sessionsController.js";
import { hasUser } from "../middlewares/verificationUser.js";
import express from "express";

const sessionRoutes = express.Router();

sessionRoutes.delete("/session", hasUser, deleteSession);

export default sessionRoutes;
