import { Router } from "express";
import { CreateAppointmentController } from "../controllers/CreateAppointmentController";

const appointmentRoutes = Router();

const createAppointmentController = new CreateAppointmentController();

appointmentRoutes.post("/create", createAppointmentController.handle);

export { appointmentRoutes };
