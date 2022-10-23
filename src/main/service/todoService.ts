import { ITodo } from "../types/ITodo";
import { Model } from "mongoose";

export default class TodoService {
  todo: Model<ITodo, {}, {}, {}, any>;
  constructor(TodoModel: Model<ITodo>) {
    this.todo = TodoModel;
  }
  public async getAllTodos(): Promise<ITodo[] | null> {
    const todos: ITodo[] = await this.todo.find({});
    return todos;
  }
  public async getTodoById(id: string): Promise<ITodo | null> {
    const todo: ITodo | null = await this.todo.findById(id);
    return todo;
  }
  public async updateTodoById(id: string, body: Object): Promise<ITodo | null> {
    const todo = await this.todo.findByIdAndUpdate({ _id: id }, body);
    return todo;
  }
  public async createTodo(reqBody: Object): Promise<ITodo> {
    const body = reqBody as Pick<
      ITodo,
      | "title"
      | "description"
      | "status"
      | "startDate"
      | "completedDate"
      | "dueDate"
    >;

    const todo = new this.todo({
      title: body.title,
      description: body.description,
      status: body.status,
      startDate: body.startDate,
      completedDate: body.completedDate,
      dueDate: body.dueDate,
    });
    await todo.save();
    return todo;
  }

  public async removeTodoById(id: string) {
    const todo: ITodo | null = await this.todo.findByIdAndRemove({ _id: id });
    return todo;
  }

  public async removeAllTodos(): Promise<string> {
    await this.todo.deleteMany({});
    return "Delete all todos!";
  }
}
