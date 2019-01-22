import { Router } from "express";
import AuthRouter from "./endpoints/auth/auth.routes";

export default class Routes {
  public static getApiRouter(): Router {
    const router: Router = Router();

    // Mounting /health-check
    router.get("/health-check", (req, res) =>
      res.status(200).json({ message: "OK" })
    );

    // Mounting /auth route
    router.use("/auth", new AuthRouter().routes());

    return router;
  }
}
