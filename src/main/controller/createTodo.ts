import { NextFunction, Request, Response } from "express";
import TodoService from "../service/todoService";
import Todo from "../models/todo";
export class CreateTodoController {
  todoService: TodoService;
  constructor() {
    this.todoService = new TodoService(Todo);
  }
  createTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const todo = await this.todoService.createTodo(req.body);
      return res.send(todo);
    } catch (error) {
      next(error);
    }
  };
}
