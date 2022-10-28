import { NextFunction, Request, Response } from "express";
import { updateTodoById } from "../service/todoService";
import { TodoNotFoundException } from "../exceptions/NotFoundException";

export const updateTodoByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todo = await updateTodoById(req.params.id, req.body);
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
