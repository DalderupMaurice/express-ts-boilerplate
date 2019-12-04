import "reflect-metadata"; // Needed for TypeORM

import fs from "fs";
import https from "https";

import app from "./config/app";
import config from "./config/constants";
import Logger from "./config/logger";

const logger = Logger.getLoggerInstance("SERVER");

const httpsOptions = {
  cert: fs.readFileSync("./certificates/cert.pem"),
  key: fs.readFileSync("./certificates/key.pem")
};

config.https
  ? https.createServer(httpsOptions, app).listen(config.port, () => {
      logger.info(`Server started over HTTPS on port ${config.port}`);
    })
  : app.listen(config.port, () => {
      logger.info(`Server started on port ${config.port} (${config.env})`);
    });
