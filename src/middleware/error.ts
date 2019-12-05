import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import winston from "winston";

import config from "../config/constants";
import APIError from "../utils/APIError";

if (config.env === "production") {
  winston.add(
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
      handleExceptions: true
    })
  );
}

// TODO order res, req, next?
export function apiErrorHandler(err: any, req: Request, res: Response) {
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
