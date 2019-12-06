import { createLogger, format, Logger, transports } from "winston";

import config from "./constants";

const { prettyPrint, colorize, combine, printf } = format;

export default class CustomLogger {
  /**
   * Winston Logger with default level: debug
   *
   * @static
   * @param {string} label
   * @param {string} [level]
   * @returns {LoggerInstance}
   * @memberof CustomLogger
   */
  public static getLoggerInstance(label = "SERVER"): Logger {
    return createLogger({
      exitOnError: false,
      format: combine(
        format.timestamp(),
        prettyPrint(),
        colorize(),
        printf(
          ({ level, timestamp, message }) =>
            `${level}: [${label} - ${timestamp}] - ${message}`
        )
      ),
      transports: [new transports.Console()]
    });
  }
}

export const expressErrorLogger = createLogger({
  exitOnError: false,
  format: combine(
    format.timestamp(),
    prettyPrint(),
    colorize(),
    printf(
      ({ level, name, statusCode, message, timestamp }) =>
        `\n${level}: [${name} - ${timestamp}] - ${statusCode} - ${message}\n`
    )
  ),
  transports:
    config.env === "production"
      ? [
          new transports.Console(),
          new transports.File({
            filename: "logs/error.log",
            level: "error",
            handleExceptions: true
          })
        ]
      : [new transports.Console()]
});
