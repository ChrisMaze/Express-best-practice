import { NextFunction, Request, Response } from "express";
import { getTodoByIdController } from "../../src/controller/getTodoById";
import { NotFoundException } from "../../src/exceptions/NotFoundException";
import * as todoService from "../../src/service/todoService";

describe("Test GetTodoByIdController", () => {
  let request: Request;
  let response: Response;
  const mockNext: NextFunction = jest.fn();
  const todo = {
    _id: "0",
    title: "test",
    description: "test",
    status: "Hold",
    startDate: "2022-10-20 12:00:00",
    dueDate: "2022-10-30 12:00:00",
  };
  beforeEach(() => {
    request = {
      params: {
        id: "0",
      },
    } as any as Request;
    response = {
      send: jest.fn().mockReturnValue(todo),
    } as any as Response;
  });

  it("should response with todo object when service returns the todo", async () => {
    const getTodoByIdMock = jest
      .spyOn(todoService, "getTodoById")
      .mockImplementation((): any => {
        return todo;
      });
    await getTodoByIdController(
      request as Request,
      response as Response,
      mockNext as NextFunction
    );
    expect(getTodoByIdMock).toHaveBeenCalled();
    expect(response.send).toHaveBeenCalledWith(todo);
  });

  it("should call TodoNotFoundException when todo is not found", async () => {
    jest.mock("../../src/exceptions/NotFoundException");
    const notFoundError = new NotFoundException("6355038e3758edf07631fb6b");
    const request = {
      params: {
        id: "6355038e3758edf07631fb6b",
      },
    } as any as Request;
    const response = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
    } as any as Response;
    const mockNext: NextFunction = jest.fn();
    const getTodoByIdMock = jest
      .spyOn(todoService, "getTodoById")
      .mockImplementation((): any => {
        return null;
      });
    await getTodoByIdController(
      request as Request,
      response as Response,
      mockNext as NextFunction
    );
    expect(getTodoByIdMock).toHaveBeenCalled();
    expect(getTodoByIdMock).toHaveReturnedWith(null);
    expect(mockNext).toHaveBeenCalledWith(notFoundError);
  });
});
