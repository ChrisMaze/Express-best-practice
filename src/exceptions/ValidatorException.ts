import logger from "../service/logger";
import { HttpException } from "./HttpException";

export class ValidatorException extends HttpException {
  constructor(message: string) {
    super(422, message);
    logger.error(`Error occurred: 422 ${message}`);
  }
}
