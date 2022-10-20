import { NextFunction, Request, Response } from "express";
import TodoService from "../service/todoService";
import TodoNotFoundException from "../exceptions/NotFoundException";

export class UpdateTodoByIdController {
  constructor(private todoService: TodoService) {}
  updateTodoById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const todo = await this.todoService.updateTodoById(
        req.params.id,
        req.body
      );
      if (todo) {
        return res.status(200).json(todo);
      } else {
        next(new TodoNotFoundException(req.params.id));
      }
    } catch (error) {
      next(error);
    }
  };
}
