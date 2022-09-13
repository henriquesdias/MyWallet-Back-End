import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";
import userRoutes from "./Routes/userRoutes.js";
import registryRoutes from "./Routes/registryRoutes.js";
import sessionRoutes from "./Routes/sessionsRoutes.js";

const server = express();
server.use(express.json());
server.use(cors());
server.use(userRoutes);
server.use(registryRoutes);
server.use(sessionRoutes);

server.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}`)
);
