import { Router } from "express";

import CompanyCtrl from "./company.controller";
import { loginScheme } from "./company.schemes";

export default class Routes {
  public router: Router = Router();

  public routes(): Router {
    /** POST /auth/login - Returns token if correct username and password is provided */
    this.router
      .route("/:companyNumber")
      .post(CompanyCtrl.findCompanyByCompanyNumber);

    return this.router;
  }
}
