import EnsureAuthenticated from "@infra/http/middlewares/ensureAuthenticated";
import { appointmentRoutes } from "@resources/appointment/infra/http/routes";
import { barberRoutes } from "@resources/barber/infra/http/routes";
import { sessionRoutes } from "@resources/user/infra/http/routes/auth.routes";
import { userRoutes } from "@resources/user/infra/http/routes/user.routes";
import { Router } from "express";

const v1Routes = Router();

v1Routes.use("/login", sessionRoutes);
v1Routes.use("/users", userRoutes);
v1Routes.use("/barber", barberRoutes);
v1Routes.use("/appointment", EnsureAuthenticated, appointmentRoutes);

export { v1Routes };
