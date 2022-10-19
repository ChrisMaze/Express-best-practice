import { NextFunction, Request, Response } from "express";
import TodoService from "../service/todoService";
export class DeleteAllTodosController {
  constructor(private todoService: TodoService) {}
  deleteAllTodos = async (req: Request, res: Response, next: NextFunction) => {
    try {
      await this.todoService.removeAllTodos();
      return res.json("Delete all todos!");
    } catch (error) {
      next(error);
    }
  };
}
