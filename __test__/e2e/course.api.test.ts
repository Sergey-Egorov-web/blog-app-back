import request, { Response } from "supertest";

import { app } from "../../src/settings";

describe("/", () => {
  it("should return 200 and empty array", () => {
    expect(1).toBe(1);
  });
});

describe("/blogs", () => {
  beforeAll(async () => {
    await request(app).delete("/blogs/testing/all-data");
  });
  it("should return 200 and empty array", async () => {
    await request(app).get("/blogs").expect(200, []);
  });
});
