import { NextFunction, Request, Response } from "express";
import TodoService from "../service/todoService";
import Todo from "../models/todo";
import TodoNotFoundException from "../exceptions/NotFoundException";

const todoService = new TodoService(Todo);
export const getTodoById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todo = await todoService.getTodoByIdService(req.params.id);
    if (todo) {
      return res.send(todo);
    } else {
      next(new TodoNotFoundException(req.params.id));
    }
  } catch (error) {
    next(error);
  }
};
