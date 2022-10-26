import { NextFunction, Request, Response } from "express";
import TodoService from "../../src/main/service/todoService";
import { CreateTodoController } from "../../src/main/controller/createTodo";

describe("Test CreateTodoController", () => {
  let createTodoController: CreateTodoController;
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
    createTodoController = new CreateTodoController();
    request = {
      body: reqBody,
    } as Request;
    response = {
      send: jest.fn().mockReturnValue(expected),
    } as any as Response;
  });

  it("should response with todo object when service returns the todo", async () => {
    const createTodoMock = jest
      .spyOn(TodoService.prototype, "createTodo")
      .mockImplementation((): any => {
        return expected;
      });
    const result = await createTodoController.createTodo(
      request as Request,
      response as Response,
      mockNext as NextFunction
    );
    expect(createTodoMock).toHaveBeenCalled();
    expect(result).toBe(expected);
  });
});
