import { NextFunction, Request, Response } from "express";
import * as todoService from "../service/todoService";
import { MessageEnum } from "../enum/enum";
import { HttpException } from "../exceptions/HttpException";

export const deleteAllTodos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await todoService.removeAll;
  next(new HttpException(200, MessageEnum.CLEAR));
};
