import express from "express";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";

import { apiErrorHandler, notFoundHandler } from "../middleware/error";
import routes from "../server.routes";

import config from "./constants";
import Logger, { expressErrorLogger } from "./logger";

class App {
  public app: express.Application;
  public logger = Logger.getLoggerInstance("APP");

  constructor() {
    this.app = express();

    this.preApiRouterMiddlewares();
    this.app.use("/", routes.getApiRouter());
    this.postApiRouterMiddlewares();

    this.mongoSetup();
  }

  private preApiRouterMiddlewares(): void {
    this.app.use(morgan("dev"));

    // parse body params to JSON and attach them to req.body
    this.app.use(express.json());

    // secure apps by setting various HTTP headers
    this.app.use(helmet());
  }

  private postApiRouterMiddlewares(): void {
    // catch 404 and forward to error handler
    this.app.use(notFoundHandler);

    // Logging of errors (console + file)
    this.app.use(expressErrorLogger);

    // Handling errors and converting to APIError if needed
    this.app.use(apiErrorHandler);
  }

  private mongoSetup(): void {
    (mongoose as any).Promise = global.Promise;
    mongoose
      .connect(
        config.mongoUri,
        { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }
      )
      .catch(e => {
        this.logger.error("No database connection", e);
        process.exit(1);
      });
  }
}

export default new App().app;
