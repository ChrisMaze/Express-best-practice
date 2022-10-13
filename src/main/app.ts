import express, { Express } from "express";
import "reflect-metadata";
import router from "./router/router";
import { dbInitialize } from "./db/db";

const PORT = 7700;
const app: Express = express();
dbInitialize;
app.use(express.json());
app.use(router);
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
