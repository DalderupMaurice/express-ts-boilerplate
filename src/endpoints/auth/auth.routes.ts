import { Router } from "express";

import validate from "../../middleware/validate";
import AuthCtrl from "./auth.controller";
import { loginScheme, registerScheme } from "./auth.schemes";

export default class Routes {
  public router: Router = Router();

  public routes(): Router {
    /** POST /auth/login - Returns token if correct username and password is provided */
    this.router.route("/login").post(loginScheme, validate, AuthCtrl.login);

    /** POST /auth/register - Returns the registered user */
    this.router
      .route("/register")
      .post(registerScheme, validate, AuthCtrl.register);

    return this.router;
  }
}
