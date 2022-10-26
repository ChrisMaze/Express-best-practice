import { NextFunction, Request, Response } from "express";
import { DeleteTodoByIdController } from "../../src/main/controller/deleteTodoById";
import TodoNotFoundException from "../../src/main/exceptions/NotFoundException";
import TodoService from "../../src/main/service/todoService";
jest.mock("../../main/service/todoService");
describe("Test DeleteTodoByIdController", () => {
  const deleteTodoByIdController = new DeleteTodoByIdController();
  const todo = {
    _id: "0",
    title: "test",
    description: "test",
    status: "Hold",
    startDate: "2022-10-20 12:00:00",
    dueDate: "2022-10-30 12:00:00",
  };

  it("should response with todo object when service returns the todo", async () => {
    const request = {
      params: {
        id: "0",
      },
    } as any as Request;
    const response = {
      send: jest.fn().mockReturnValue(todo),
    } as any as Response;
    const mockNext: NextFunction = jest.fn();
    const deleteTodoByIdMock = jest
      .spyOn(TodoService.prototype, "removeTodoById")
      .mockImplementation((): any => {
        return todo;
      });
    const result = await deleteTodoByIdController.deleteTodoById(
      request as Request,
      response as Response,
      mockNext as NextFunction
    );
    expect(deleteTodoByIdMock).toHaveBeenCalled();
    expect(result).toBe(todo);
  });

  it("should call TodoNotFoundException when todo is not found", async () => {
    jest.mock("../../main/exceptions/NotFoundException");
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
    const deleteTodoByIdMock = jest
      .spyOn(TodoService.prototype, "removeTodoById")
      .mockImplementation((): any => {
        return null;
      });
    await deleteTodoByIdController.deleteTodoById(
      request as Request,
      response as Response,
      mockNext as NextFunction
    );
    expect(deleteTodoByIdMock).toHaveBeenCalled();
    expect(deleteTodoByIdMock).toHaveReturnedWith(null);
    expect(mockNext).toHaveBeenCalled();
    expect(mockNext).toHaveBeenCalledWith(notFoundError);
  });
});