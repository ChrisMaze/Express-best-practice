import { NextFunction, Request, Response } from "express";
import { create } from "../../service/todoService";

export const createTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log(req);
    const todo = await create(req);
    return res.status(201).send(todo);
  } catch (error) {
    next(error);
  }
};
