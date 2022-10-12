import { NextFunction, Request, Response } from "express";
import * as todoService from "../service/todoService";
import TodoNotFoundException from "../exceptions/NotFoundException";

export const deleteTodoById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const todo = await todoService.remove(req);
  if (todo != null) {
    return res.status(200).send(todo);
  } else {
    next(new TodoNotFoundException(req.params.id));
  }
};
