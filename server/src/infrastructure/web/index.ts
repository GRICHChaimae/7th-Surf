import express, { Express } from "express";
import { createUserRoutes } from "./routes/UserRoutes";
import { userController } from "../composition/UserDependencies";

export function createApp(): Express {
  const app = express();

  app.use(express.json());

  app.use("/user", createUserRoutes(userController));

  return app;
}