import { Router } from "express";
import { GetAllTodosController } from "./controller/getAllTodos";
import { GetTodoByIdController } from "./controller/getTodoById";
import { CreateTodoController } from "./controller/createTodo";
import { UpdateTodoByIdController } from "./controller/updateTodoById";
import { DeleteTodoByIdController } from "./controller/deleteTodoById";
import { DeleteAllTodosController } from "./controller/deleteAllTodos";
import { ParamsVerify } from "./middleware/validationMiddleware";

const router = Router();
const createTodoController = new CreateTodoController();
const getAllTodosController = new GetAllTodosController();
const getTodoByIdController = new GetTodoByIdController();
const updateTodoByIdController = new UpdateTodoByIdController();
const deleteTodoByIdController = new DeleteTodoByIdController();
const deleteAllTodosController = new DeleteAllTodosController();

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
