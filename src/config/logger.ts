import * as expressWinston from "express-winston";
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
  public static getLoggerInstance(label: string = "SERVER"): Logger {
    return createLogger({
      exitOnError: false,
      format: combine(
        format.timestamp(),
        prettyPrint(),
        colorize(),
        printf(
          ({ level, timestamp, message }) =>
            `\n${level}: [${label} - ${timestamp}] - ${message}`
        )
      ),
      transports: [new transports.Console()]
    });
  }
}

const defaultTransports = [
  new transports.Console({
    format: combine(
      format.timestamp(),
      prettyPrint(),
      colorize(),
      printf(
        ({ level, meta: { error, message }, timestamp }) =>
          `\n${level}: [${timestamp}] - ${error} - ${message}`
      )
    )
  })
];

export const expressErrorLogger = expressWinston.errorLogger({
  transports: defaultTransports
});
