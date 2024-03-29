import dotenv from "dotenv";
import express from "express";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import registryRoutes from "./routes/registryRoutes.js";
import sessionRoutes from "./routes/sessionsRoutes.js";

dotenv.config();

const server = express();
server.use(express.json());
server.use(cors());
server.use(userRoutes);
server.use(registryRoutes);
server.use(sessionRoutes);

server.listen(process.env.PORT, () =>
  console.log(`Listening on port ${process.env.PORT}`)
);
