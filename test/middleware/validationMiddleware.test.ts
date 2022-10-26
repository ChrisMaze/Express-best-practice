import { NextFunction, Request, Response } from "express";
import { HttpException } from "../../main/exceptions/HttpException";
import { ParamsVerify } from "../../main/middleware/validationMiddleware";

describe("Test ParamsVerify", () => {
  const response = {
    status: jest.fn().mockReturnThis(),
    send: jest.fn(),
  } as any as Response;
  const mockNext: NextFunction = jest.fn();
  it("should return 404 when given a invalid id", async () => {
    jest.mock("../../main/exceptions/HttpException", () => {
      return new HttpException(404, "Invalid id!");
    });
    const error = new HttpException(404, "Invalid id!");
    const request = {
      params: {
        id: "9.2c",
      },
    } as any as Request;

    await ParamsVerify(
      request as Request,
      response as Response,
      mockNext as NextFunction
    );

    expect(mockNext).toHaveBeenCalledWith(error);
  });

  it("should call next function when given a valid id", async () => {
    const request = {
      params: {
        id: "0",
      },
    } as any as Request;

    await ParamsVerify(
      request as Request,
      response as Response,
      mockNext as NextFunction
    );
    expect(mockNext).toHaveBeenCalled();
  });
});
