import { Router } from "express";

import validate from "../../middleware/validate";

import AuthController from "./auth.controller";
import { loginScheme, registerScheme } from "./auth.schemes";

export default class Routes {
  public router: Router = Router();

  public authCtrl: AuthController = new AuthController();

  public routes(): Router {
    /** POST /auth/login - Returns token if correct username and password is provided */
    this.router
      .route("/login")
      .post(loginScheme, validate, this.authCtrl.login);

    /** POST /auth/register - Returns the registered user */
    this.router
      .route("/register")
      .post(registerScheme, validate, this.authCtrl.register);

    return this.router;
  }
}
