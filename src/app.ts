import express, { Express } from "express";
import "reflect-metadata";
import router from "./router";
import { connectMOngoDB } from "./db/connectDB";
import * as cron from "node-cron";
import { checkTodoStatus } from "./middleware/checkTodoStatus";
import logger from "./service/logger";
import morganMiddleware from "./middleware/morganMiddleware";

const PORT = 7700;
const app: Express = express();
connectMOngoDB;
app.use(express.json());
app.use(morganMiddleware);
cron.schedule("* * */12 * * *", checkTodoStatus);
app.use(router);

app.listen(PORT, () => {
  logger.info(`Server running on http://localhost:${PORT}`);
});

export default app;
