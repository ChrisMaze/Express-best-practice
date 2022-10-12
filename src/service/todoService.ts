import { Request } from "express";
import { ITodo } from "../types/ITodo";
import Todo from "../models/todo";

let findAllTodos = async () => {
  const todos: ITodo[] = await Todo.find();
  return todos;
};

let findTodoById = async (req: Request) => {
  const todo: ITodo | null = await Todo.findById(req.params.id);
  return todo;
};

let createTodo = async (req: Request) => {
  const body = req.body as Pick<ITodo, "title" | "description" | "status">;
  const todo = new Todo({
    title: body.title,
    description: body.description,
    status: body.status,
  });
  await todo.save();
  return todo;
};

let updateTodoById = async (req: Request) => {
  const {
    params: { id },
    body,
  } = req;
  const todo: ITodo | null = await Todo.findByIdAndUpdate({ _id: id }, body);
  return todo;
};

let removeTodoById = async (req: Request) => {
  const todo: ITodo | null = await Todo.findByIdAndRemove(req.params.id);
  return todo;
};

export {
  findAllTodos as findAll,
  findTodoById as find,
  createTodo as create,
  updateTodoById as update,
  removeTodoById as remove,
};
