import httpStatus from "http-status";

import APIError from "./APIError";

export default class UserNotFoundError extends APIError {
  constructor(message: string, path?: string) {
    super(message || "User not found.", httpStatus.NOT_FOUND, path);
  }
}
