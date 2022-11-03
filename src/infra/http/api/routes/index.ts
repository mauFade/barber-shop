import { Router } from "express";
import { v1Routes } from "./v1";

const appRoutes = Router();

appRoutes.get("/health-checks", (_req, res) => {
  return res.status(200).json({
    success: {
      responseType: "SUCCESS_REQUEST",
      message: "The application is healthy.",
    },
  });
});

appRoutes.use(v1Routes);

export { appRoutes };
