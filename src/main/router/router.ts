import { Router } from "express";
import { GetAllTodosController } from "../controller/getAllTodos";
import { GetTodoByIdController } from "../controller/getTodoById";
import { CreateTodoController } from "../controller/createTodo";
import { UpdateTodoByIdController } from "../controller/updateTodoById";
import { DeleteTodoByIdController } from "../controller/deleteTodoById";

import { ParamsVerify } from "../middleware/validationMiddleware";
import TodoService from "../service/todoService";
import Todo from "../models/todo";
import { DeleteAllTodosController } from "../controller/deleteAllTodos";

const router = Router();
const createTodoController = new CreateTodoController(new TodoService(Todo));
const getAllTodosController = new GetAllTodosController(new TodoService(Todo));
const getTodoByIdController = new GetTodoByIdController(new TodoService(Todo));
const updateTodoByIdController = new UpdateTodoByIdController(
  new TodoService(Todo)
);
const deleteTodoByIdController = new DeleteTodoByIdController(
  new TodoService(Todo)
);
const deleteAllTodosController = new DeleteAllTodosController(
  new TodoService(Todo)
);

router.get("/todo", getAllTodosController.getAllTodos);
router.get("/todo/:id", ParamsVerify, getTodoByIdController.getTodoById);
router.post("/todo", createTodoController.createTodo);
router.put("/todo/:id", ParamsVerify, updateTodoByIdController.updateTodoById);
router.delete(
  "/todo/:id",
  ParamsVerify,
  deleteTodoByIdController.deleteTodoById
);
router.delete("/todo", deleteAllTodosController.deleteAllTodos);
export default router;
