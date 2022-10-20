import express, { Express } from "express";
import "reflect-metadata";
import router from "./router/router";
import { connectDB } from "./db/db";
import * as cron from "node-cron";
import { checkTodoStatus } from "./schedulers/checkTodoStatus";
const PORT = 7700;
const app: Express = express();
connectDB;
app.use(express.json());
cron.schedule("* * */12 * * *", checkTodoStatus);
app.use(router);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
