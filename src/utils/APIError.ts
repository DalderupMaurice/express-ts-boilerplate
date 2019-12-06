import httpStatus from "http-status";

export default class APIError extends Error {
  public statusCode: number;

  constructor(
    message = "Something went wrong. Please try again.",
    statusCode = httpStatus.INTERNAL_SERVER_ERROR
  ) {
    super();
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.message = message;
    this.statusCode = statusCode;
  }

  public toJSON() {
    return {
      statusCode: this.statusCode,
      message: this.message
    };
  }

  public toString() {
    return JSON.stringify({
      statusCode: this.statusCode,
      message: this.message
    });
  }
}
