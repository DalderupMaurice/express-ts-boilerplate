import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

import { expressErrorLogger } from "../config/logger";
import APIError from "../utils/APIError";

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

  expressErrorLogger.error(error);

  return res.status(error.statusCode).json(error.toJSON());
}

export function notFoundHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {
  return next(
    new APIError(
      `${req.method} on route ${req.url} not found`,
      httpStatus.NOT_FOUND
    )
  );
}
