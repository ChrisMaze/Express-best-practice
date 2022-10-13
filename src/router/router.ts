import { Router } from "express";
import { getAllTodos } from "../controller/getAllTodos/getAllTodos";
import { getTodoById } from "../controller/getTodoById/getTodoById";
import { createTodo } from "../controller/createTodo/createTodo";
import { updateTodoById } from "../controller/updateTodoById/updateTodoById";
import { deleteTodoById } from "../controller/deleteTodoById/deleteTodoById";
import { paramsVerify } from "../middleware/validationMiddleware";

const router = Router();

router.get("/todo", getAllTodos);
router.get("/todo/:id", paramsVerify, getTodoById);
router.post("/todo", createTodo);
router.put("/todo/:id", paramsVerify, updateTodoById);
router.delete("/todo/:id", paramsVerify, deleteTodoById);
export default router;
