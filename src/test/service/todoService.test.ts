import Todo from "../../main/models/todo";
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

describe("TodoService", () => {
  const todoService = new TodoService(Todo);
  const mockReqBody = {
    title: "test",
    description: "test",
    status: "Hold",
    startDate: "2022-10-20 12:00:00",
    dueDate: "2022-10-30 12:00:00",
  };
  const mockTodo = {
    _id: "0",
    title: "test0",
    description: "test",
    status: "Hold",
    startDate: "2022-10-20 12:00:00",
    dueDate: "2022-10-30 12:00:00",
  };
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
  const updatedTodo = {
    _id: "0",
    title: "update",
    description: "update",
    status: "Hold",
    startDate: "2022-10-20 12:00:00",
    dueDate: "2022-10-30 12:00:00",
  };
  const removeAll = "Delete all todos!";

  beforeAll(() => {
    Todo.find = jest.fn().mockResolvedValue(mockTodos);
    Todo.findById = jest.fn().mockResolvedValue(mockTodo);
    Todo.findByIdAndUpdate = jest.fn().mockResolvedValue(updatedTodo);
    Todo.findByIdAndRemove = jest.fn().mockResolvedValue(mockTodo);
    Todo.deleteMany = jest.fn().mockResolvedValue(removeAll);
  });

  describe("getAllTodosService", () => {
    it("should fetch all todos", async () => {
      const todos = await todoService.getAllTodos();
      expect(todos).toEqual(mockTodos);
    });
  });

  describe("getTodoByIdService", () => {
    it("should return todo when given a valid id", async () => {
      const todo = await todoService.getTodoById("0");
      expect(todo).toEqual(mockTodo);
    });
    it("should return null when no todo is found", async () => {
      const todo = await todoService.getTodoById("3");
      expect(todo).toBeNull;
    });
  });

  describe("createTodoService", () => {
    it("should create todo with request", async () => {
      const todo = await todoService.createTodo(mockReqBody);
      expect(todo.title).toEqual(mockReqBody.title);
      expect(todo.description).toEqual(mockReqBody.description);
      expect(todo.status).toEqual(mockReqBody.status);
    });
  });

  describe("updateTodoByIdService", () => {
    it("should return updated todo when given a valid id", async () => {
      const todo = await todoService.updateTodoById("0", mockReqBody);
      expect(todo).toEqual(updatedTodo);
    });

    it("should return null when no todo is found", async () => {
      const todo = await todoService.updateTodoById("3", mockReqBody);
      expect(todo).toBeNull;
    });
  });

  describe("removeTodoByIdService", () => {
    it("should return the deleted todo when given a valid id", async () => {
      const todo = await todoService.removeTodoById("0");
      expect(todo).toEqual(mockTodo);
    });

    it("should return null when no todo is found", async () => {
      const todo = await todoService.removeTodoById("3");
      expect(todo).toBeNull;
    });
  });

  describe("removeAllTodosService", () => {
    it("should return message", async () => {
      const message = await todoService.removeAllTodos();
      expect(message).toEqual(removeAll);
    });
  });
});
