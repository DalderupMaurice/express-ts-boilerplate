import { createLogger, format, Logger, transports } from "winston";
const { prettyPrint, colorize, combine, printf } = format;

export default class Helpers {
  /**
   * Winston Logger with default level: debug
   *
   * @static
   * @param {string} label
   * @param {string} [level]
   * @returns {LoggerInstance}
   * @memberof Helpers
   */
  public static getLoggerInstance(
    label: string = "FABRIC",
    level: string = "debug"
  ): Logger {
    return createLogger({
      exitOnError: false,
      format: combine(
        format.timestamp(),
        prettyPrint(),
        colorize(),
        printf(
          ({ timestamp, message }) =>
            `${level}: [${label} - ${timestamp}] - ${message} \n\n`
        )
      ),
      transports: [new transports.Console()]
    });
  }
}
