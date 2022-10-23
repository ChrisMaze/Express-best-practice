import { NextFunction, Request, Response } from "express";
import TodoService from "../service/todoService";
import Todo from "../models/todo";
export class GetAllTodosController {
  todoService: TodoService;
  constructor() {
    this.todoService = new TodoService(Todo);
  }
  getAllTodos = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const todos = await this.todoService.getAllTodos();
      return res.send(todos);
    } catch (error) {
      next(error);
    }
  };
}
