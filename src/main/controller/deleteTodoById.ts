import { NextFunction, Request, Response } from "express";
import { removeTodoByIdService } from "../service/todoService";
import TodoNotFoundException from "../exceptions/NotFoundException";

export const deleteTodoById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todo = await removeTodoByIdService(req);
    if (todo) {
      return res.status(200).send(todo);
    } else {
      next(new TodoNotFoundException(req.params.id));
    }
  } catch (error) {
    next(error);
  }
};
