import { NextFunction, Request, Response } from "express";
import * as todoService from "../../src/service/todoService";
import { updateTodoByIdController } from "../../src/controller/updateTodoById";
import { TodoNotFoundException } from "../../src/exceptions/NotFoundException";

describe("Test UpdateTodoByIdController", () => {
  const reqBody = {
    title: "test",
    description: "test update",
    status: "Completed",
  };

  const todo = {
    _id: "634e34c26e9626079ef367e1",
    title: "test",
    description: "test update",
    status: "Completed",
    startDate: "2022-10-20 12:00:00",
    dueDate: "2022-10-30 12:00:00",
  };

  it("should response with todo object when service returns the todo", async () => {
    const request = {
      params: {
        id: "634e34c26e9626079ef367e1",
      },
      body: reqBody,
    } as any as Request;
    const response = {
      send: jest.fn().mockReturnValue(todo),
    } as any as Response;
    const mockNext: NextFunction = jest.fn();
    const updateTodoByIdMock = jest
      .spyOn(todoService, "updateTodoById")
      .mockImplementation((): any => {
        return todo;
      });
    await updateTodoByIdController(
      request as Request,
      response as Response,
      mockNext as NextFunction
    );
    expect(updateTodoByIdMock).toHaveBeenCalled();
    expect(response.send).toHaveBeenCalledWith(todo);
  });

  it("should call TodoNotFoundException when todo is not found", async () => {
    jest.mock("../../src/exceptions/NotFoundException");
    const notFoundError = new TodoNotFoundException("6355038e3758edf07631fb6b");
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
    const updateTodoByIdMock = jest
      .spyOn(todoService, "updateTodoById")
      .mockImplementation((): any => {
        return null;
      });
    await updateTodoByIdController(
      request as Request,
      response as Response,
      mockNext as NextFunction
    );
    expect(updateTodoByIdMock).toHaveBeenCalled();
    expect(updateTodoByIdMock).toHaveReturnedWith(null);
    expect(mockNext).toHaveBeenCalledWith(notFoundError);
  });
});
