import TodoNotFoundException from "../exceptions/NotFoundException";
import { NextFunction, Request, Response } from "express";
import TodoService from "../service/todoService";
import Todo from "../models/todo";

const todoService = new TodoService(Todo);
export const deleteTodoById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todo = await todoService.removeTodoByIdService(req.params.id);
    if (todo) {
      return res.status(200).send(todo);
    } else {
      next(new TodoNotFoundException(req.params.id));
    }
  } catch (error) {
    next(error);
  }
};
