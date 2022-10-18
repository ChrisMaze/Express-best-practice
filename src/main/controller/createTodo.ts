import { NextFunction, Request, Response } from "express";
import TodoService from "../service/todoService";

export class CreateTodoController {
  constructor(private todoService: TodoService) {}
  createTodo = async (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log(req.body);
      const todo = await this.todoService.createTodo(req.body);
      console.log(todo);
      return res.status(201).json(todo);
    } catch (error) {
      next(error);
    }
  };
}
