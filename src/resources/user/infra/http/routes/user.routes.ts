import { Router } from "express";
import { CreateUserValidator } from "../../validators/CreateUserValidators";
import { CreateUserController } from "../controllers/CreateUserController";

const userRoutes = Router();

const createUserController = new CreateUserController();

userRoutes.post("/register", CreateUserValidator, createUserController.handle);

export { userRoutes };
