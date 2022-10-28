import { NextFunction, Request, Response } from "express";
import logger from "../service/logger";
import { removeAllTodos } from "../service/todoService";

export const deleteAllTodosController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const meaasge = await removeAllTodos();
    res.send(meaasge);
    return;
  } catch (error) {
    logger.error(`Error occurred ${error}`);
    next(error);
  }
};
