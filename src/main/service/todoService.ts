import { Request } from "express";
import { ITodo } from "../types/ITodo";
import Todo from "../models/todo";

const getAllTodosService = async () => {
  const todos: ITodo[] = await Todo.find();
  return todos;
};

const getTodoByIdService = async (req: Request) => {
  const todo: ITodo | null = await Todo.findById(req.params.id);
  return todo;
};

const createTodoService = async (req: Request) => {
  const body = req.body as Pick<ITodo, "title" | "description" | "completed">;
  const todo = new Todo({
    title: body.title,
    description: body.description,
    completed: body.completed,
  });
  await todo.save();
  return todo;
};

const updateTodoByIdService = async (req: Request) => {
  const {
    params: { id },
    body,
  } = req;
  const todo: ITodo | null = await Todo.findByIdAndUpdate({ _id: id }, body);
  return todo;
};

const removeTodoByIdService = async (req: Request) => {
  const todo: ITodo | null = await Todo.findByIdAndRemove(req.params.id);
  return todo;
};

export {
  getAllTodosService,
  getTodoByIdService,
  createTodoService,
  updateTodoByIdService,
  removeTodoByIdService,
};
