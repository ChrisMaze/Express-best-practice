import { NextFunction, Request, Response } from "express";
import { getTodoById } from "../service/todoService";
import { NotFoundException } from "../exceptions/NotFoundException";
import logger from "../service/logger";

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
      next(new NotFoundException(req.params.id));
    }
  } catch (error) {
    logger.error(`Error occurred ${error}`);
    next(error);
  }
};
