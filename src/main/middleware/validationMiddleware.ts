import { HttpException } from "../exceptions/HttpException";
import { NextFunction, Request, Response } from "express";
import { MessageEnum } from "../enum/enum";
import { body, check, validationResult } from "express-validator";

const reg = /^[0-9a-zA-Z]*$/;
export const ParamsVerify = async (
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

export const BodyVerify = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  check("title").isString();
  body("description").isString().isLength({ max: 50 });
  body("status").isString();
  body("startDate").isISO8601();
  body("completedDate").isISO8601();
  body("dueDate").isISO8601();

  console.log(typeof req.body.title);
  console.log(body("title").isString());

  const error = validationResult(req).formatWith(({ msg }) => msg);
  console.log(error);

  const hasError = !error.isEmpty();
  if (hasError) {
    res.status(422).json({ error: error.array() });
  } else {
    next();
  }
};
