import { NextFunction, Request, Response } from "express";
import { ErrorFormatter, validationResult } from "express-validator/check";
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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const errArray = errors.array();
    const errMessage =
      errArray.length > 1
        ? errArray.reduce(
            (accum: string[], e: Error) => accum.push(`${e.msg}, `),
            []
          )
        : (errArray[0] as Error).msg;
    return res.status(UNPROCESSABLE_ENTITY).json({ errors: errMessage });
  }

  next();
}
