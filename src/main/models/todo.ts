import { model, Schema } from "mongoose";
import { ITodo } from "types/ITodo";
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
    completed: {
      type: Boolean,
      required: true,
    },
  },
  { versionKey: false }
);

export default model<ITodo>("Todo", todoSchema);
