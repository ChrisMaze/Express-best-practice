import { Status } from "../enum/enum";
import { model, Schema } from "mongoose";
import { ITodo } from "../types/ITodo";
export const todoSchema: Schema = new Schema(
  {
    title: {
      type: String,
      minLength: 1,
      required: true,
    },
    description: {
      type: String,
      default: "",
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
