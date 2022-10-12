import { NextFunction, Request, Response } from "express";
import * as todoService from "../service/todoService";

import TodoNotFoundException from "../exceptions/NotFoundException";

export const getTodoById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const todo = await todoService.find(req);
  if (todo) {
    return res.send(todo);
  } else {
    next(new TodoNotFoundException(req.params.id));
  }
};
