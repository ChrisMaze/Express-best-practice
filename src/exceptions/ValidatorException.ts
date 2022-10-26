import { HttpException } from "./HttpException";

class ValidatorException extends HttpException {
  constructor(message: string) {
    super(422, message);
  }
}

export default ValidatorException;
