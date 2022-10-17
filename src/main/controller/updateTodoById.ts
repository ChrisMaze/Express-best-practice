import { NextFunction, Request, Response } from "express";
import TodoService from "../service/todoService";
import Todo from "../models/todo";
import TodoNotFoundException from "../exceptions/NotFoundException";

const todoService = new TodoService(Todo);
export const updateTodoById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todo = await todoService.updateTodoByIdService(req);
    if (todo) {
      return res.status(200).send(todo);
    } else {
      next(new TodoNotFoundException(req.params.id));
    }
  } catch (error) {
    next(error);
  }
};
