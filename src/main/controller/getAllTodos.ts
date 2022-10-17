import { NextFunction, Request, Response } from "express";
import TodoService from "../service/todoService";
import Todo from "../models/todo";

const todoService = new TodoService(Todo);
export const getAllTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const todos = await todoService.getAllTodosService();
    return res.send(todos);
  } catch (error) {
    next(error);
  }
};
