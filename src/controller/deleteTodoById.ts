import TodoNotFoundException from "../exceptions/NotFoundException";
import { NextFunction, Request, Response } from "express";
import { removeTodoById } from "../service/todoService";

export const deleteTodoByIdController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todo = await removeTodoById(req.params.id);
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
