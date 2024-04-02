import request from "supertest";
import { app } from "../index";

test("Test 'Hello World' endpoint", async () => {
  const res = await request(app).get("/api/hello");
  expect(res.header["content-type"]).toBe("text/html; charset=utf-8");
  expect(res.statusCode).toBe(200);
  expect(res.text).toEqual("Hello World!");
});
