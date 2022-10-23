import request from "supertest";
import app from "../main/app";

jest.mock("../../src/main/models/todo");
jest.mock("../../src/main/types/ITodo");

describe("App Test", () => {
  it("should return 404 when GET /reset", () => {
    return request(app).get("/reset").expect(404);
  });

  it("should return 200 when GET /todo ", () => {
    return request(app).get("/todo").expect(200);
  });
});
