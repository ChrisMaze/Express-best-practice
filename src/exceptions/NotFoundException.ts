import { HttpException } from "./HttpException";

export class TodoNotFoundException extends HttpException {
  constructor(id: string) {
    super(404, `Todo with id ${id} not found`);
  }
}
