import { Router } from "express";
import { getAllTodos } from "../controller/getAllTodos";
import { getTodoById } from "../controller/getTodoById";
import { createTodo } from "../controller/createTodo";
import { updateTodoById } from "../controller/updateTodoById";
import { deleteTodoById } from "../controller/deleteTodoById";
import { paramsVerify } from "../middleware/validationMiddleware";

const router = Router();

router.get("/todo", getAllTodos);
router.get("/todo/:id", paramsVerify, getTodoById);
router.post("/todo", createTodo);
router.put("/todo/:id", paramsVerify, updateTodoById);
router.delete("/todo/:id", paramsVerify, deleteTodoById);
export default router;
