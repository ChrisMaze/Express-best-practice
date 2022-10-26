import { NextFunction, Request, Response } from "express";
import { GetAllTodosController } from "../../main/controller/getAllTodos";
import TodoService from "../../main/service/todoService";
jest.mock("../../main/service/todoService");
describe("Test GetAllTodosController", () => {
  const getAllTodosController = new GetAllTodosController();
  const request = {} as Request;
  let response: Response;
  const mockNext: NextFunction = jest.fn();
  const todos = [
    {
      _id: "634e34c26e9626079ef367e1",
      title: "test",
      description: "test",
      status: "Hold",
      startDate: "2022-10-20 12:00:00",
      dueDate: "2022-10-30 12:00:00",
    },
    {
      _id: "634e34c26e9626079ef367e1",
      title: "test",
      description: "test",
      status: "Hold",
      startDate: "2022-10-20 12:00:00",
      dueDate: "2022-10-30 12:00:00",
    },
  ];
  beforeEach(() => {
    response = {
      send: jest.fn().mockReturnValue(todos),
    } as any as Response;
  });

  it("should response with message when service returns the message", async () => {
    const getAllTodosMock = jest
      .spyOn(TodoService.prototype, "getAllTodos")
      .mockImplementation((): any => {
        return Promise.resolve(todos);
      });
    const result = await getAllTodosController.getAllTodos(
      request as Request,
      response as Response,
      mockNext as NextFunction
    );
    expect(getAllTodosMock).toHaveBeenCalled();
    expect(result).toBe(todos);
  });
});
