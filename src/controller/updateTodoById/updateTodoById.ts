import { NextFunction, Request, Response } from "express";
import * as todoService from "../../service/todoService";
import TodoNotFoundException from "../../exceptions/NotFoundException";

export const updateTodoById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todo = await todoService.update(req);
    if (todo != null) {
      return res.status(200).send(todo);
    } else {
      next(new TodoNotFoundException(req.params.id));
    }
  } catch (error) {
    next(error);
  }
};
