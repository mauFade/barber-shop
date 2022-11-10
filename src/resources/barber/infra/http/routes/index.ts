import EnsureAuthenticated from "@infra/http/middlewares/ensureAuthenticated";
import { Router } from "express";
import { CreateBarberValidator } from "../../validators/CreateBarberValidator";
import { CreateBarberController } from "../controllers/CreateBarberController";
import { ListAllBarbersController } from "../controllers/ListAllBarbersController";

const barberRoutes = Router();

const createBarberController = new CreateBarberController();
const listAllBarbersController = new ListAllBarbersController();

barberRoutes.post(
  "/register",
  CreateBarberValidator,
  createBarberController.handle
);

barberRoutes.get("/list", EnsureAuthenticated, listAllBarbersController.handle);

export { barberRoutes };
