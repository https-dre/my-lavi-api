import { describe, it, beforeAll, afterAll, expect } from "vitest";
import request from "supertest";
import { buildApp } from "../../src/buildApp";
import { config } from "dotenv";
import { db } from "../../src/drizzle/conn";
import path from "path";

let app: ReturnType<typeof buildApp>;

beforeAll(async () => {
  app = buildApp();
  await app.ready();
});

afterAll(async () => {
  await app.close();
  await db.execute("TRUNCATE laundry, owner RESTART IDENTITY CASCADE")
});

const new_user = {
  name: "André Dias",
  email: "diaso.andre@test.com",
  password: "123456789",
  cep: "06763190",
  birth_date: "2007-05-02",
  cpf: "54728123804",
};

describe("POST /owners", () => {
  it("should create a new owner", async () => {
    const response = await request(app.server)
      .post("/owners")
      .send({ owner: new_user });
    expect(response.status).toBe(201);
  });
});

describe("PUT /owners/auth -> OWNER LOGIN", () => {
  it("should return JWT and Owner Id", async () => {
    // create owner
    await request(app.server)
      .post("/owners")
      .send({ owner: new_user });

    // authenticate owner
    const response = await request(app.server).put("/owners/auth").send({
      email: new_user.email,
      password: new_user.password,
    });
    expect(response.status).toBe(200);
    expect(response.body.token).toBeDefined();
    expect(response.body.owner_id).toBeDefined();
  });
});
