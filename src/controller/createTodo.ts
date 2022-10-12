import { Request, Response } from "express";
import * as todoService from "../service/todoService";

export const createTodo = async (req: Request, res: Response) => {
  const todo = await todoService.create(req);
  return res.status(201).send(todo);
};
