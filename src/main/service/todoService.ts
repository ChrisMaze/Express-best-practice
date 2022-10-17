import { Request } from "express";
import { ITodo } from "../types/ITodo";
import { Model } from "mongoose";

export default class TodoService {
  Todo: Model<ITodo, {}, {}, {}, any>;
  constructor(TodoModel: Model<ITodo>) {
    this.Todo = TodoModel;
  }
  getAllTodosService = async () => {
    const todos: ITodo[] = await this.Todo.find({});
    return todos;
  };
  getTodoByIdService = async (id: string) => {
    const todo: ITodo | null = await this.Todo.findById(id);
    return todo;
  };
  updateTodoByIdService = async (req: Request) => {
    const {
      params: { id },
      body,
    } = req;
    const todo: ITodo | null = await this.Todo.findByIdAndUpdate(
      { _id: id },
      body
    );
    return todo;
  };
  createTodoService = async (reqBody: Object) => {
    const body = reqBody as Pick<ITodo, "title" | "description" | "completed">;
    const todo = new this.Todo({
      title: body.title,
      description: body.description,
      completed: body.completed,
    });
    await todo.save();
    return todo;
  };
  removeTodoByIdService = async (id: string) => {
    const todo: ITodo | null = await this.Todo.findByIdAndRemove(id);
    return todo;
  };
}
