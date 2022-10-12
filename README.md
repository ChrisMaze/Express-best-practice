import express, { Express } from "express";
import mongoose from "mongoose";
import router from "./routers/router";

const app: Express = express();
const PORT: string | number = process.env.PORT || 3000;

app.use(express.json());
app.use(router);

app.get("/\*", (req, res) => {
return res.json({ message: "Hello World!" });
});

// const uri: string = `mongodb+srv://CY:ts-node-docker@cluster0.nqim2xa.mongodb.net/todo?retryWrites=true&w=majority`;
const uri: string = `mongodb://localhost:27017/todo?retryWrites=true&w=majority`;
// const uri: string = `mongodb://mongo:27017/todo?directConnection=true`;
mongoose
.connect(uri)
.then(() => {
console.log("Successfully connected to the todo database");
})
.then(() =>
app.listen(PORT, () => {
console.log(`Server running on http://localhost:${PORT}`);
})
)
.catch((error) => {
throw error;
});
