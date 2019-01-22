export default class APIError extends Error {
  constructor(message: string, public httpStatusCode: number) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
  }

  public toJSON() {
    return {
      statusCode: this.httpStatusCode,
      message: this.message
    };
  }

  public toString() {
    return JSON.stringify({
      statusCode: this.httpStatusCode,
      message: this.message
    });
  }
}
