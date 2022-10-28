import { NextFunction, Request, Response } from "express";
import logger from "../service/logger";
import { createTodo } from "../service/todoService";

export const createTodoController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todo = await createTodo(req.body);
    res.send(todo);
    return;
  } catch (error) {
    logger.error(`Error occurred ${error}`);
    next(error);
  }
};
