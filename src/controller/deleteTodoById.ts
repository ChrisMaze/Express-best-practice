import { NotFoundException } from "../exceptions/NotFoundException";
import { NextFunction, Request, Response } from "express";
import { removeTodoById } from "../service/todoService";
import logger from "../service/logger";

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
      next(new NotFoundException(req.params.id));
    }
  } catch (error) {
    logger.error(`Error occurred ${error}`);
    next(error);
  }
};
