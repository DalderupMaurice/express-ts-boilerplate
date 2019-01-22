import { NextFunction, Request, Response } from "express";
import * as httpStatus from "http-status";
import * as winston from "winston";

import APIError from "../utils/APIError";

winston.add(
  new winston.transports.File({
    filename: "server/logs/error.log",
    level: "error",
    handleExceptions: true
  })
);

export function apiErrorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const error =
    err instanceof APIError
      ? err
      : new APIError(err.message, httpStatus.BAD_REQUEST);

  winston.error(error.toString());
  res.status(error.httpStatusCode).json(error.toJSON());
}

export function notFoundHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  next(new APIError("API route not found", httpStatus.NOT_FOUND));
}
