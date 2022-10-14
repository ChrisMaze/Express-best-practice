import { NextFunction, Request, Response } from "express";
import { getTodoByIdService } from "../service/todoService";

import TodoNotFoundException from "../exceptions/NotFoundException";

export const getTodoById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todo = await getTodoByIdService(req);
    if (todo) {
      return res.send(todo);
    } else {
      next(new TodoNotFoundException(req.params.id));
    }
  } catch (error) {
    next(error);
  }
};
