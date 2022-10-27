import { NextFunction, Request, Response } from "express";
import { deleteAllTodosController } from "../../src/controller/deleteAllTodos";
import * as todoService from "../../src/service/todoService";

describe("Test DeleteAllTodosController", () => {
  const request = {} as Request;
  let response: Response;
  const mockNext: NextFunction = jest.fn();
  const message = "Delete all todos!";

  beforeEach(() => {
    response = {
      send: jest.fn().mockReturnValue(message),
    } as any as Response;
  });

  it("should response with message when service returns the message", async () => {
    const deleteAllTodosMock = jest
      .spyOn(todoService, "removeAllTodos")
      .mockImplementation((): any => {
        return Promise.resolve(message);
      });
    await deleteAllTodosController(
      request as Request,
      response as Response,
      mockNext as NextFunction
    );
    expect(deleteAllTodosMock).toHaveBeenCalled();
    expect(response.send).toBeCalledWith(message);
  });
});
