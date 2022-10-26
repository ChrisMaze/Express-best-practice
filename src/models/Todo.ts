import { Status } from "../enum/enum";
import { model, Schema } from "mongoose";
import { ITodo } from "../types/ITodo";
const todoSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: Status,
      default: "Active",
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    dueDate: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true, versionKey: false }
);

export default model<ITodo>("Todo", todoSchema);
