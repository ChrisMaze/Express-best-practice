import express, { Express } from "express";
import bodyParser from "body-parser";
import "reflect-metadata";
import router from "./router";
import { connectDB } from "./db/db";
import * as cron from "node-cron";
import { checkTodoStatus } from "./schedulers/checkTodoStatus";
import Logger from "./lib/logger";
import morganMiddleware from "./config/morganMiddleware";
import cors from "cors";

const PORT = 7700;
const app: Express = express();
connectDB;
app.use(cors());
app.use(express.json());
app.use(morganMiddleware);
app.use(bodyParser.json());

cron.schedule("* * */12 * * *", checkTodoStatus);
app.use(router);

app.listen(PORT, () => {
  Logger.debug(`Server running on http://localhost:${PORT}`);
});

export default app;
