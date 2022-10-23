import { NextFunction, Request, Response } from "express";
import TodoService from "../service/todoService";
import Todo from "../models/todo";
export class DeleteAllTodosController {
  todoService: TodoService;
  constructor() {
    this.todoService = new TodoService(Todo);
  }
  deleteAllTodos = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const meaasge = await this.todoService.removeAllTodos();
      return res.send(meaasge);
    } catch (error) {
      next(error);
    }
  };
}
