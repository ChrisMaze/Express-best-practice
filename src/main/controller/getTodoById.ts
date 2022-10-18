import { NextFunction, Request, Response } from "express";
import TodoService from "../service/todoService";
import TodoNotFoundException from "../exceptions/NotFoundException";

export class GetTodoByIdController {
  constructor(private todoService: TodoService) {}
  getTodoById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const todo = await this.todoService.getTodoById(req.params.id);
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
