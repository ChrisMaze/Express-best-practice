import Todo from "../../src/models/Todo";
import {
  getAllTodos,
  getTodoById,
  updateTodoById,
  removeAllTodos,
  removeTodoById,
  createTodo,
} from "../../src/service/todoService";
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

const mockReqBody = {
  title: "test",
  description: "test",
  status: "Hold",
  startDate: "2022-10-20 12:00:00",
  dueDate: "2022-10-30 12:00:00",
};
const mockTodo = {
  _id: "635a830b8edf1b5b1261a35e",
  title: "test",
  description: "test",
  status: "Hold",
  startDate: "2022-10-20 12:00:00",
  dueDate: "2022-10-30 12:00:00",
};

describe("Test getAllTodos service", () => {
  const mockTodos = [
    {
      _id: "0",
      title: "test0",
      description: "test",
      status: "Hold",
      startDate: "2022-10-20 12:00:00",
      dueDate: "2022-10-30 12:00:00",
    },
    {
      _id: "1",
      title: "test1",
      description: "test",
      status: "Hold",
      startDate: "2022-10-20 12:00:00",
      dueDate: "2022-10-30 12:00:00",
    },
  ];
  beforeAll(() => {
    Todo.find = jest.fn().mockResolvedValue(mockTodos);
  });
  it("should fetch all todos", async () => {
    const todos = await getAllTodos();
    expect(todos).toEqual(mockTodos);
  });
});

describe("Test getTodoById service", () => {
  beforeAll(() => {
    Todo.findById = jest.fn().mockResolvedValue(mockTodo);
  });
  it("should return todo when given a valid id", async () => {
    const todo = await getTodoById("635a830b8edf1b5b1261a35e");
    expect(todo).toEqual(mockTodo);
  });
  it("should return null when todo is not found", async () => {
    const todo = await getTodoById("not0exist0id1b0000000000");
    expect(todo).toBeNull;
  });
});

describe("Test createTodo service", () => {
  beforeAll(() => {
    Todo.create = jest.fn().mockResolvedValue(mockTodo);
  });
  it("should create todo with request", async () => {
    const todo = await createTodo(mockReqBody);
    expect(todo).toEqual(mockTodo);
  });
});

describe("Test updateTodoById service", () => {
  const updatedTodo = {
    _id: "0",
    title: "update",
    description: "update",
    status: "Hold",
    startDate: "2022-10-20 12:00:00",
    dueDate: "2022-10-30 12:00:00",
  };
  beforeAll(() => {
    Todo.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedTodo);
  });
  it("should return updated todo when given a valid id", async () => {
    const todo = await updateTodoById("0", mockReqBody);
    expect(todo).toEqual(updatedTodo);
  });

  it("should return null when todo is not found", async () => {
    const todo = await updateTodoById("3", mockReqBody);
    expect(todo).toBeNull;
  });
});

describe("Test removeTodoById service", () => {
  beforeAll(() => {
    Todo.findByIdAndRemove = jest.fn().mockResolvedValue(mockTodo);
  });
  it("should return the deleted todo when given a valid id", async () => {
    const todo = await removeTodoById("0");
    expect(todo).toEqual(mockTodo);
  });

  it("should return null when todo is not found", async () => {
    const todo = await removeTodoById("3");
    expect(todo).toBeNull;
  });
});

describe("Test removeAllTodos service", () => {
  const removeAllMessage = "Delete all todos!";
  beforeAll(() => {
    Todo.deleteMany = jest.fn().mockResolvedValue(removeAllMessage);
  });
  it("should return message", async () => {
    const message = await removeAllTodos();
    expect(message).toEqual(removeAllMessage);
  });
});
