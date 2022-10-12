import { Request } from "express";
import { ITodo } from "../types/ITodo";
import Todo from "../models/todo";

let findAll = async () => {
  const todos: ITodo[] = await Todo.find();
  return todos;
};

let find = async (req: Request) => {
  const todo: ITodo | null = await Todo.findById(req.params.id);
  return todo;
};

let create = async (req: Request) => {
  const body = req.body as Pick<ITodo, "title" | "description" | "status">;
  const todo = new Todo({
    title: body.title,
    description: body.description,
    status: body.status,
  });
  await todo.save();
  return todo;
};

let update = async (req: Request) => {
  const {
    params: { id },
    body,
  } = req;
  const todo: ITodo | null = await Todo.findByIdAndUpdate({ _id: id }, body);
  return todo;
};

let remove = async (req: Request) => {
  const todo: ITodo | null = await Todo.findByIdAndRemove(req.params.id);
  return todo;
};

export { findAll, find, create, update, remove };
