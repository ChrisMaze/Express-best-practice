import logger from "../service/logger";

export class HttpException extends Error {
  public status: number;
  public message: string;
  constructor(status: number, message: string) {
    logger.error(`Error occurred: ${status} ${message}`);
    super(message);
    this.status = status;
    this.message = message;
  }
}
