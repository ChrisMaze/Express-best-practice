import { NextFunction, Request, Response } from "express";
import TodoService from "../service/todoService";
export class GetAllTodosController {
  constructor(private todoService: TodoService) {}
  getAllTodos = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const todos = await this.todoService.getAllTodos();
      return res.json(todos);
    } catch (error) {
      next(error);
    }
  };
}
