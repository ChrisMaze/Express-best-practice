import { Status } from "main/enum/enum";
import { Document } from "mongoose";

export interface ITodo extends Document {
  title: string;
  description: string;
  status: Status;
  startDate: Date;
  completedDate?: Date;
  dueDate: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
export interface ITodoDocument extends ITodo, Document {
  updateAt: Date;
  createAt: Date;
}
