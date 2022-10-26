import { HttpException } from "../exceptions/HttpException";
import { NextFunction, Request, Response } from "express";
import { MessageEnum } from "../enum/enum";

export const ParamsVerify = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const reg = /^[0-9a-zA-Z]{24}$/;
  if (!reg.test(req.params.id)) {
    next(new HttpException(404, MessageEnum.INVALID_ID));
  } else {
    next();
  }
};
