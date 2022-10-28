import { NextFunction, Request, Response } from "express";
import { MessageEnum } from "../enum/enum";
import { body, param, validationResult } from "express-validator";
import { ValidatorException } from "../exceptions/ValidatorException";

const validateBody = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = validationResult(req).formatWith(({ msg }) => msg);
  console.log(error);
  const hasError = !error.isEmpty();
  const message = error.array().join(" && ");
  if (hasError) {
    next(new ValidatorException(message));
  } else {
    next();
  }
};
export const validateCreateInput = [
  body("title")
    .isLength({ min: 1 })
    .withMessage(MessageEnum.TITLE_VERIFY_MESSAGE),
  body("description")
    .isString()
    .isLength({ max: 250 })
    .withMessage(MessageEnum.DESCRIPTION_VERIFY_MESSAGE),
  body("status")
    .isIn(["Overdue", "Hold", "Completed", "Active"])
    .withMessage(MessageEnum.STATUS_VERIFY_MESSAGE),
  body("startDate")
    .isISO8601()
    .withMessage(MessageEnum.START_DATE_VERIFY_MESSAGE),
  body("dueDate").isISO8601().withMessage(MessageEnum.DUE_DATE_VERIFY_MESSAGE),
  validateBody,
];

export const validateUpdateInput = [
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
    .isLength({ max: 250 })
    .trim()
    .withMessage(MessageEnum.DESCRIPTION_VERIFY_MESSAGE),
  body("status")
    .optional()
    .isIn(["Overdue", "Hold", "Completed", "Active"])
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
  validateBody,
];
