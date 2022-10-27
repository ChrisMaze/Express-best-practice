import { checkTodoStatus } from "../../src/middleware/checkTodoStatus";
import Todo from "../../src/models/Todo";
import * as todoService from "../../src/service/todoService";
import * as sendMailService from "../../src/service/sendMail";
jest.mock("../../src//service/sendMail");
jest.mock("../../src/service/todoService");
describe("Test checkTodoStatus", () => {
  const realDate = global.Date;
  const mockDate: Date = new Date("2022-10-07T00:00:00.000Z");
  const spyDate = jest
    .spyOn(global, "Date")
    .mockImplementation((...args): any => {
      if (args.length) {
        return new realDate(...args);
      }
      return mockDate;
    });

  afterEach(() => {
    spyDate.mockRestore();
  });
  it("should change todo status from Active to Hold", async () => {
    const todo = [
      {
        _id: "63577cb493f522d47cf00000",
        title: "test0",
        description: "status should be changed from Active to Hold",
        status: "Active",
        startDate: "2022-10-10T00:00:00.000Z",
        dueDate: "2022-11-10T00:00:00.000Z",
      },
    ];
    const mockTodo = [
      {
        _id: "63577cb493f522d47cf00000",
        title: "test0",
        description: "status should be changed from Active to Hold",
        status: "Hold",
        startDate: "2022-10-10T00:00:00.000Z",
        dueDate: "2022-11-10T00:00:00.000Z",
      },
    ];
    const getAllTodosMock = jest
      .spyOn(todoService, "getAllTodos")
      .mockImplementation((): any => Promise.resolve(todo));
    Todo.findByIdAndUpdate = jest.fn().mockResolvedValue(mockTodo);
    await checkTodoStatus();
    expect(getAllTodosMock).toHaveBeenCalledTimes(1);
    expect(todo[0].status).toEqual("Hold");
  });

  it("should change todo status from Active to Overdue", async () => {
    const todo = [
      {
        _id: "63577cb493f522d47cf11111",
        title: "test1",
        description: "status should be changed from Active to Overdue",
        status: "Active",
        startDate: "2022-10-01T00:00:00.000Z",
        dueDate: "2022-10-06T00:00:00.000Z",
      },
    ];
    const mockTodo = [
      {
        _id: "63577cb493f522d47cf11111",
        title: "test1",
        description: "status should be changed from Active to Overdue",
        status: "Overdue",
        startDate: "2022-10-01T00:00:00.000Z",
        dueDate: "2022-10-06T00:00:00.000Z",
      },
    ];
    const getAllTodosMock = jest
      .spyOn(todoService, "getAllTodos")
      .mockImplementation((): any => Promise.resolve(todo));
    const sendMailMock = jest
      .spyOn(sendMailService, "sendMail")
      .mockImplementation();
    Todo.findByIdAndUpdate = jest.fn().mockResolvedValue(mockTodo);
    await checkTodoStatus();
    expect(getAllTodosMock).toHaveBeenCalledTimes(1);
    expect(sendMailMock).toHaveBeenCalled();
    expect(todo[0].status).toEqual("Overdue");
  });

  it("should change todo status from Hold to Active", async () => {
    const todo = [
      {
        _id: "63577cb493f522d47cf22222",
        title: "test2",
        description: "status should be changed from Hold to Active",
        status: "Hold",
        startDate: "2022-10-01T00:00:00.000Z",
        dueDate: "2022-11-10T00:00:00.000Z",
      },
    ];
    const mockTodo = [
      {
        _id: "63577cb493f522d47cf22222",
        title: "test2",
        description: "status should be changed from Hold to Active",
        status: "Active",
        startDate: "2022-10-01T00:00:00.000Z",
        dueDate: "2022-11-10T00:00:00.000Z",
      },
    ];
    const getAllTodosMock = jest
      .spyOn(todoService, "getAllTodos")
      .mockImplementation((): any => Promise.resolve(todo));
    Todo.findByIdAndUpdate = jest.fn().mockResolvedValue(mockTodo);
    await checkTodoStatus();
    expect(getAllTodosMock).toHaveBeenCalledTimes(1);
    expect(todo[0].status).toEqual("Active");
  });
});
