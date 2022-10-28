import { Router } from "express";
import { getAllTodosController } from "./controller/getAllTodos";
import { getTodoByIdController } from "./controller/getTodoById";
import { createTodoController } from "./controller/createTodo";
import { updateTodoByIdController } from "./controller/updateTodoById";
import { deleteTodoByIdController } from "./controller/deleteTodoById";
import { deleteAllTodosController } from "./controller/deleteAllTodos";
import { validateParams } from "./middleware/validateParamsMiddleware";
import {
  validateCreateInput,
  validateUpdateInput,
} from "./middleware/validateBodyMiddleware";
const router = Router();

router.get("/todo", getAllTodosController);
router.get("/todo/:id", validateParams, getTodoByIdController);
router.post("/todo", validateCreateInput, createTodoController);
router.put("/todo/:id", validateUpdateInput, updateTodoByIdController);
router.delete("/todo/:id", validateParams, deleteTodoByIdController);
router.delete("/todo", deleteAllTodosController);
export default router;
