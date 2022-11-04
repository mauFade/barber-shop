import { Router } from "express";
import { CreateBarberController } from "../controllers/CreateBarberController";

const barberRoutes = Router();

const createBarberController = new CreateBarberController();

barberRoutes.post("/register", createBarberController.handle);

export { barberRoutes };
