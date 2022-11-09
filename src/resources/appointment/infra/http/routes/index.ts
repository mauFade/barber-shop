import { Router } from "express";
import { CreateAppointmentController } from "../controllers/CreateAppointmentController";
import { ListAllAppointmentController } from "../controllers/ListAllAppointmentsController";

const appointmentRoutes = Router();

const createAppointmentController = new CreateAppointmentController();
const listAllController = new ListAllAppointmentController();

appointmentRoutes.post("/create", createAppointmentController.handle);

appointmentRoutes.get("/list", listAllController.handle);

export { appointmentRoutes };
