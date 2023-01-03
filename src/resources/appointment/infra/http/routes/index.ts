import { Router } from "express";
import { createAppointmentValidator } from "../../validators/CreateAppointmentValidator";
import { softDeleteAppointmentValidator } from "../../validators/SoftDeleteAppointmentValidator";
import { updateAppointmentBarberValidator } from "../../validators/UpdateAppointmentBarberValidator";
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

appointmentRoutes.post(
  "/create",
  createAppointmentValidator,
  createAppointmentController.handle
);

appointmentRoutes.get("/list", listAllController.handle);

appointmentRoutes.patch(
  "/barber",
  updateAppointmentBarberValidator,
  updateAppointmentBarberController.handle
);

appointmentRoutes.delete(
  "/:appointmentId",
  softDeleteAppointmentValidator,
  softDeleteAppointmentController.handle
);

export { appointmentRoutes };
