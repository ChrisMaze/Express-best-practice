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
  createTodo = async (reqBody: Object) => {
    const body = reqBody as Pick<ITodo, "title" | "description" | "completed">;
    const todo = new this.Todo({
      title: body.title,
      description: body.description,
      completed: body.completed,
    });
    await todo.save();
    return todo;
  };
  removeTodoById = async (id: string) => {
    const todo: ITodo | null = await this.Todo.findByIdAndRemove(id);
    return todo;
  };
}
