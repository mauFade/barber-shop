import { Router } from "express";
import { CreateAppointmentController } from "../controllers/CreateAppointmentController";
import { ListAllAppointmentController } from "../controllers/ListAllAppointmentsController";
import { SoftDeleteAppointmentController } from "../controllers/SoftDeleteAppointmentController";
import { UpdateAppointmentBarberController } from "../controllers/UpdateAppointmentBarberController";

const appointmentRoutes = Router();

const createAppointmentController = new CreateAppointmentController();
const listAllController = new ListAllAppointmentController();
const updateAppointmentBarberController =
  new UpdateAppointmentBarberController();
const softDeleteAppointmentController = new SoftDeleteAppointmentController();

appointmentRoutes.post("/create", createAppointmentController.handle);

appointmentRoutes.get("/list", listAllController.handle);

appointmentRoutes.patch("/barber", updateAppointmentBarberController.handle);

appointmentRoutes.delete(
  "/:appointmentId",
  softDeleteAppointmentController.handle
);

export { appointmentRoutes };
