// import { getAllTodosService } from "./todoService";
// import { connectDBForTesting } from "../db/db.test";

// const mockTodo = {
//   _id: "6347c03e0ddc9c2250e667bd",
//   title: "session",
//   description: "express best practice",
//   completed: false,
// };

// const mockTodos = [
//   {
//     _id: "6347c03e0ddc9c2250e667bd",
//     title: "session",
//     description: "express best practice",
//     completed: false,
//   },
//   {
//     _id: "6347c187cd721fe1b1f2a8a4",
//     title: "session",
//     description: "express best practice",
//     completed: false,
//   },
// ];

// describe("Todo Service", () => {
//   beforeAll(async () => {
//     await connectDBForTesting();
//   });

//   it("should return all todos", async () => {
//     const todos = await getAllTodosService();
//     console.log(todos);
//     expect(todos.length).toEqual(2);
//     expect(todos[0]).toMatchObject(mockTodo);
//   });

//   it("should return todo if it exists", async () => {});
//   it("should update todo if it exists", async () => {});
//   it("should delete todo if it exists", async () => {});
// });
