import http, { Server } from "http";
import express, { Express } from "express";
import winston from "winston";
import cors from "cors";
import httpLogger from "@lib/logger/htt-logger";
import { v1Routes } from "./api/routes/v1";
import { errors } from "celebrate";
import { Logger } from "@lib/logger/logger";

export class App {
  private server: Server;

  private app: Express;

  constructor(private logger: winston.Logger) {
    this.app = express();
    this.server = http.createServer(this.app);

    this.configs();
    this.routes();
    this.handleParseErrors();
  }

  private configs(): void {
    this.app.use(
      cors({
        origin: "*",
      })
    );

    this.app.use(express.json());
  }

  private routes(): void {
    this.app.use(httpLogger.req_logger({ logger: this.logger }));

    this.app.use(v1Routes);
  }

  private handleParseErrors(): void {
    this.app.use(errors({ statusCode: 422 }));

    this.app.use(httpLogger.err_logger({ logger: this.logger }));
  }

  public listen(port: number): void {
    this.server.listen(port);

    Logger.info(`App run in port ${port}`);
  }
}
