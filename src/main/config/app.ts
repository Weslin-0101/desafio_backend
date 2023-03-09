import express, { Express } from "express";
import SetupMiddlewares from "./middlewares";
import SetupRoutes from "./routes";

export const setupApp = async (): Promise<Express> => {
  const app = express();
  SetupMiddlewares(app);
  SetupRoutes(app);

  return app;
};
