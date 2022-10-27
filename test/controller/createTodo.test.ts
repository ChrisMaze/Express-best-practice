import { NextFunction, Request, Response } from "express";
import * as todoService from "../../src/service/todoService";
import { createTodoController } from "../../src/controller/createTodo";

describe("Test createTodoController", () => {
  let request: Request;
  let response: Response;
  const mockNext: NextFunction = jest.fn();

  const reqBody = {
    title: "test",
    description: "test",
    status: "Hold",
    startDate: "2022-10-20 12:00:00",
    dueDate: "2022-10-30 12:00:00",
  };

  const expected = {
    _id: "634e34c26e9626079ef367e1",
    title: "test",
    description: "test",
    status: "Hold",
    startDate: "2022-10-20 12:00:00",
    dueDate: "2022-10-30 12:00:00",
  };

  beforeEach(() => {
    request = {
      body: reqBody,
    } as Request;
    response = {
      send: jest.fn().mockReturnValue(expected),
    } as any as Response;
  });

  it("should response with todo object when service returns the todo", async () => {
    const createTodoMock = jest
      .spyOn(todoService, "createTodo")
      .mockImplementation((): any => {
        return expected;
      });
    await createTodoController(
      request as Request,
      response as Response,
      mockNext as NextFunction
    );
    expect(createTodoMock).toHaveBeenCalled();
    expect(response.send).toBeCalledWith(expected);
  });
});
