import { Router } from "express";
import { getAllTodosController } from "./controller/getAllTodos";
import { getTodoByIdController } from "./controller/getTodoById";
import { createTodoController } from "./controller/createTodo";
import { updateTodoByIdController } from "./controller/updateTodoById";
import { deleteTodoByIdController } from "./controller/deleteTodoById";
import { deleteAllTodosController } from "./controller/deleteAllTodos";
import { ParamsVerify } from "./middleware/validationMiddleware";

const router = Router();

router.get("/todo", getAllTodosController);
router.get("/todo/:id", ParamsVerify, getTodoByIdController);
router.post("/todo", createTodoController);
router.put("/todo/:id", ParamsVerify, updateTodoByIdController);
router.delete("/todo/:id", ParamsVerify, deleteTodoByIdController);
router.delete("/todo", deleteAllTodosController);
export default router;
