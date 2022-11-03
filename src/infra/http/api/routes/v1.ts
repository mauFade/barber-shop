import { userRoutes } from "@resources/user/infra/http/routes/index";
import { Router } from "express";

const v1Routes = Router();

v1Routes.use("/users", userRoutes);

export { v1Routes };
