import { Router } from "express";
import { AuthenticationValidator } from "../../validators/AuthenticationValidator";
import { AuthenticateController } from "../controllers/AuthenticateController";

const sessionRoutes = Router();

const authenticateController = new AuthenticateController();

sessionRoutes.post("/", AuthenticationValidator, authenticateController.handle);

export { sessionRoutes };
