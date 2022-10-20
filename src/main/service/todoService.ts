import { ITodo } from "../types/ITodo";
import { Model } from "mongoose";

export default class TodoService {
  Todo: Model<ITodo, {}, {}, {}, any>;
  constructor(TodoModel: Model<ITodo>) {
    this.Todo = TodoModel;
  }
  getAllTodos = async () => {
    const todos: ITodo[] = await this.Todo.find({});
    return todos;
  };
  getTodoById = async (id: string) => {
    const todo: ITodo | null = await this.Todo.findById(id);
    return todo;
  };
  updateTodoById = async (id: string, body: Object) => {
    const todo = await this.Todo.findByIdAndUpdate({ _id: id }, body);
    return todo;
  };
  createTodo = async (reqBody: Object): Promise<any> => {
    const body = reqBody as Pick<
      ITodo,
      | "title"
      | "description"
      | "status"
      | "startDate"
      | "completedDate"
      | "dueDate"
    >;
    const todo = new this.Todo({
      title: body.title,
      description: body.description,
      status: body.status,
      startDate: body.startDate,
      completedDate: body.completedDate,
      dueDate: body.dueDate,
    });
    await todo.save();
    return todo;
  };
  removeTodoById = async (id: string) => {
    const todo: ITodo | null = await this.Todo.findByIdAndRemove(id);
    return todo;
  };
  removeAllTodos = async () => {
    await this.Todo.deleteMany({});
  };
}
