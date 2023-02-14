import { Router } from "express";

import { signIn, signUp } from "../controllers/userController.js";
import { validateBody } from "../middlewares/validateBody.js";
import { userSchema, loginSchema } from "../schemas/auth.js";

const userRoutes = Router();

userRoutes
  .post("/sign-up", validateBody(userSchema), signUp)
  .post("/sign-in", validateBody(loginSchema), signIn);

export default userRoutes;
