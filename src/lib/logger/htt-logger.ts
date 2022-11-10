/* eslint-disable @typescript-eslint/no-unused-vars */
import { IError } from "@lib/errors";
import { NextFunction, Request, Response } from "express";

import wiston from "winston";

type IExpressReqResLoggerParams = { logger: wiston.Logger };

type IExpressResponseLoggerResponse = (
  req: Request,
  res: Response,
  next: NextFunction
) => void;

type IExpressErrorLogger = (
  rr: IError,
  req: Request,
  _res: Response,
  _: NextFunction
) => Response;

type IHttpLogger = {
  req_logger: (
    param: IExpressReqResLoggerParams
  ) => IExpressResponseLoggerResponse;
  err_logger: (param: IExpressReqResLoggerParams) => IExpressErrorLogger;
};

function expressRequestLogger(
  opts: IExpressReqResLoggerParams
): IExpressResponseLoggerResponse {
  const { logger } = opts;

  return (req: Request, res: Response, next: NextFunction): void => {
    function onResDone(_err: Error) {
      res.removeListener("finish", onResDone);
      res.removeListener("error", onResDone);
    }

    logger.info(
      `handled ${req.method} ${req.path}. Body ${JSON.stringify(req.body)}`
    );

    res.on("finish", onResDone);
    res.on("error", onResDone);

    next();
  };
}

function expressErrorLogger(
  opts: IExpressReqResLoggerParams
): IExpressErrorLogger {
  return (
    err: IError,
    _req: Request,
    _res: Response,
    _: NextFunction
  ): Response => {
    return _res.status(err.status || 500).json({
      error: {
        errorType: err.type,
        message: err.message,
      },
    });
  };
}

const httpLogger = {
  err_logger: expressErrorLogger,
  req_logger: expressRequestLogger,
} as IHttpLogger;

export default httpLogger;
