import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { UNPROCESSABLE_ENTITY } from "http-status";

export interface Error {
  location: Location;
  param: string;
  msg: any;
  value: any;
}

export default function validateMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const validationResults = validationResult(req);
  if (!validationResults.isEmpty()) {
    const errArray = validationResults.array();
    const errors =
      errArray.length > 1
        ? errArray.map((e: any) => e.msg) // TODO fix any
        : [(errArray[0] as Error).msg];
    return res.status(UNPROCESSABLE_ENTITY).json({ errors });
  }

  return next();
}
