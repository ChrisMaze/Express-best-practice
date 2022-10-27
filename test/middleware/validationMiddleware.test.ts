import { NextFunction, Request, Response } from "express";
import { HttpException } from "../../src/exceptions/HttpException";
import { validateParams } from "../../src/middleware/validationMiddleware";

describe("Test validateParams", () => {
  const response = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  } as any as Response;
  const mockNext: NextFunction = jest.fn();
  
  it("should return 404 when given a invalid id", async () => {
    jest.mock("../../src/exceptions/HttpException", () => {
      return new HttpException(404, "Invalid id!");
    });
    const error = new HttpException(404, "Invalid id!");
    const request = {
      params: {
        id: "9.2c",
      },
    } as any as Request;

    await validateParams(
      request as Request,
      response as Response,
      mockNext as NextFunction
    );

    expect(mockNext).toHaveBeenCalledWith(error);
  });

  it("should call next function when given a valid id", async () => {
    const request = {
      params: {
        id: "635748a3eb495292d320f5db",
      },
    } as any as Request;

    await validateParams(
      request as Request,
      response as Response,
      mockNext as NextFunction
    );
    expect(mockNext).toHaveBeenCalled();
  });
});
