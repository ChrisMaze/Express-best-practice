import logger from "../service/logger";
import { HttpException } from "./HttpException";

export class NotFoundException extends HttpException {
  constructor(id: string) {
    super(404, `Todo with id ${id} not found`);
    logger.error(`Error occurred: 404 Todo with id ${id} not found`);
  }
}
