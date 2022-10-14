import { NextFunction, Request, Response } from "express";
import { createTodoService } from "../service/todoService";

export const createTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todo = await createTodoService(req);
    return res.status(201).send(todo);
  } catch (error) {
    next(error);
  }
};
