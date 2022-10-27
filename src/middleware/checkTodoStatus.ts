import colors from "colors";
import { getAllTodos } from "../service/todoService";
import { Status } from "../enum/enum";
import { sendMail } from "../service/sendMail";
import logger from "../service/logger";
import Todo from "../models/Todo";

export const checkTodoStatus = async () => {
  let todos = await getAllTodos();
  if (todos == null) {
    return;
  }

  for (const todo of todos) {
    const startDate = new Date(todo.startDate).getTime();
    const dueDate = new Date(todo.dueDate).getTime();
    const currentDate = new Date().getTime();

    if (currentDate < startDate && todo.status != Status.Hold) {
      logStatusChange(todo._id.toString(), todo.status, Status.Hold);
      todo.status = Status.Hold;
    }

    if (
      currentDate > dueDate &&
      todo.status != Status.Overdue &&
      todo.status != Status.Completed
    ) {
      logStatusChange(todo._id.toString(), todo.status, Status.Overdue);
      todo.status = Status.Overdue;
      const message: string = "Todo " + `${todo._id}` + " Overdue Alarm!";
      sendMail(message);
    }

    if (
      currentDate > startDate &&
      currentDate < dueDate &&
      todo.status != Status.Active
    ) {
      logStatusChange(todo._id.toString(), todo.status, Status.Active);
      todo.status = Status.Active;
    }

    await Todo.findByIdAndUpdate(
      { _id: todo._id },
      { $set: { status: todo.status } }
    );
  }

  logger.info(
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
  logger.info(
    colors.magenta(`${todoId} status changed from ${oldStatus} to ${newStatus}`)
  );
};
