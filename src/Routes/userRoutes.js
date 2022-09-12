import express from "express";
import { signIn, signUp } from "../controllers/userController.js";
import { schemaSignUp } from "../middlewares/schemaSignUp.js";
import { schemaSignIn } from "../middlewares/schemaSignIn.js";

const userRoutes = express.Router();
userRoutes.post("/sign-up", schemaSignUp, signUp);
userRoutes.post("/sign-in", schemaSignIn, signIn);

export default userRoutes;
