import { Status } from "../enum/enum";
import { Document } from "mongoose";

export interface ITodo extends Document {
  title: string;
  description: string;
  status: Status;
  startDate: Date;
  completedDate?: Date;
  dueDate: Date;
}
