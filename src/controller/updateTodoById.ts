import { NextFunction, Request, Response } from "express";
import { updateTodoById } from "../service/todoService";
import { NotFoundException } from "../exceptions/NotFoundException";
import logger from "../service/logger";

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
      next(new NotFoundException(req.params.id));
    }
  } catch (error) {
    logger.error(`Error occurred ${error}`);
    next(error);
  }
};
