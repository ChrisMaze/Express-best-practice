import { NextFunction, Request, Response } from "express";
import { DeleteAllTodosController } from "../../main/controller/deleteAllTodos";
import TodoService from "../../main/service/todoService";
jest.mock("../../main/service/todoService");
describe("Test DeleteAllTodosController", () => {
  const deleteAllTodosController = new DeleteAllTodosController();
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
      .spyOn(TodoService.prototype, "removeAllTodos")
      .mockImplementation((): any => {
        return Promise.resolve(message);
      });
    const result = await deleteAllTodosController.deleteAllTodos(
      request as Request,
      response as Response,
      mockNext as NextFunction
    );
    expect(deleteAllTodosMock).toHaveBeenCalled();
    expect(result).toBe(message);
  });
});
