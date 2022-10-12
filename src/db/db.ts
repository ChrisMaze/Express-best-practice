import mongoose from "mongoose";

const uri: string = `mongodb://localhost:27017/todo-express-best-practice?retryWrites=true&w=majority`;
// const uri: string = `mongodb://mongo:27017/todo?directConnection=true`;
export const dbInitialize = mongoose
  .connect(uri)
  .then(() => {
    console.log(
      "Successfully connected to the todo-express-best-practice database"
    );
  })
  .catch((error) => {
    throw error;
  });
