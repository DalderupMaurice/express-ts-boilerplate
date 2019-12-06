// import expressWinston from "express-winston"; // TODO not maintained anymore
import { createLogger, format, Logger, transports } from "winston";

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
      ({ level, meta: { error, message }, timestamp }) =>
        `\n${level}: [${timestamp}] - ${error} - ${message}`
    )
  ),
  transports: [new transports.Console()] // TODO add file transport and/or replace in error.ts
});
