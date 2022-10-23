import { checkTodoStatus } from "../../main/schedulers/checkTodoStatus";
import { MailService } from "../../main/service/mailService";
// import Todo from "../../main/models/todo";
import TodoService from "../../main/service/todoService";
import {
  connectDBForTesting,
  disconnectDBForTesting,
  clearDBForTesting,
} from "../connectDBForTesting";

beforeAll(async () => {
  await connectDBForTesting();
});
afterEach(async () => {
  await clearDBForTesting();
});
afterAll(async () => {
  await disconnectDBForTesting();
});
jest.setTimeout(200000);
describe("Test checkTodoStatus", () => {
  const realDate = Date.now;
  beforeAll(() => {
    global.Date.now = jest.fn((): any => {
      new Date("2019-04-07T10:20:30z").getTime();
    });
  });
  afterAll(() => {
    global.Date.now = realDate;
  });
  it("should change todo status", async () => {
    jest.mock("../../main/models/todo");
    const todos = [
      {
        _id: "1",
        title: "test1",
        description: "status should be changed from Active to Overdue",
        status: "Active",
        startDate: "2019-10-30 12:00:00",
        dueDate: "2019-10-30 12:00:00",
      },
      {
        _id: "2",
        title: "test2",
        description: "status should be changed from Active to Overdue",
        status: "Active",
        startDate: "2022-10-30 12:00:00",
        dueDate: "2019-04-01 12:00:00",
      },
      {
        _id: "3",
        title: "test2",
        description: "status should be changed from Hold to Active",
        status: "Hold",
        startDate: "2019-04-01 12:00:00",
        dueDate: "2019-10-30 12:00:00",
      },
    ];
    const getAllTodosMock = jest
      .spyOn(TodoService.prototype, "getAllTodos")
      .mockImplementation((): any => {
        return Promise.resolve(todos);
      });
    const isSentMock = jest
      .spyOn(MailService.prototype, "isSent")
      .mockImplementation((): any => {
        return Promise.resolve("Email sent successfully");
      });

    await checkTodoStatus();
    expect(getAllTodosMock).toHaveBeenCalled();
    expect(isSentMock).toHaveBeenCalled();
    expect(todos[0].status).toEqual("Overdue");
    expect(todos[1].status).toEqual("Overdue");
    expect(todos[2].status).toEqual("Active");
  });
});
