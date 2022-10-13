import { HttpException } from "../exceptions/HttpException";
import { NextFunction, Request, Response } from "express";
import { MessageEnum } from "../enum/enum";

const reg = /^[\d]+$/;
export const paramsVerify = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!reg.test(req.params.id)) {
    next(new HttpException(404, MessageEnum.INVALID_ID));
  } else {
    next();
  }
};
