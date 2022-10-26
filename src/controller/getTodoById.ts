import { NextFunction, Request, Response } from "express";
import { getTodoById } from "../service/todoService";
import TodoNotFoundException from "../exceptions/NotFoundException";

export const getTodoByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todo = await getTodoById(req.params.id);
    if (todo) {
      res.send(todo);
      return;
    } else {
      next(new TodoNotFoundException(req.params.id));
    }
  } catch (error) {
    next(error);
  }
};
