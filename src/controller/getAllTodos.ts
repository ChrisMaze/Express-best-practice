import { NextFunction, Request, Response } from "express";
import logger from "../service/logger";
import { getAllTodos } from "../service/todoService";

export const getAllTodosController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todos = await getAllTodos();
    res.send(todos);
    return;
  } catch (error) {
    logger.error(`Error occurred ${error}`);
    next(error);
  }
};
