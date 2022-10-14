import { NextFunction, Request, Response } from "express";
import { getAllTodosService } from "../service/todoService";

export const getAllTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todos = await getAllTodosService();
    return res.send(todos);
  } catch (error) {
    next(error);
  }
};
