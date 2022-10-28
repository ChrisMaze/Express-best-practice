import { NextFunction, Request, Response } from "express";
import { MessageEnum } from "../enum/enum";
import ValidatorException from "../exceptions/ValidatorException";

export const validateParams = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const reg = /^[0-9a-zA-Z]{24}$/;
  if (!reg.test(req.params.id)) {
    next(new ValidatorException(MessageEnum.INVALID_ID));
  } else {
    next();
  }
};
