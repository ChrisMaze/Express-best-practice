import { ITodo } from "../types/ITodo";
import Todo from "../models/Todo";

export const getAllTodos = async (): Promise<ITodo[] | null> => {
  const todos: ITodo[] = await Todo.find({});
  return todos;
};

export const getTodoById = async (id: string): Promise<ITodo | null> => {
  const todo: ITodo | null = await Todo.findById(id);
  return todo;
};

export const updateTodoById = async (
  id: string,
  body: Object
): Promise<ITodo | null> => {
  const todo = await Todo.findByIdAndUpdate({ _id: id }, body);
  return todo;
};

export const createTodo = async (reqBody: Object): Promise<ITodo> => {
  // const body = reqBody as Pick<
  //   ITodo,
  //   "title" | "description" | "status" | "startDate" | "dueDate"
  // >;

  // const todo = new Todo({
  //   title: body.title,
  //   description: body.description,
  //   status: body.status,
  //   startDate: body.startDate,
  //   dueDate: body.dueDate,
  // });
  // await todo.save();
  const todo = await Todo.create(reqBody);
  return todo;
};

export const removeTodoById = async (id: string): Promise<ITodo | null> => {
  const todo: ITodo | null = await Todo.findByIdAndRemove({ _id: id });
  return todo;
};

export const removeAllTodos = async (): Promise<string> => {
  await Todo.deleteMany({});
  return "Delete all todos!";
};
