import ecsFormat from "@elastic/ecs-winston-format";
import winston, { LogCallback } from "winston";

export class Logger {
  private logger: winston.Logger;

  static init(): winston.Logger {
    if (this.prototype.logger !== undefined) {
      return this.prototype.logger;
    }

    const logger: winston.Logger = winston.createLogger({
      format: ecsFormat(),
      transports: [new winston.transports.Console()],
    });

    this.prototype.logger = logger;

    return logger;
  }

  static info(message: string, callback?: LogCallback): void {
    this.prototype.logger.info(message, callback);
  }
}
