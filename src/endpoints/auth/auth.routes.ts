import { Router } from "express";
import { check } from "express-validator/check";

import validate from "../../middleware/validate";
import AuthController from "./auth.controller";
import { loginScheme } from "./auth.schemes";

export default class Routes {
  public router: Router = Router();

  public authCtrl: AuthController = new AuthController();

  public routes(): Router {
    /** POST /auth/login - Returns token if correct username and password is provided */
    this.router
      .route("/login")
      .post(loginScheme, validate, this.authCtrl.login);

    // this.router
    //   .route("/contact/:contactId")
    //   // get specific contact
    //   .get(this.contactController.addNewContact)
    //   .put(this.contactController.addNewContact)
    //   .delete(this.contactController.addNewContact);

    return this.router;
  }
}
