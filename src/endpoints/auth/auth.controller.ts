import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import { omit } from "lodash";

import config from "../../config/constants";
import APIError from "../../utils/APIError";

import User from "./auth.model";

export default class ContactController {
  public static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { username, password } = req.body;

      const foundUser = await User.getByUsername(username);

      const passwordMatches = await bcrypt.compare(
        password,
        foundUser.password
      );

      if (!passwordMatches) {
        return next(new APIError("Wrong password", httpStatus.UNAUTHORIZED));
      }

      const token = jwt.sign(
        { ...omit(foundUser.toJSON(), "password", "__v") },
        config.jwtSecret
      );

      return res.status(httpStatus.OK).json({
        token
      });
    } catch (e) {
      return next(e);
    }
  }

  public static async register(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const {
        username,
        password,
        role,
        affiliation,
        identification
      } = req.body;

      const encryptedPass = await bcrypt.hash(password, config.saltRounds);

      const user = new User({
        username,
        password: encryptedPass,
        role,
        affiliation,
        identification
      });

      const savedUser = await user.save();
      return res
        .status(httpStatus.OK)
        .json(omit(savedUser.toJSON(), "password", "__v"));
    } catch (e) {
      return next(e);
    }
  }
}
