import EnsureAuthenticated from "@infra/http/middlewares/ensureAuthenticated";
import { Router } from "express";
import { CreateBarberController } from "../controllers/CreateBarberController";
import { ListAllBarbersController } from "../controllers/ListAllBarbersController";

const barberRoutes = Router();

const createBarberController = new CreateBarberController();
const listAllBarbersController = new ListAllBarbersController();

barberRoutes.post("/register", createBarberController.handle);

barberRoutes.get("/list", EnsureAuthenticated, listAllBarbersController.handle);

export { barberRoutes };
