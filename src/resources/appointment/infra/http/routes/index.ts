import { Router } from "express";
import { CreateAppointmentController } from "../controllers/CreateAppointmentController";
import { ListAllAppointmentController } from "../controllers/ListAllAppointmentsController";
import { UpdateAppointmentBarberController } from "../controllers/UpdateAppointmentBarberController";

const appointmentRoutes = Router();

const createAppointmentController = new CreateAppointmentController();
const listAllController = new ListAllAppointmentController();
const updateAppointmentBarberController =
  new UpdateAppointmentBarberController();

appointmentRoutes.post("/create", createAppointmentController.handle);

appointmentRoutes.get("/list", listAllController.handle);

appointmentRoutes.patch("/barber", updateAppointmentBarberController.handle);

export { appointmentRoutes };
