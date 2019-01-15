import * as bodyParser from "body-parser";
import * as express from "express";
import * as helmet from "helmet";
import * as mongoose from "mongoose";
import { Routes } from "./routes/crmRoutes";

class App {
  public app: express.Application;
  public routePrv: Routes = new Routes();
  public mongoUrl: string = "mongodb://localhost:27017/CRMdb";

  constructor() {
    this.app = express();
    this.config();
    this.routePrv.routes(this.app);
    this.mongoSetup();
  }

  private config(): void {
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: true }));
    this.app.use(helmet());
    // serving static files
    this.app.use(express.static("public"));
  }

  private mongoSetup(): void {
    (mongoose as any).Promise = global.Promise;
    mongoose.connect(
      this.mongoUrl,
      { useNewUrlParser: true }
    );
  }
}

export default new App().app;
