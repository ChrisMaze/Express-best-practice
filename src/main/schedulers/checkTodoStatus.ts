import colors from "colors";
import TodoService from "../service/todoService";
import Todo from "../models/todo";
import { Status } from "../enum/enum";
import { MailService } from "../service/mailService";
import Logger from "../lib/logger";

const todoService = new TodoService(Todo);
const mailService = new MailService();
export const checkTodoStatus = async () => {
  let todos = await todoService.getAllTodos();
  if (todos == null) {
    return;
  }

  for (const todo of todos) {
    const startDate = new Date(todo.startDate).getTime();
    const dueDate = new Date(todo.dueDate).getTime();
    const currentDate = new Date().getTime();

    if (currentDate < startDate && todo.status != Status.Hold) {
      logStatusChange(todo._id.toString(), todo.status, Status.Active);
      todo.status = Status.Hold;
    }

    if (
      currentDate > dueDate &&
      todo.status != Status.Overdue &&
      todo.status != Status.Completed
    ) {
      logStatusChange(todo._id.toString(), todo.status, Status.Overdue);
      todo.status = Status.Overdue;
      const message: string = "Todo " + `${todo._id}` + " Overdue Alart!";
      mailService.isSent(message);
    }

    if (
      currentDate > startDate &&
      startDate < dueDate &&
      todo.status != Status.Active
    ) {
      logStatusChange(todo._id.toString(), todo.status, Status.Active);
      todo.status = Status.Active;
    }

    const updateTodo = new Todo({
      _id: todo.id,
      title: todo.title,
      description: todo.description,
      status: todo.status,
      startDate: todo.startDate,
      completedDate: todo.completedDate,
      dueDate: todo.dueDate,
    });
    // const newTodo = await todo.updateOne({ status: todo.status });
    await updateTodo.save({});
  }
  Logger.info(
    colors.green.italic(
      "Task status Scheduler has successfully ran at time: " + new Date()
    )
  );
};

const logStatusChange = (
  todoId: string,
  oldStatus: Status,
  newStatus: Status
) => {
  Logger.info(
    colors.magenta(`${todoId} status changed from ${oldStatus} to ${newStatus}`)
  );
};
