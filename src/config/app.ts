import * as bodyParser from "body-parser";
import * as express from "express";
import * as expressValidator from "express-validator";
import { validationResult } from "express-validator/check";
import * as helmet from "helmet";
import * as mongoose from "mongoose";
import * as morgan from "morgan";
import routes from "../server.routes";

class App {
  public app: express.Application;
  public mongoUrl: string = "mongodb://localhost:27017/CRMdb";

  constructor() {
    this.app = express();

    this.preApiRouterMiddlewares();
    this.app.use("/", routes.getApiRouter());
    this.postApiRouterMiddlewares();

    this.mongoSetup();
  }

  private preApiRouterMiddlewares(): void {
    this.app.use(morgan("dev"));

    // parse body params and attache them to req.body
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));

    // Enable param validation middleware
    this.app.use(expressValidator());

    // secure apps by setting various HTTP headers
    this.app.use(helmet());
  }

  private postApiRouterMiddlewares(): void {}

  private mongoSetup(): void {
    (mongoose as any).Promise = global.Promise;
    mongoose
      .connect(
        this.mongoUrl,
        { useNewUrlParser: true }
      )
      .catch(e => console.error("No database connection", e));
  }
}

export default new App().app;
