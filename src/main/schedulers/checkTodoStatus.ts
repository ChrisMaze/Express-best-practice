import colors from "colors";
import TodoService from "../service/todoService";
import Todo from "../models/todo";
import { Status } from "../enum/enum";
import { MailService } from "../service/mailService";

const todoService = new TodoService(Todo);
const mailService = new MailService();
export const checkTodoStatus = async () => {
  let todos = await todoService.getAllTodos();
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
    await todo.updateOne({ status: todo.status });
  }
  console.log(
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
  console.log(
    colors.magenta(`${todoId} status changed from ${oldStatus} to ${newStatus}`)
  );
};
