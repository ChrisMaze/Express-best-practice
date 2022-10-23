import { NextFunction, Request, Response } from "express";
import TodoService from "../service/todoService";
import TodoNotFoundException from "../exceptions/NotFoundException";
import Todo from "../models/todo";
export class UpdateTodoByIdController {
  todoService: TodoService;
  constructor() {
    this.todoService = new TodoService(Todo);
  }
  updateTodoById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const todo = await this.todoService.updateTodoById(
        req.params.id,
        req.body
      );
      if (todo) {
        return res.send(todo);
      } else {
        next(new TodoNotFoundException(req.params.id));
      }
    } catch (error) {
      next(error);
    }
  };
}
