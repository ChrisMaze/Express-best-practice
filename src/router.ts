import { Router } from "express";
import { getAllTodosController } from "./controller/getAllTodos";
import { getTodoByIdController } from "./controller/getTodoById";
import { createTodoController } from "./controller/createTodo";
import { updateTodoByIdController } from "./controller/updateTodoById";
import { deleteTodoByIdController } from "./controller/deleteTodoById";
import { deleteAllTodosController } from "./controller/deleteAllTodos";
import {
  createSchema,
  updateSchema,
  validateBody,
  validateParams,
} from "./middleware/validationMiddleware";

const router = Router();

router.get("/todo", getAllTodosController);
router.get("/todo/:id", validateParams, getTodoByIdController);
router.post("/todo", createSchema, validateBody, createTodoController);
router.put("/todo/:id", updateSchema, validateBody, updateTodoByIdController);
router.delete("/todo/:id", validateParams, deleteTodoByIdController);
router.delete("/todo", deleteAllTodosController);
export default router;
