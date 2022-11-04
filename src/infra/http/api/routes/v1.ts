import { barberRoutes } from "@resources/barber/infra/http/routes";
import { userRoutes } from "@resources/user/infra/http/routes/index";
import { Router } from "express";

const v1Routes = Router();

v1Routes.use("/users", userRoutes);
v1Routes.use("/barber", barberRoutes);

export { v1Routes };
