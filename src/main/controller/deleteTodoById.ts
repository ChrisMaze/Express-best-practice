import TodoNotFoundException from "../exceptions/NotFoundException";
import { NextFunction, Request, Response } from "express";
import TodoService from "../service/todoService";
import Todo from "../models/todo";
export class DeleteTodoByIdController {
  todoService: TodoService;
  constructor() {
    this.todoService = new TodoService(Todo);
  }
  deleteTodoById = async (req: Request, res: Response, next: NextFunction) => {
    const todo = await this.todoService.removeTodoById(req.params.id);
    if (todo) {
      return res.send(todo);
    } else {
      next(new TodoNotFoundException(req.params.id));
    }
  };
}
