import { NextFunction, Request, Response } from "express";
import TodoService from "../service/todoService";
import Todo from "../models/todo";

const todoService = new TodoService(Todo);
export const createTodo = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todo = await todoService.createTodoService(req.body);
    return res.status(201).send(todo);
  } catch (error) {
    next(error);
  }
};
