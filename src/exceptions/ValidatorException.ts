import { HttpException } from "./HttpException";

export class ValidatorException extends HttpException {
  constructor(message: string) {
    super(422, message);
  }
}
