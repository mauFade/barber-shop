import "reflect-metadata";
import "dotenv/config";
import "express-async-errors";

import "@lib/adapters";

import { App } from "./http/app";
import { Logger } from "@lib/logger/logger";

const logger = Logger.init();

const app = new App(logger);

const PORT = Number(process.env.PORT) || 8000;

app.listen(PORT);
