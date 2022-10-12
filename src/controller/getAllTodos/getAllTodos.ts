import { Request, Response } from "express";
import * as todoService from "../service/todoService";

export const getAllTodos = async (req: Request, res: Response) => {
  const todos = await todoService.findAll();
  return res.send(todos);
};
