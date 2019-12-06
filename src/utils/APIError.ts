import httpStatus from "http-status";
import moment, { Moment } from "moment";

export default class APIError extends Error {
  public statusCode: number;

  public timestamp: Moment;

  public path: string;

  constructor(
    message = "Something went wrong. Please try again.",
    statusCode = httpStatus.INTERNAL_SERVER_ERROR,
    path?: string
  ) {
    super();
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.message = message;
    this.statusCode = statusCode;
    this.timestamp = moment();
    this.path = path;
  }

  public toJSON() {
    return {
      statusCode: this.statusCode,
      message: this.message,
      error: this.name,
      timestamp: this.timestamp,
      path: this.path
    };
  }

  public toString() {
    return JSON.stringify(this.toJSON());
  }
}
