import { NextFunction, Request, Response } from "express";
import { MessageEnum } from "../enum/enum";
import { body, param, validationResult } from "express-validator";
import ValidatorException from "../exceptions/ValidatorException";

// import { ITodo } from "./types/ITodo";

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
export const createSchema = [
  body("title")
    .isLength({ min: 1 })
    .withMessage(MessageEnum.TITLE_VERIFY_MESSAGE),
  body("description")
    .isString()
    .isLength({ max: 50 })
    .withMessage(MessageEnum.DESCRIPTION_VERIFY_MESSAGE),
  body("status")
    .isIn(["Overdue", "Completed", "Completed", "Active"])
    .withMessage(MessageEnum.STATUS_VERIFY_MESSAGE),
  body("startDate")
    .isISO8601()
    .withMessage(MessageEnum.START_DATE_VERIFY_MESSAGE),
  body("dueDate").isISO8601().withMessage(MessageEnum.DUE_DATE_VERIFY_MESSAGE),
];

export const updateSchema = [
  param("id")
    .matches(/^[0-9a-zA-Z]{24}$/)
    .withMessage(MessageEnum.INVALID_ID),
  body("title")
    .optional()
    .isLength({ min: 1 })
    .trim()
    .withMessage(MessageEnum.TITLE_VERIFY_MESSAGE),
  body("description")
    .optional()
    .isString()
    .isLength({ max: 50 })
    .trim()
    .withMessage(MessageEnum.DESCRIPTION_VERIFY_MESSAGE),
  body("status")
    .optional()
    .isIn(["Overdue", "Completed", "Completed", "Active"])
    .trim()
    .withMessage(MessageEnum.STATUS_VERIFY_MESSAGE),
  body("startDate")
    .optional()
    .isISO8601()
    .trim()
    .withMessage(MessageEnum.START_DATE_VERIFY_MESSAGE),
  body("completedDate")
    .optional()
    .isISO8601()
    .trim()
    .withMessage(MessageEnum.COMPLETED_DATE_VERIFY_MESSAGE),
  body("dueDate")
    .optional()
    .isISO8601()
    .withMessage(MessageEnum.DUE_DATE_VERIFY_MESSAGE),
];

export const validateBody = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = validationResult(req).formatWith(({ msg }) => msg);
  const hasError = !error.isEmpty();
  const message = error.array().join(" && ");
  if (hasError) {
    next(new ValidatorException(message));
  } else {
    next();
  }
};
