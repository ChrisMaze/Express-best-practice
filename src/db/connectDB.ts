import logger from "../service/logger";
import mongoose from "mongoose";

const uri: string =
  "mongodb://localhost:27017/todo-express-best-practice?retryWrites=true&w=majority";
// const uri: string = `mongodb://mongo:27017/todo?directConnection=true`;
export const connectMOngoDB = mongoose
  .connect(uri)
  .then(() => {
    logger.info(
      "Successfully connected to the todo-express-best-practice database"
    );
  })
  .catch((error) => {
    throw error;
  });
