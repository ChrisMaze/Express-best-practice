import TodoNotFoundException from "../exceptions/NotFoundException";
import { NextFunction, Request, Response } from "express";
import TodoService from "../service/todoService";
export class DeleteTodoByIdController {
  constructor(private todoService: TodoService) {}
  deleteTodoById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const todo = await this.todoService.removeTodoById(req.params.id);
      if (todo) {
        return res.status(200).send(todo);
      } else {
        next(new TodoNotFoundException(req.params.id));
      }
    } catch (error) {
      next(error);
    }
  };
}
