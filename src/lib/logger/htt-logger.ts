import { NextFunction, Request, Response } from "express";

import wiston from "winston";

type IExpressReqResLoggerParams = { logger: wiston.Logger };

type IExpressResponseLoggerParams = (
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
