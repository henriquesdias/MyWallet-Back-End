import express from "express";
import cors from "cors";
import userRoutes from "./src/Routes/userRoutes.js";
import registryRoutes from "./src/Routes/registryRoutes.js";
import sessionRoutes from "./src/Routes/sessionsRoutes.js";
const server = express();
server.use(express.json());
server.use(cors());
server.use(userRoutes);
server.use(registryRoutes);
server.use(sessionRoutes);

server.listen(5000, () => console.log("Listening on port 5000"));
